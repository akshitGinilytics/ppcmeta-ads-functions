import { GoogleAdsApi } from "google-ads-api";
export function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}
export function createCustomerInstance(customerId, refreshToken, loginCustomerId = "") {
    const client = createAdwordsClient();
    return client.Customer({
        customer_id: customerId,
        login_customer_id: loginCustomerId || undefined,
        refresh_token: refreshToken
    });
}
export function createAdwordsClient() {
    if (!process.env.CLIENT_ID) {
        throw new Error("CLIENT_ID is not defined");
    }
    if (!process.env.CLIENT_SECRET) {
        throw new Error("CLIENT_SECRET is not defined");
    }
    if (!process.env.DEVELOPER_TOKEN) {
        throw new Error("DEVELOPER_TOKEN is not defined");
    }
    return new GoogleAdsApi({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        developer_token: process.env.DEVELOPER_TOKEN,
    });
}
export const isRejected = (input) => input.status === 'rejected';
export const isFulfilled = (input) => input.status === 'fulfilled';
