import { Migration } from "@mikro-orm/migrations";

export class Migration20260522000000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table if not exists "quote_request" ("id" text not null, "display_id" integer not null, "status" text check ("status" in (\'pending_merchant\', \'accepted\', \'rejected\')) not null default \'pending_merchant\', "first_name" text not null, "last_name" text not null, "company" text null, "street_address" text not null, "zip" text not null, "city" text not null, "state" text not null, "email" text not null, "phone" text not null, "newsletter_opt_in" boolean not null default false, "products" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "quote_request_pkey" primary key ("id"));'
    );
    this.addSql(
      'create index if not exists "IDX_quote_request_deleted_at" on "quote_request" (deleted_at) where deleted_at is null;'
    );
    this.addSql(
      'create index if not exists "IDX_quote_request_display_id" on "quote_request" (display_id) where deleted_at is null;'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "quote_request" cascade;');
  }
}
