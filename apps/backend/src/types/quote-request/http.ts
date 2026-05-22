import { PaginatedResponse } from "@medusajs/framework/types";
import { ModuleQuoteRequest } from "./module";

export type StoreQuoteRequestResponse = {
  quote_request: ModuleQuoteRequest;
};

export type AdminQuoteRequestsResponse = PaginatedResponse<{
  quote_requests: ModuleQuoteRequest[];
}>;

export type AdminQuoteRequestResponse = {
  quote_request: ModuleQuoteRequest;
};
