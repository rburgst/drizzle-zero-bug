import { env } from '~/env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/drizzle-schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  migrations: {
    table: 'drizzle_migrations',
    schema: 'public',
  },
})
