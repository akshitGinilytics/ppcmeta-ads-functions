import { createAdwordsClient, isRejected } from "./helper.js";
import { Timestamp } from "firebase-admin/firestore";
function extractMangerId(resourceName) {
    if (!resourceName) {
        return "";
    }
    const mccIds = resourceName.split('/').filter((pathName) => {
        return pathName !== 'customer' && pathName !== 'customerClients';
    });
    return mccIds.length > 1 ? mccIds[mccIds.length - 2] : mccIds[mccIds.length - 1];
}
function extractCustomerId(resourceName) {
    if (!resourceName) {
        return "";
    }
    const ids = resourceName.split('/').filter((pathName) => {
        return pathName !== 'customers';
    });
    return ids[ids.length - 1];
}
async function getCustomersInfo(customerIdToManagerId, refreshToken, client) {
    const customersInfoRequests = [];
    for (const [customerId, managerId] of customerIdToManagerId) {
        const customerInstance = client.Customer({
            customer_id: customerId,
            refresh_token: refreshToken,
            login_customer_id: managerId
        });
        customersInfoRequests.push(customerInstance.report({
            entity: 'customer_client',
            attributes: [
                'customer_client.client_customer',
                'customer_client.level',
                'customer_client.manager',
                'customer_client.descriptive_name',
                'customer_client.currency_code',
                'customer_client.time_zone',
                'customer_client.id',
            ],
            constraints: [
                {
                    key: 'customer_client.level',
                    op: '<=',
                    val: '1'
                },
                {
                    key: 'customer_client.hidden',
                    op: '=',
                    val: 'false'
                },
                {
                    key: 'customer_client.status',
                    op: '=',
                    val: 'ENABLED'
                }
            ]
        }));
    }
    return await Promise.allSettled(customersInfoRequests);
}
function convertToAdwordsCustomer(customer, loginCustomerId, userId) {
    return {
        loginCustomerId: loginCustomerId,
        lastUpdated: Timestamp.now(),
        currency: customer.currency_code || '',
        customerId: String(customer.id),
        level: customer.level ?? -1,
        isManager: customer.manager || false,
        managerIds: [extractMangerId(customer.resource_name || '')],
        name: customer.descriptive_name || "",
        resourceName: customer.resource_name || "",
        managerCount: 0,
        teamId: "",
        ownerId: userId,
        timeZone: customer.time_zone || ""
    };
}
async function getCustomers(rootCustomer, user, client, userId) {
    const result = [];
    let customerWithManager = [];
    customerWithManager.push([rootCustomer, undefined]);
    while (customerWithManager.length > 0) {
        const customersInfo = await getCustomersInfo(customerWithManager, user.refreshToken, client);
        console.log("customersInfo");
        console.log(customersInfo);
        customerWithManager = [];
        for (const customerInfo of customersInfo) {
            if (isRejected(customerInfo)) {
                console.error(customerInfo.reason);
                continue;
            }
            for (const customer of customerInfo.value) {
                const customerClient = customer.customer_client;
                if (!customerClient) {
                    continue;
                }
                if (!customerClient.id) {
                    throw "Customer id must be queried";
                }
                if (!customerClient.resource_name) {
                    throw "Customer resource_name must be queried";
                }
                if (typeof customerClient.level !== "number") {
                    throw "Customer level must be queried";
                }
                const adwordsCustomer = convertToAdwordsCustomer(customerClient, rootCustomer, userId);
                if (customerClient.manager && customerClient.level !== 0) {
                    customerWithManager.push([adwordsCustomer.customerId, adwordsCustomer.managerIds[0]]);
                }
                result.push(adwordsCustomer);
            }
        }
    }
    return result;
}
export default async function (user) {
    const result = [];
    const client = createAdwordsClient();
    await user.getUser();
    console.log("Current user refresh token 1:", user.refreshToken);
    if (!user.refreshToken) {
        console.error("user", user);
        throw Error("User refreshToken was not found in firestore.");
    }
    const accessibleCustomersResponse = await client.listAccessibleCustomers(user.refreshToken);
    const rootCustomers = accessibleCustomersResponse.resource_names.map(extractCustomerId);
    console.log("rootCustomers", rootCustomers);
    for (const rootCustomer of rootCustomers) {
        result.push(...await getCustomers(rootCustomer, user, client, user.userId));
    }
    return result;
}
