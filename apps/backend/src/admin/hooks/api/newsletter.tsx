import { FetchError } from "@medusajs/js-sdk";
import { AdminNewsletterSubscribersResponse } from "../../../types";
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { queryKeysFactory } from "../../lib/query-key-factory";
import { sdk } from "../../lib/client";

export const newsletterQueryKey = queryKeysFactory("newsletter");

export const useNewsletterSubscribers = (
  filters?: { from?: string; to?: string },
  options?: UseQueryOptions<
    AdminNewsletterSubscribersResponse,
    FetchError,
    AdminNewsletterSubscribersResponse,
    QueryKey
  >
) => {
  return useQuery({
    queryKey: newsletterQueryKey.list(["subscribers", filters]),
    queryFn: () => {
      const params = new URLSearchParams();

      if (filters?.from) {
        params.set("from", filters.from);
      }

      if (filters?.to) {
        params.set("to", filters.to);
      }

      const query = params.toString();

      return sdk.client.fetch<AdminNewsletterSubscribersResponse>(
        `/admin/newsletter/subscribers${query ? `?${query}` : ""}`,
        { method: "GET" }
      );
    },
    ...options,
  });
};

export const useDeleteNewsletterSubscriber = (
  options?: UseMutationOptions<any, FetchError, { id: string }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) =>
      sdk.client.fetch(`/admin/newsletter/subscribers`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: newsletterQueryKey.list("subscribers"),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useImportNewsletterSubscribers = (
  options?: UseMutationOptions<
    any,
    FetchError,
    {
      subscribers: {
        email: string
        first_name?: string | null
        last_name?: string | null
        source?: string | null
        status?: "subscribed" | "unsubscribed"
      }[]
    }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) =>
      sdk.client.fetch(`/admin/newsletter/subscribers/import`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: newsletterQueryKey.list("subscribers"),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const exportNewsletterSubscribersCsv = async (filters?: {
  from?: string;
  to?: string;
}) => {
  const params = new URLSearchParams();

  if (filters?.from) {
    params.set("from", filters.from);
  }

  if (filters?.to) {
    params.set("to", filters.to);
  }

  const query = params.toString();
  const response = await fetch(
    `${sdk.client.getBaseUrl()}/admin/newsletter/subscribers/export${query ? `?${query}` : ""}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "text/csv",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to export subscribers");
  }

  return response.text();
};
