import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_cta_variant" AS ENUM('centered', 'banner'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_timeline_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum_pages_blocks_timeline_variant" AS ENUM('process', 'list'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_cta_variant" AS ENUM('centered', 'banner'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_timeline_background_variant" AS ENUM('default', 'muted', 'dark', 'accent'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN CREATE TYPE "public"."enum__pages_v_blocks_timeline_variant" AS ENUM('process', 'list'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN ALTER TYPE "public"."enum_pages_blocks_hero_layout" ADD VALUE 'construktion' BEFORE 'split'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN ALTER TYPE "public"."enum_pages_blocks_stats_variant" ADD VALUE 'featured'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN ALTER TYPE "public"."enum_pages_blocks_expertise_grid_layout" ADD VALUE 'services' BEFORE 'showcase'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN ALTER TYPE "public"."enum_pages_blocks_featured_projects_layout" ADD VALUE 'showcase' BEFORE 'grid'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN ALTER TYPE "public"."enum__pages_v_blocks_hero_layout" ADD VALUE 'construktion' BEFORE 'split'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN ALTER TYPE "public"."enum__pages_v_blocks_stats_variant" ADD VALUE 'featured'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN ALTER TYPE "public"."enum__pages_v_blocks_expertise_grid_layout" ADD VALUE 'services' BEFORE 'showcase'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN ALTER TYPE "public"."enum__pages_v_blocks_featured_projects_layout" ADD VALUE 'showcase' BEFORE 'grid'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_timeline_locales" (
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_timeline_locales" (
      "eyebrow" varchar,
      "title" varchar,
      "description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );
  `)

  await db.execute(sql`
    ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN IF NOT EXISTS "secondary_cta_label" varchar;
    ALTER TABLE "pages_blocks_hero_locales" ADD COLUMN IF NOT EXISTS "secondary_cta_url" varchar;
    ALTER TABLE "pages_blocks_cta" ADD COLUMN IF NOT EXISTS "variant" "enum_pages_blocks_cta_variant" DEFAULT 'centered';
    ALTER TABLE "pages_blocks_timeline" ADD COLUMN IF NOT EXISTS "background_variant" "enum_pages_blocks_timeline_background_variant" DEFAULT 'default';
    ALTER TABLE "pages_blocks_timeline" ADD COLUMN IF NOT EXISTS "media_id" integer;
    ALTER TABLE "pages_blocks_timeline" ADD COLUMN IF NOT EXISTS "variant" "enum_pages_blocks_timeline_variant" DEFAULT 'process';
    ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN IF NOT EXISTS "secondary_cta_label" varchar;
    ALTER TABLE "_pages_v_blocks_hero_locales" ADD COLUMN IF NOT EXISTS "secondary_cta_url" varchar;
    ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN IF NOT EXISTS "variant" "enum__pages_v_blocks_cta_variant" DEFAULT 'centered';
    ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN IF NOT EXISTS "background_variant" "enum__pages_v_blocks_timeline_background_variant" DEFAULT 'default';
    ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN IF NOT EXISTS "media_id" integer;
    ALTER TABLE "_pages_v_blocks_timeline" ADD COLUMN IF NOT EXISTS "variant" "enum__pages_v_blocks_timeline_variant" DEFAULT 'process';
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_timeline_locales" ADD CONSTRAINT "pages_blocks_timeline_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_timeline_locales" ADD CONSTRAINT "_pages_v_blocks_timeline_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_timeline_locales_locale_parent_id_unique" ON "pages_blocks_timeline_locales" USING btree ("_locale","_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_timeline_locales_locale_parent_id_unique" ON "_pages_v_blocks_timeline_locales" USING btree ("_locale","_parent_id");

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_media_id_media_id_fk"
        FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_timeline_media_idx" ON "pages_blocks_timeline" USING btree ("media_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_timeline_media_idx" ON "_pages_v_blocks_timeline" USING btree ("media_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_timeline_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE IF EXISTS "pages_blocks_timeline_locales" CASCADE;
  DROP TABLE IF EXISTS "_pages_v_blocks_timeline_locales" CASCADE;
  ALTER TABLE "pages_blocks_timeline" DROP CONSTRAINT IF EXISTS "pages_blocks_timeline_media_id_media_id_fk";
  ALTER TABLE "_pages_v_blocks_timeline" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_timeline_media_id_media_id_fk";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "layout" SET DEFAULT 'fullscreen'::text;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_hero_layout";
  CREATE TYPE "public"."enum_pages_blocks_hero_layout" AS ENUM('fullscreen', 'split', 'centered');
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "layout" SET DEFAULT 'fullscreen'::"public"."enum_pages_blocks_hero_layout";
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "layout" SET DATA TYPE "public"."enum_pages_blocks_hero_layout" USING "layout"::"public"."enum_pages_blocks_hero_layout";
  ALTER TABLE "pages_blocks_stats" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_stats" ALTER COLUMN "variant" SET DEFAULT 'band'::text;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_stats_variant";
  CREATE TYPE "public"."enum_pages_blocks_stats_variant" AS ENUM('band', 'grid');
  ALTER TABLE "pages_blocks_stats" ALTER COLUMN "variant" SET DEFAULT 'band'::"public"."enum_pages_blocks_stats_variant";
  ALTER TABLE "pages_blocks_stats" ALTER COLUMN "variant" SET DATA TYPE "public"."enum_pages_blocks_stats_variant" USING "variant"::"public"."enum_pages_blocks_stats_variant";
  ALTER TABLE "pages_blocks_expertise_grid" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_expertise_grid" ALTER COLUMN "layout" SET DEFAULT 'vertical'::text;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_expertise_grid_layout";
  CREATE TYPE "public"."enum_pages_blocks_expertise_grid_layout" AS ENUM('vertical', 'showcase', 'grid');
  ALTER TABLE "pages_blocks_expertise_grid" ALTER COLUMN "layout" SET DEFAULT 'vertical'::"public"."enum_pages_blocks_expertise_grid_layout";
  ALTER TABLE "pages_blocks_expertise_grid" ALTER COLUMN "layout" SET DATA TYPE "public"."enum_pages_blocks_expertise_grid_layout" USING "layout"::"public"."enum_pages_blocks_expertise_grid_layout";
  ALTER TABLE "pages_blocks_featured_projects" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_featured_projects" ALTER COLUMN "layout" SET DEFAULT 'editorial'::text;
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_featured_projects_layout";
  CREATE TYPE "public"."enum_pages_blocks_featured_projects_layout" AS ENUM('editorial', 'grid');
  ALTER TABLE "pages_blocks_featured_projects" ALTER COLUMN "layout" SET DEFAULT 'editorial'::"public"."enum_pages_blocks_featured_projects_layout";
  ALTER TABLE "pages_blocks_featured_projects" ALTER COLUMN "layout" SET DATA TYPE "public"."enum_pages_blocks_featured_projects_layout" USING "layout"::"public"."enum_pages_blocks_featured_projects_layout";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "layout" SET DEFAULT 'fullscreen'::text;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_hero_layout";
  CREATE TYPE "public"."enum__pages_v_blocks_hero_layout" AS ENUM('fullscreen', 'split', 'centered');
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "layout" SET DEFAULT 'fullscreen'::"public"."enum__pages_v_blocks_hero_layout";
  ALTER TABLE "_pages_v_blocks_hero" ALTER COLUMN "layout" SET DATA TYPE "public"."enum__pages_v_blocks_hero_layout" USING "layout"::"public"."enum__pages_v_blocks_hero_layout";
  ALTER TABLE "_pages_v_blocks_stats" ALTER COLUMN "variant" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_stats" ALTER COLUMN "variant" SET DEFAULT 'band'::text;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_stats_variant";
  CREATE TYPE "public"."enum__pages_v_blocks_stats_variant" AS ENUM('band', 'grid');
  ALTER TABLE "_pages_v_blocks_stats" ALTER COLUMN "variant" SET DEFAULT 'band'::"public"."enum__pages_v_blocks_stats_variant";
  ALTER TABLE "_pages_v_blocks_stats" ALTER COLUMN "variant" SET DATA TYPE "public"."enum__pages_v_blocks_stats_variant" USING "variant"::"public"."enum__pages_v_blocks_stats_variant";
  ALTER TABLE "_pages_v_blocks_expertise_grid" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_expertise_grid" ALTER COLUMN "layout" SET DEFAULT 'vertical'::text;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_expertise_grid_layout";
  CREATE TYPE "public"."enum__pages_v_blocks_expertise_grid_layout" AS ENUM('vertical', 'showcase', 'grid');
  ALTER TABLE "_pages_v_blocks_expertise_grid" ALTER COLUMN "layout" SET DEFAULT 'vertical'::"public"."enum__pages_v_blocks_expertise_grid_layout";
  ALTER TABLE "_pages_v_blocks_expertise_grid" ALTER COLUMN "layout" SET DATA TYPE "public"."enum__pages_v_blocks_expertise_grid_layout" USING "layout"::"public"."enum__pages_v_blocks_expertise_grid_layout";
  ALTER TABLE "_pages_v_blocks_featured_projects" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_featured_projects" ALTER COLUMN "layout" SET DEFAULT 'editorial'::text;
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_featured_projects_layout";
  CREATE TYPE "public"."enum__pages_v_blocks_featured_projects_layout" AS ENUM('editorial', 'grid');
  ALTER TABLE "_pages_v_blocks_featured_projects" ALTER COLUMN "layout" SET DEFAULT 'editorial'::"public"."enum__pages_v_blocks_featured_projects_layout";
  ALTER TABLE "_pages_v_blocks_featured_projects" ALTER COLUMN "layout" SET DATA TYPE "public"."enum__pages_v_blocks_featured_projects_layout" USING "layout"::"public"."enum__pages_v_blocks_featured_projects_layout";
  DROP INDEX IF EXISTS "pages_blocks_timeline_media_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_timeline_media_idx";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN IF EXISTS "secondary_cta_label";
  ALTER TABLE "pages_blocks_hero_locales" DROP COLUMN IF EXISTS "secondary_cta_url";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "pages_blocks_timeline" DROP COLUMN IF EXISTS "background_variant";
  ALTER TABLE "pages_blocks_timeline" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "pages_blocks_timeline" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN IF EXISTS "secondary_cta_label";
  ALTER TABLE "_pages_v_blocks_hero_locales" DROP COLUMN IF EXISTS "secondary_cta_url";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN IF EXISTS "variant";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN IF EXISTS "background_variant";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN IF EXISTS "media_id";
  ALTER TABLE "_pages_v_blocks_timeline" DROP COLUMN IF EXISTS "variant";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_cta_variant";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_timeline_background_variant";
  DROP TYPE IF EXISTS "public"."enum_pages_blocks_timeline_variant";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_cta_variant";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_timeline_background_variant";
  DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_timeline_variant";`)
}
