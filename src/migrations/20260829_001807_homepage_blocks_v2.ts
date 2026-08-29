import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_stats_variant" AS ENUM('band', 'grid');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_stats_variant" AS ENUM('band', 'grid');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "pages_blocks_intro_locales" ADD COLUMN IF NOT EXISTS "watermark" varchar;
    ALTER TABLE "_pages_v_blocks_intro_locales" ADD COLUMN IF NOT EXISTS "watermark" varchar;

    ALTER TABLE "pages_blocks_intro" ADD COLUMN IF NOT EXISTS "media_id" integer;
    ALTER TABLE "_pages_v_blocks_intro" ADD COLUMN IF NOT EXISTS "media_id" integer;

    ALTER TABLE "pages_blocks_stats" ADD COLUMN IF NOT EXISTS "variant" "enum_pages_blocks_stats_variant" DEFAULT 'band';
    ALTER TABLE "_pages_v_blocks_stats" ADD COLUMN IF NOT EXISTS "variant" "enum__pages_v_blocks_stats_variant" DEFAULT 'band';

    CREATE TABLE IF NOT EXISTS "pages_blocks_marquee" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "hidden" boolean DEFAULT false,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_marquee_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_marquee_items_locales" (
      "label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_why_choose_us" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "hidden" boolean DEFAULT false,
      "media_id" integer,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_why_choose_us_locales" (
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "cta_label" varchar,
      "cta_url" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_why_choose_us_items" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_why_choose_us_items_locales" (
      "text" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_marquee" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "hidden" boolean DEFAULT false,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_marquee_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_marquee_items_locales" (
      "label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_why_choose_us" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "hidden" boolean DEFAULT false,
      "media_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_why_choose_us_locales" (
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "cta_label" varchar,
      "cta_url" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_why_choose_us_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "_uuid" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_why_choose_us_items_locales" (
      "text" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_intro" ADD CONSTRAINT "pages_blocks_intro_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_intro" ADD CONSTRAINT "_pages_v_blocks_intro_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_marquee" ADD CONSTRAINT "pages_blocks_marquee_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_marquee_items" ADD CONSTRAINT "pages_blocks_marquee_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_marquee_items_locales" ADD CONSTRAINT "pages_blocks_marquee_items_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_marquee_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_why_choose_us" ADD CONSTRAINT "pages_blocks_why_choose_us_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_why_choose_us" ADD CONSTRAINT "pages_blocks_why_choose_us_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_why_choose_us_locales" ADD CONSTRAINT "pages_blocks_why_choose_us_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_why_choose_us_items" ADD CONSTRAINT "pages_blocks_why_choose_us_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_why_choose_us_items_locales" ADD CONSTRAINT "pages_blocks_why_choose_us_items_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_choose_us_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_marquee" ADD CONSTRAINT "_pages_v_blocks_marquee_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_marquee_items" ADD CONSTRAINT "_pages_v_blocks_marquee_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_marquee_items_locales" ADD CONSTRAINT "_pages_v_blocks_marquee_items_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_marquee_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_why_choose_us" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_why_choose_us" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_why_choose_us_locales" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_why_choose_us_items" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_items_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_choose_us"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_why_choose_us_items_locales" ADD CONSTRAINT "_pages_v_blocks_why_choose_us_items_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_choose_us_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_intro_media_idx" ON "pages_blocks_intro" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_order_idx" ON "pages_blocks_marquee" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_parent_id_idx" ON "pages_blocks_marquee" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_path_idx" ON "pages_blocks_marquee" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_items_order_idx" ON "pages_blocks_marquee_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_marquee_items_parent_id_idx" ON "pages_blocks_marquee_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_marquee_items_locales_locale_parent_id_unique" ON "pages_blocks_marquee_items_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_order_idx" ON "pages_blocks_why_choose_us" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_parent_id_idx" ON "pages_blocks_why_choose_us" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_path_idx" ON "pages_blocks_why_choose_us" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_media_idx" ON "pages_blocks_why_choose_us" USING btree ("media_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_locales_locale_parent_id_unique" ON "pages_blocks_why_choose_us_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_items_order_idx" ON "pages_blocks_why_choose_us_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_items_parent_id_idx" ON "pages_blocks_why_choose_us_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_why_choose_us_items_locales_locale_parent_id_un" ON "pages_blocks_why_choose_us_items_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_intro_media_idx" ON "_pages_v_blocks_intro" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_marquee_order_idx" ON "_pages_v_blocks_marquee" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_marquee_parent_id_idx" ON "_pages_v_blocks_marquee" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_marquee_path_idx" ON "_pages_v_blocks_marquee" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_marquee_items_order_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_marquee_items_parent_id_idx" ON "_pages_v_blocks_marquee_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_marquee_items_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_marquee_items_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_order_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_parent_id_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_path_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_media_idx" ON "_pages_v_blocks_why_choose_us" USING btree ("media_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_locales_locale_parent_id_uniqu" ON "_pages_v_blocks_why_choose_us_locales" USING btree ("_locale","_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_items_order_idx" ON "_pages_v_blocks_why_choose_us_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_items_parent_id_idx" ON "_pages_v_blocks_why_choose_us_items" USING btree ("_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_why_choose_us_items_locales_locale_parent_id" ON "_pages_v_blocks_why_choose_us_items_locales" USING btree ("_locale","_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_why_choose_us_items_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_why_choose_us_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_why_choose_us_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_why_choose_us" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_marquee_items_locales" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_marquee_items" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_marquee" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_why_choose_us_items_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_why_choose_us_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_why_choose_us_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_why_choose_us" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_marquee_items_locales" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_marquee_items" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_marquee" CASCADE;

    ALTER TABLE "pages_blocks_stats" DROP COLUMN IF EXISTS "variant";
    ALTER TABLE "_pages_v_blocks_stats" DROP COLUMN IF EXISTS "variant";
    ALTER TABLE "pages_blocks_intro_locales" DROP COLUMN IF EXISTS "watermark";
    ALTER TABLE "_pages_v_blocks_intro_locales" DROP COLUMN IF EXISTS "watermark";
    ALTER TABLE "pages_blocks_intro" DROP COLUMN IF EXISTS "media_id";
    ALTER TABLE "_pages_v_blocks_intro" DROP COLUMN IF EXISTS "media_id";

    DROP TYPE IF EXISTS "public"."enum_pages_blocks_stats_variant";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_stats_variant";
  `)
}
