import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_expertise_grid_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_expertise_grid_layout" AS ENUM('vertical', 'showcase', 'grid'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_featured_projects_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_featured_projects_layout" AS ENUM('editorial', 'grid'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_quote_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_quote_variant" AS ENUM('simple', 'testimonial'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_marquee_variant" AS ENUM('default', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_why_choose_us_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_why_choose_us_variant" AS ENUM('features', 'split'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_faq_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_contact_section_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_contact_section_form_type" AS ENUM('contact', 'quote'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_expertise_grid_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_expertise_grid_layout" AS ENUM('vertical', 'showcase', 'grid'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_featured_projects_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_featured_projects_layout" AS ENUM('editorial', 'grid'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_quote_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_quote_variant" AS ENUM('simple', 'testimonial'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_marquee_variant" AS ENUM('default', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_why_choose_us_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_why_choose_us_variant" AS ENUM('features', 'split'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_faq_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_contact_section_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_contact_section_form_type" AS ENUM('contact', 'quote'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background_variant" "enum_pages_blocks_faq_background_variant" DEFAULT 'default',
  	"support_media_id" integer,
  	"support_phone" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background_variant" "enum_pages_blocks_contact_section_background_variant" DEFAULT 'default',
  	"form_type" "enum_pages_blocks_contact_section_form_type" DEFAULT 'contact',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_contact_section_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background_variant" "enum__pages_v_blocks_faq_background_variant" DEFAULT 'default',
  	"support_media_id" integer,
  	"support_phone" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_faq_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean DEFAULT false,
  	"background_variant" "enum__pages_v_blocks_contact_section_background_variant" DEFAULT 'default',
  	"form_type" "enum__pages_v_blocks_contact_section_form_type" DEFAULT 'contact',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_contact_section_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_featured_projects" ALTER COLUMN "limit" SET DEFAULT 4;
  ALTER TABLE "_pages_v_blocks_featured_projects" ALTER COLUMN "limit" SET DEFAULT 4;
  ALTER TABLE "pages_blocks_expertise_grid" ADD COLUMN IF NOT EXISTS "background_variant" "enum_pages_blocks_expertise_grid_background_variant" DEFAULT 'default';
  ALTER TABLE "pages_blocks_expertise_grid" ADD COLUMN IF NOT EXISTS "layout" "enum_pages_blocks_expertise_grid_layout" DEFAULT 'vertical';
  ALTER TABLE "pages_blocks_featured_projects" ADD COLUMN IF NOT EXISTS "background_variant" "enum_pages_blocks_featured_projects_background_variant" DEFAULT 'default';
  ALTER TABLE "pages_blocks_featured_projects" ADD COLUMN IF NOT EXISTS "layout" "enum_pages_blocks_featured_projects_layout" DEFAULT 'editorial';
  ALTER TABLE "pages_blocks_quote" ADD COLUMN IF NOT EXISTS "background_variant" "enum_pages_blocks_quote_background_variant" DEFAULT 'default';
  ALTER TABLE "pages_blocks_quote" ADD COLUMN IF NOT EXISTS "variant" "enum_pages_blocks_quote_variant" DEFAULT 'simple';
  ALTER TABLE "pages_blocks_quote" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "pages_blocks_marquee" ADD COLUMN IF NOT EXISTS "variant" "enum_pages_blocks_marquee_variant" DEFAULT 'default';
  ALTER TABLE "pages_blocks_why_choose_us" ADD COLUMN IF NOT EXISTS "background_variant" "enum_pages_blocks_why_choose_us_background_variant" DEFAULT 'default';
  ALTER TABLE "pages_blocks_why_choose_us" ADD COLUMN IF NOT EXISTS "variant" "enum_pages_blocks_why_choose_us_variant" DEFAULT 'features';
  ALTER TABLE "_pages_v_blocks_expertise_grid" ADD COLUMN IF NOT EXISTS "background_variant" "enum__pages_v_blocks_expertise_grid_background_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_expertise_grid" ADD COLUMN IF NOT EXISTS "layout" "enum__pages_v_blocks_expertise_grid_layout" DEFAULT 'vertical';
  ALTER TABLE "_pages_v_blocks_featured_projects" ADD COLUMN IF NOT EXISTS "background_variant" "enum__pages_v_blocks_featured_projects_background_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_featured_projects" ADD COLUMN IF NOT EXISTS "layout" "enum__pages_v_blocks_featured_projects_layout" DEFAULT 'editorial';
  ALTER TABLE "_pages_v_blocks_quote" ADD COLUMN IF NOT EXISTS "background_variant" "enum__pages_v_blocks_quote_background_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_quote" ADD COLUMN IF NOT EXISTS "variant" "enum__pages_v_blocks_quote_variant" DEFAULT 'simple';
  ALTER TABLE "_pages_v_blocks_quote" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "_pages_v_blocks_marquee" ADD COLUMN IF NOT EXISTS "variant" "enum__pages_v_blocks_marquee_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_why_choose_us" ADD COLUMN IF NOT EXISTS "background_variant" "enum__pages_v_blocks_why_choose_us_background_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_why_choose_us" ADD COLUMN IF NOT EXISTS "variant" "enum__pages_v_blocks_why_choose_us_variant" DEFAULT 'features';
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_support_media_id_media_id_fk" FOREIGN KEY ("support_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section" ADD CONSTRAINT "pages_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_section_locales" ADD CONSTRAINT "pages_blocks_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_support_media_id_media_id_fk" FOREIGN KEY ("support_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section" ADD CONSTRAINT "_pages_v_blocks_contact_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_section_locales" ADD CONSTRAINT "_pages_v_blocks_contact_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_section"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_support_media_idx" ON "pages_blocks_faq" USING btree ("support_media_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_contact_section_order_idx" ON "pages_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_section_parent_id_idx" ON "pages_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_section_path_idx" ON "pages_blocks_contact_section" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_contact_section_locales_locale_parent_id_unique" ON "pages_blocks_contact_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_support_media_idx" ON "_pages_v_blocks_faq" USING btree ("support_media_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_order_idx" ON "_pages_v_blocks_contact_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_section_parent_id_idx" ON "_pages_v_blocks_contact_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_section_path_idx" ON "_pages_v_blocks_contact_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_section_locales_locale_parent_id_uni" ON "_pages_v_blocks_contact_section_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_quote_media_idx" ON "pages_blocks_quote" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_quote_media_idx" ON "_pages_v_blocks_quote" USING btree ("media_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_section_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_section" CASCADE;
  DROP TABLE "pages_blocks_contact_section_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_section_locales" CASCADE;
  ALTER TABLE "pages_blocks_quote" DROP CONSTRAINT "pages_blocks_quote_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_quote" DROP CONSTRAINT "_pages_v_blocks_quote_media_id_media_id_fk";
  
  DROP INDEX "pages_blocks_quote_media_idx";
  DROP INDEX "_pages_v_blocks_quote_media_idx";
  ALTER TABLE "pages_blocks_featured_projects" ALTER COLUMN "limit" SET DEFAULT 3;
  ALTER TABLE "_pages_v_blocks_featured_projects" ALTER COLUMN "limit" SET DEFAULT 3;
  ALTER TABLE "pages_blocks_intro" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_intro" DROP COLUMN "featured_stat_value";
  ALTER TABLE "pages_blocks_intro_locales" DROP COLUMN "featured_stat_label";
  ALTER TABLE "pages_blocks_expertise_grid" DROP COLUMN "background_variant";
  ALTER TABLE "pages_blocks_expertise_grid" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_featured_projects" DROP COLUMN "background_variant";
  ALTER TABLE "pages_blocks_featured_projects" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_quote" DROP COLUMN "background_variant";
  ALTER TABLE "pages_blocks_quote" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_quote" DROP COLUMN "media_id";
  ALTER TABLE "pages_blocks_marquee" DROP COLUMN "variant";
  ALTER TABLE "pages_blocks_why_choose_us" DROP COLUMN "background_variant";
  ALTER TABLE "pages_blocks_why_choose_us" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_intro" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_intro" DROP COLUMN "featured_stat_value";
  ALTER TABLE "_pages_v_blocks_intro_locales" DROP COLUMN "featured_stat_label";
  ALTER TABLE "_pages_v_blocks_expertise_grid" DROP COLUMN "background_variant";
  ALTER TABLE "_pages_v_blocks_expertise_grid" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_featured_projects" DROP COLUMN "background_variant";
  ALTER TABLE "_pages_v_blocks_featured_projects" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_quote" DROP COLUMN "background_variant";
  ALTER TABLE "_pages_v_blocks_quote" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_quote" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_marquee" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_why_choose_us" DROP COLUMN "background_variant";
  ALTER TABLE "_pages_v_blocks_why_choose_us" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_intro_variant";
  DROP TYPE "public"."enum_pages_blocks_expertise_grid_background_variant";
  DROP TYPE "public"."enum_pages_blocks_expertise_grid_layout";
  DROP TYPE "public"."enum_pages_blocks_featured_projects_background_variant";
  DROP TYPE "public"."enum_pages_blocks_featured_projects_layout";
  DROP TYPE "public"."enum_pages_blocks_quote_background_variant";
  DROP TYPE "public"."enum_pages_blocks_quote_variant";
  DROP TYPE "public"."enum_pages_blocks_marquee_variant";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_background_variant";
  DROP TYPE "public"."enum_pages_blocks_why_choose_us_variant";
  DROP TYPE "public"."enum_pages_blocks_faq_background_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_section_background_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_section_form_type";
  DROP TYPE "public"."enum__pages_v_blocks_intro_variant";
  DROP TYPE "public"."enum__pages_v_blocks_expertise_grid_background_variant";
  DROP TYPE "public"."enum__pages_v_blocks_expertise_grid_layout";
  DROP TYPE "public"."enum__pages_v_blocks_featured_projects_background_variant";
  DROP TYPE "public"."enum__pages_v_blocks_featured_projects_layout";
  DROP TYPE "public"."enum__pages_v_blocks_quote_background_variant";
  DROP TYPE "public"."enum__pages_v_blocks_quote_variant";
  DROP TYPE "public"."enum__pages_v_blocks_marquee_variant";
  DROP TYPE "public"."enum__pages_v_blocks_why_choose_us_background_variant";
  DROP TYPE "public"."enum__pages_v_blocks_why_choose_us_variant";
  DROP TYPE "public"."enum__pages_v_blocks_faq_background_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_background_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_section_form_type";`)
}
