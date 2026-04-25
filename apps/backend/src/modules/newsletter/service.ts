import { MedusaService } from "@medusajs/framework/utils";
import { Campaign, Subscriber } from "./models";

class NewsletterModuleService extends MedusaService({
  Subscriber,
  Campaign,
}) {}

export default NewsletterModuleService;
