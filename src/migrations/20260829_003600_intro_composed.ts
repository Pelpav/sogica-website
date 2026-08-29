import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_intro_variant" AS ENUM('simple', 'composed');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_intro_variant" AS ENUM('simple', 'composed');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "pages_blocks_intro"
      ADD COLUMN IF NOT EXISTS "variant" "enum_pages_blocks_intro_variant" DEFAULT 'simple',
      ADD COLUMN IF NOT EXISTS "featured_stat_value" varchar;

    ALTER TABLE "pages_blocks_intro_locales"
      ADD COLUMN IF NOT EXISTS "featured_stat_label" varchar;

    ALTER TABLE "_pages_v_blocks_intro"
      ADD COLUMN IF NOT EXISTS "variant" "enum__pages_v_blocks_intro_variant" DEFAULT 'simple',
      ADD COLUMN IF NOT EXISTS "featured_stat_value" varchar;

    ALTER TABLE "_pages_v_blocks_intro_locales"
      ADD COLUMN IF NOT EXISTS "featured_stat_label" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_intro_locales" DROP COLUMN IF EXISTS "featured_stat_label";
    ALTER TABLE "pages_blocks_intro" DROP COLUMN IF EXISTS "featured_stat_value";
    ALTER TABLE "pages_blocks_intro" DROP COLUMN IF EXISTS "variant";

    ALTER TABLE "_pages_v_blocks_intro_locales" DROP COLUMN IF EXISTS "featured_stat_label";
    ALTER TABLE "_pages_v_blocks_intro" DROP COLUMN IF EXISTS "featured_stat_value";
    ALTER TABLE "_pages_v_blocks_intro" DROP COLUMN IF EXISTS "variant";

    DROP TYPE IF EXISTS "public"."enum_pages_blocks_intro_variant";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_intro_variant";
  `)
}
