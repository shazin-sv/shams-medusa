import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { createOrderWorkflow } from "@medusajs/medusa/core-flows";
import { StepResponse } from "@medusajs/workflows-sdk";
import { forwardAlibabaOrder } from "../../lib/alibaba";
import { COMPANY_MODULE } from "../../modules/company";

createOrderWorkflow.hooks.orderCreated(
  async ({ order }, { container }) => {
    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    if (order.metadata?.company_id) {
      await remoteLink.create({
        [Modules.ORDER]: {
          order_id: order.id,
        },
        [COMPANY_MODULE]: {
          company_id: order.metadata?.company_id,
        },
      });
    }

    const alibabaResult = await forwardAlibabaOrder({
      orderId: order.id,
      displayId: order.display_id,
      email: order.email,
      currencyCode: order.currency_code,
      total: order.total,
      shippingAddress: (order.shipping_address as Record<string, unknown> | null) || null,
      metadata: (order.metadata as Record<string, unknown> | null) || null,
      items: (order.items || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        sku: item.variant?.sku || item.sku || null,
        metadata: (item.metadata as Record<string, unknown> | null) || null,
      })),
    });

    return new StepResponse(undefined, {
      orderId: order.id,
      hasCompanyLink: Boolean(order.metadata?.company_id),
      alibabaMode: alibabaResult.mode,
    });
  },
  async (state: { orderId?: string | null; hasCompanyLink?: boolean } | null, { container }) => {
    if (!state?.orderId || !state.hasCompanyLink) {
      return;
    }

    const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);

    await remoteLink.dismiss({
      [Modules.ORDER]: {
        order_id: state.orderId,
      },
    });
  }
);
