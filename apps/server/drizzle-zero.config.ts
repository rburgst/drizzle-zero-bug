import { drizzleZeroConfig } from 'drizzle-zero'
import * as drizzleSchema from './drizzle/drizzle-schema'

// Define your configuration file for the CLI
export default drizzleZeroConfig(drizzleSchema, {
  // Specify which tables and columns to include in the Zero schema.
  // This allows for the "expand/migrate/contract" pattern recommended in the Zero docs.
  // When a column is first added, it should be set to false, and then changed to true
  // once the migration has been run.

  // All tables/columns must be defined, but can be set to false to exclude them from the Zero schema.
  // Column names match your Drizzle schema definitions
  tables: {
    // this can be set to false
    // e.g. user: false,
    users: {
      id: true,
      name: true,
    },
    todos: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      createdBy: true,
      updatedBy: true,
    },
  },
})
