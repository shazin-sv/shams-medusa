import { defineRouteConfig } from "@medusajs/admin-sdk";
import { LockClosedSolid } from "@medusajs/icons";
import {
  Container,
  Heading,
  Switch,
  Text,
  Toaster,
  toast,
} from "@medusajs/ui";
import {
  useSiteSettings,
  useUpdateSiteSettings,
} from "../../hooks/api/site-settings";

const SiteAccessPage = () => {
  const { site_settings, isPending } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings({
    onSuccess: (data) => {
      toast.success(
        data.site_settings.unlocked
          ? "Storefront unlocked — visitors can browse the full site."
          : "Storefront locked — visitors see the coming soon page."
      );
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update site access");
    },
  });

  const unlocked = site_settings?.unlocked ?? false;

  return (
    <>
      <Container className="flex flex-col gap-y-6 p-6">
        <div>
          <Heading level="h1">Site access</Heading>
          <Text className="text-ui-fg-subtle mt-2">
            Control whether the public storefront is live or shows the
            under-construction page with newsletter and quote forms.
          </Text>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-ui-border-base p-6">
          <div className="flex flex-col gap-y-1">
            <Text weight="plus" leading="compact">
              Unlock site
            </Text>
            <Text size="small" leading="compact" className="text-ui-fg-subtle">
              {unlocked
                ? "The full storefront is visible to everyone."
                : "Visitors only see the coming soon page (locked)."}
            </Text>
          </div>

          <Switch
            checked={unlocked}
            disabled={isPending || updateSettings.isPending}
            onCheckedChange={(checked) => {
              updateSettings.mutate({ unlocked: checked });
            }}
          />
        </div>

        <div className="rounded-lg bg-ui-bg-subtle p-4">
          <Text size="small" leading="compact" className="text-ui-fg-subtle">
            <strong>Locked:</strong> bulldozer / crane coming soon template,
            newsletter subscribe, and guest quote request.
            <br />
            <strong>Unlocked:</strong> normal homepage, shop, cart, and checkout.
          </Text>
        </div>
      </Container>
      <Toaster />
    </>
  );
};

export const config = defineRouteConfig({
  label: "Site access",
  icon: LockClosedSolid,
});

export default SiteAccessPage;
