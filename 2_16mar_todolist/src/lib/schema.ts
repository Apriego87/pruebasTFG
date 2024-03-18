import { pgTable, varchar, boolean, uuid } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
    userID: uuid('userID').notNull(),
    description: varchar('description').notNull(),
    checked: boolean('checked').default(false)
})