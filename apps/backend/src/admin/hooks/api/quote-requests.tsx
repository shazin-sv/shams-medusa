import { FetchError } from "@medusajs/js-sdk";
import {
  AdminQuoteRequestResponse,
  AdminQuoteRequestsResponse,
} from "../../../types/quote-request/http";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { queryKeysFactory } from "../../lib/query-key-factory";
import { sdk } from "../../lib/client";

export const quoteRequestQueryKey = queryKeysFactory("quote_request");

export const useQuoteRequests = (
  query?: Record<string, string | number | undefined>,
  options?: UseQueryOptions<
    AdminQuoteRequestsResponse,
    FetchError,
    AdminQuoteRequestsResponse,
    QueryKey
  >
) => {
  const fetchQuoteRequests = (
    query?: Record<string, string | number | undefined>
  ) =>
    sdk.client.fetch<AdminQuoteRequestsResponse>(`/admin/quote-requests`, {
      query,
    });

  const { data, ...rest } = useQuery({
    ...options,
    queryFn: () => fetchQuoteRequests(query),
    queryKey: quoteRequestQueryKey.list(query),
  });

  return { ...data, ...rest };
};

export const useQuoteRequest = (
  id: string,
  options?: UseQueryOptions<
    AdminQuoteRequestResponse,
    FetchError,
    AdminQuoteRequestResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch<AdminQuoteRequestResponse>(
        `/admin/quote-requests/${id}`
      ),
    queryKey: quoteRequestQueryKey.detail(id),
    ...options,
  });

  return { ...data, ...rest };
};
