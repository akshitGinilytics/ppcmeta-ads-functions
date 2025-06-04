import { GoogleAdsApi } from "google-ads-api";
export declare function convertTZ(date: string | Date, tzString: string): Date;
export declare function createCustomerInstance(customerId: string, refreshToken: string, loginCustomerId?: string): import("google-ads-api").Customer;
export declare function createAdwordsClient(): GoogleAdsApi;
export declare const isRejected: (input: PromiseSettledResult<unknown>) => input is PromiseRejectedResult;
export declare const isFulfilled: <T>(input: PromiseSettledResult<T>) => input is PromiseFulfilledResult<T>;
