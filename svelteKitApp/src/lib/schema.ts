import { pgTable, varchar, boolean, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
    taskID: serial('taskID').primaryKey(),
    userID: varchar('userID').notNull(),
    description: varchar('description').notNull(),
    checked: boolean('checked').default(false)
})

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    name: varchar("name").notNull(),
    username: varchar("username").notNull().unique(),
    hashed_password: text('hashed_password').notNull()
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});