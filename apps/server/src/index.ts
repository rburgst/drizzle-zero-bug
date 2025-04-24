import { serve } from '@hono/node-server'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { invariant } from 'es-toolkit'
import { Hono } from 'hono'

import { db } from '~/db'
import { env } from '~/env' // On server

export const config = {
  runtime: 'edge',
}

export const app = new Hono().basePath('/api')

const authSecret = env.ZERO_AUTH_SECRET
invariant(authSecret, 'no auth secret')

app.get('', (c) => c.text('Hello API'))
app.get('/health', (c) => c.json({ status: 'ok' }))

async function startup() {
  await migrate(db, {
    migrationsFolder: './drizzle',
    migrationsTable: 'drizzle_migrations',
    migrationsSchema: 'public',
  })

  serve(
    {
      fetch: app.fetch,
      port: env.PORT,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`)
    }
  )
}

startup()
  .then(() => console.log('startup done'))
  .catch((e) => console.error('startup failed', e))
