import { relations } from 'drizzle-orm'
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

// Define the timer status enum
export const timerStatusEnum = pgEnum('timer_status', ['running', 'stopped'])

// Define the user table
export const users = pgTable('user', {
  id: uuid('id').primaryKey(),
  name: varchar('name').notNull(),
})

// Define relationships
// Define the timerecord table
export const todos = pgTable('todo', {
  id: uuid('id').primaryKey(),
  title: text('title'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  updatedBy: uuid('updated_by')
    .notNull()
    .references(() => users.id),
})

export const usersRelations = relations(users, ({ many }) => ({
  createdTimerecords: many(todos, { relationName: 'todoCreator' }),
  updatedTimerecords: many(todos, { relationName: 'todoUpdater' }),
}))

// Define timerecord relationships
export const todosRelations = relations(todos, ({ one }) => ({
  creator: one(users, {
    fields: [todos.createdBy],
    references: [users.id],
    relationName: 'todoCreator',
  }),
  updater: one(users, {
    fields: [todos.updatedBy],
    references: [users.id],
    relationName: 'todoUpdater',
  }),
}))

// Export all types
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Timerecord = typeof todos.$inferSelect
export type NewTimerecord = typeof todos.$inferInsert
