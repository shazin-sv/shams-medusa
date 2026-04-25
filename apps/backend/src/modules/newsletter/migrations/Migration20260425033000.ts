import { Migration } from "@mikro-orm/migrations";

export class Migration20260425033000 extends Migration {
  async up(): Promise<void> {
    this.addSql('create table if not exists "newsletter_subscriber" ("id" text not null, "email" text not null, "first_name" text null, "last_name" text null, "status" text check ("status" in (\'subscribed\', \'unsubscribed\')) not null default \'subscribed\', "source" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "newsletter_subscriber_pkey" primary key ("id"));');
    this.addSql('create unique index if not exists "IDX_newsletter_subscriber_email_unique" on "newsletter_subscriber" (email) where deleted_at is null;');
    this.addSql('create index if not exists "IDX_newsletter_subscriber_deleted_at" on "newsletter_subscriber" (deleted_at) where deleted_at is null;');

    this.addSql('create table if not exists "newsletter_campaign" ("id" text not null, "subject" text not null, "preview_text" text null, "html" text not null, "status" text check ("status" in (\'draft\', \'sending\', \'sent\', \'failed\')) not null default \'draft\', "sent_at" timestamptz null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "newsletter_campaign_pkey" primary key ("id"));');
    this.addSql('create index if not exists "IDX_newsletter_campaign_deleted_at" on "newsletter_campaign" (deleted_at) where deleted_at is null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "newsletter_campaign" cascade;');
    this.addSql('drop table if exists "newsletter_subscriber" cascade;');
  }
}
