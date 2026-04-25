import { FetchError } from "@medusajs/js-sdk";
import {
  AdminNewsletterCampaignResponse,
  AdminNewsletterCampaignsResponse,
  AdminNewsletterSubscribersResponse,
} from "../../../types";
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
  options?: UseQueryOptions<
    AdminNewsletterSubscribersResponse,
    FetchError,
    AdminNewsletterSubscribersResponse,
    QueryKey
  >
) => {
  return useQuery({
    queryKey: newsletterQueryKey.list("subscribers"),
    queryFn: () =>
      sdk.client.fetch<AdminNewsletterSubscribersResponse>(
        "/admin/newsletter/subscribers",
        { method: "GET" }
      ),
    ...options,
  });
};

export const useNewsletterCampaigns = (
  options?: UseQueryOptions<
    AdminNewsletterCampaignsResponse,
    FetchError,
    AdminNewsletterCampaignsResponse,
    QueryKey
  >
) => {
  return useQuery({
    queryKey: newsletterQueryKey.list("campaigns"),
    queryFn: () =>
      sdk.client.fetch<AdminNewsletterCampaignsResponse>(
        "/admin/newsletter/campaigns",
        { method: "GET" }
      ),
    ...options,
  });
};

export const useCreateNewsletterCampaign = (
  options?: UseMutationOptions<
    AdminNewsletterCampaignResponse,
    FetchError,
    { subject: string; preview_text?: string; html: string }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) =>
      sdk.client.fetch<AdminNewsletterCampaignResponse>(
        "/admin/newsletter/campaigns",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        }
      ),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: newsletterQueryKey.list("campaigns"),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useUpdateNewsletterCampaign = (
  options?: UseMutationOptions<
    AdminNewsletterCampaignResponse,
    FetchError,
    { id: string; subject?: string; preview_text?: string | null; html?: string; status?: "draft" | "sending" | "sent" | "failed" }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) =>
      sdk.client.fetch<AdminNewsletterCampaignResponse>(
        "/admin/newsletter/campaigns",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body,
        }
      ),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: newsletterQueryKey.list("campaigns"),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

export const useSendNewsletterCampaign = (
  campaignId: string,
  options?: UseMutationOptions<
    any,
    FetchError,
    { test_email?: string; recipients?: string[] }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) =>
      sdk.client.fetch(`/admin/newsletter/campaigns/${campaignId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: newsletterQueryKey.list("campaigns"),
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
