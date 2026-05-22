import { FetchError } from "@medusajs/js-sdk";
import {
  AdminSiteSettingsResponse,
  AdminUpdateSiteSettings,
} from "../../../types/site-settings";
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

export const siteSettingsQueryKey = queryKeysFactory("site_settings");

export const useSiteSettings = (
  options?: UseQueryOptions<
    AdminSiteSettingsResponse,
    FetchError,
    AdminSiteSettingsResponse,
    QueryKey
  >
) => {
  const { data, ...rest } = useQuery({
    queryFn: () =>
      sdk.client.fetch<AdminSiteSettingsResponse>(`/admin/site-settings`),
    queryKey: siteSettingsQueryKey.detail("singleton"),
    ...options,
  });

  return { ...data, ...rest };
};

export const useUpdateSiteSettings = (
  options?: UseMutationOptions<
    AdminSiteSettingsResponse,
    FetchError,
    AdminUpdateSiteSettings
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AdminUpdateSiteSettings) =>
      sdk.client.fetch<AdminSiteSettingsResponse>(`/admin/site-settings`, {
        method: "POST",
        body,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(
        siteSettingsQueryKey.detail("singleton"),
        data
      );
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
