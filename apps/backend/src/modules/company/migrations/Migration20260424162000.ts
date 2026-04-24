import { Migration } from "@mikro-orm/migrations";

export class Migration20260424162000 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "alter table if exists \"company\" add column if not exists \"account_type\" text check (\"account_type\" in ('business', 'normal')) not null default 'business';"
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table if exists "company" drop column if exists "account_type";'
    );
  }
}
