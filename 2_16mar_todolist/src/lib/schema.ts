import { pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
    userID: varchar('userID').notNull(),
    descrption: varchar('description').notNull(),
    checked: boolean('checked').default(false)
})