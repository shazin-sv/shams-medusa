import { Migration } from "@mikro-orm/migrations";

export class Migration20260522100000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table if not exists "site_settings" ("id" text not null, "unlocked" boolean not null default false, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "site_settings_pkey" primary key ("id"));'
    );
    this.addSql(
      'create index if not exists "IDX_site_settings_deleted_at" on "site_settings" (deleted_at) where deleted_at is null;'
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "site_settings" cascade;');
  }
}
