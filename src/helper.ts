import { GoogleAdsApi } from "google-ads-api";

export function convertTZ(date: string | Date, tzString: string) {
  console.log(`Converting date ${date} to timezone ${tzString}`);
  try {
    const result = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    console.log(`Converted date: ${result.toISOString()}`);
    return result;
  } catch (error) {
    console.error(`Error in convertTZ for date ${date}, timezone ${tzString}:`, {
      errorMessage: typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error),
      stack: typeof error === "object" && error !== null && "stack" in error ? (error as any).stack : undefined,
    });
    throw error;
  }
}

export function createCustomerInstance(customerId: string, refreshToken: string, loginCustomerId = "") {
  console.log(`Creating customer instance for customerId ${customerId}`, {
    refreshToken: refreshToken ? "Present" : "Missing",
    loginCustomerId: loginCustomerId || "Not provided",
  });

  try {
    const client = createAdwordsClient();
    console.log(`GoogleAdsApi client created successfully for customerId ${customerId}`);

    const customer = client.Customer({
      customer_id: customerId,
      login_customer_id: loginCustomerId || undefined,
      refresh_token: refreshToken,
    });

    console.log(`Customer instance created for customerId ${customerId}`);

    // Log OAuth client configuration (environment variables only, as Customer does not expose oauth2Client)
    console.log(`OAuth2Client configuration for customerId ${customerId}:`, {
      clientId: process.env.CLIENT_ID ? "Present" : "Missing",
      clientSecret: process.env.CLIENT_SECRET ? "Present" : "Missing",
      refreshToken: refreshToken ? "Present" : "Missing",
      scopes: "Unknown", // Cannot access scopes directly from Customer instance
    });

    return customer;
  } catch (error) {
    console.error(`Error in createCustomerInstance for customerId ${customerId}:`, {
      errorMessage: typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error),
      errorCode: typeof error === "object" && error !== null && "code" in error ? (error as any).code : undefined,
      errorDetails: typeof error === "object" && error !== null && "response" in error && (error as any).response?.data ? (error as any).response.data : "No response data",
      stack: typeof error === "object" && error !== null && "stack" in error ? (error as any).stack : undefined,
    });
    throw error;
  }
}

export function createAdwordsClient() {
  console.log(`Creating GoogleAdsApi client`);

  try {
    if (!process.env.CLIENT_ID) {
      console.error("Missing CLIENT_ID environment variable");
      throw new Error("CLIENT_ID is not defined");
    }

    if (!process.env.CLIENT_SECRET) {
      console.error("Missing CLIENT_SECRET environment variable");
      throw new Error("CLIENT_SECRET is not defined");
    }

    if (!process.env.DEVELOPER_TOKEN) {
      console.error("Missing DEVELOPER_TOKEN environment variable");
      throw new Error("DEVELOPER_TOKEN is not defined");
    }

    console.log(`Environment variables for GoogleAdsApi client:`, {
      clientId: process.env.CLIENT_ID ? "Present" : "Missing",
      clientSecret: process.env.CLIENT_SECRET ? "Present" : "Missing",
      developerToken: process.env.DEVELOPER_TOKEN ? "Present" : "Missing",
    });

    const client = new GoogleAdsApi({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      developer_token: process.env.DEVELOPER_TOKEN,
    });

    console.log(`GoogleAdsApi client instantiated successfully`);
    return client;
  } catch (error) {
    console.error(`Error in createAdwordsClient:`, {
      errorMessage: typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error),
      errorCode: typeof error === "object" && error !== null && "code" in error ? (error as any).code : undefined,
      errorDetails: typeof error === "object" && error !== null && "response" in error && (error as any).response?.data ? (error as any).response.data : "No response data",
      stack: typeof error === "object" && error !== null && "stack" in error ? (error as any).stack : undefined,
    });
    throw error;
  }
}

export const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult =>
  input.status === "rejected";

export const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> =>
  input.status === "fulfilled";