import {GoogleAdsApi} from "google-ads-api"


export function convertTZ(date: string | Date, tzString: string) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}


export function createCustomerInstance(customerId: string, refreshToken: string, loginCustomerId = "") {
  const client = createAdwordsClient()
  return client.Customer({
    customer_id: customerId,
    login_customer_id: loginCustomerId || undefined,
    refresh_token: refreshToken
  })
}


export function createAdwordsClient() {
  if (!process.env.CLIENT_ID) {
    throw new Error("CLIENT_ID is not defined")
  }

  if (!process.env.CLIENT_SECRET) {
    throw new Error("CLIENT_SECRET is not defined")
  }


  if (!process.env.DEVELOPER_TOKEN) {
    throw new Error("DEVELOPER_TOKEN is not defined")
  }

  return new GoogleAdsApi({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    developer_token: process.env.DEVELOPER_TOKEN,
  })
}


export const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
  input.status === 'rejected'

export const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
  input.status === 'fulfilled'

