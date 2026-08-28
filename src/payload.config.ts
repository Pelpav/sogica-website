import path from 'path';
import { fileURLToPath } from 'url';

import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { nodemailerAdapter } from '@payloadcms/email-nodemailer';

import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Pages, Expertises } from './collections/Pages';
import { Projects } from './collections/Projects';
import { ClientsPartners, Equipment } from './collections/ClientsPartners';
import { FormSubmissions, PrivateMedia } from './collections/FormSubmissions';

import { SiteSettings, LegalSettings } from './globals/SiteSettings';
import { ThemeSettings, Header, Footer } from './globals/ThemeSettings';

import { locales, defaultLocale } from './lib/i18n';
import { getStoragePlugins } from './lib/storage';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/** Payload codegen and Vercel builds load this file without opening a DB connection. */
function resolveDatabaseURL(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const lifecycle = process.env.npm_lifecycle_event;
  const isCodegen =
    lifecycle === 'generate:importmap' || lifecycle === 'generate:types';

  if (isCodegen || (process.env.VERCEL === '1' && !process.env.DATABASE_URL)) {
    return 'postgresql://build:build@127.0.0.1:5432/build?sslmode=disable';
  }

  throw new Error('DATABASE_URL is required');
}

const databaseURL = resolveDatabaseURL();

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },

    meta: {
      titleSuffix: '— SOGICA CMS',
    },
  },

  collections: [
    Users,
    Media,
    PrivateMedia,
    Pages,
    Expertises,
    Projects,
    ClientsPartners,
    Equipment,
    FormSubmissions,
  ],

  globals: [
    SiteSettings,
    LegalSettings,
    ThemeSettings,
    Header,
    Footer,
  ],

  editor: lexicalEditor(),

  secret:
    process.env.PAYLOAD_SECRET ||
    'dev-secret-change-in-production-min-32-chars',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: databaseURL,

      // Payload / node-postgres -> Neon pooled endpoint
      max: 5,
      connectionTimeoutMillis: 30_000,
      idleTimeoutMillis: 30_000,
      keepAlive: true,
    },

    // Schema changes are handled explicitly through migrations.
    // This avoids Drizzle's automatic schema introspection / db push.
    push: false,

    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  sharp,

  localization: {
    locales: locales.map((code) => ({
      code,
      label: code === 'fr' ? 'Français' : 'English',
    })),

    defaultLocale,
    fallback: true,
  },

  plugins: [...getStoragePlugins()],

  email: nodemailerAdapter({
    defaultFromAddress:
      process.env.SMTP_FROM || 'noreply@sogica.ml',

    defaultFromName: 'SOGICA SA',

    transportOptions: process.env.SMTP_HOST
      ? {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),

        auth: process.env.SMTP_USER
          ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          }
          : undefined,
      }
      : {
        jsonTransport: true,
      },
  }),

  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ].filter(Boolean),
});