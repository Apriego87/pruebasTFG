import { serial, varchar, timestamp, pgTable, boolean, text, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["jefe", "encargado", "programador"])

export const userArea = pgTable("userArea", {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    surname: varchar("surname"),
    email: varchar("email"),
    role: roleEnum("role"),
    location: varchar("location"),
    pfp: varchar("pfp")
});

export const employee = pgTable('employees', {
    id: text("id").unique().primaryKey(),
    name: varchar('name').notNull(),
    surname: varchar('surname').notNull(),
    username: varchar('username').notNull().unique(),
    password: varchar('password').notNull(),
    email: varchar('email').notNull().unique(),
    role: roleEnum('role').notNull(),
    department: varchar('department').notNull(),
    location: varchar('location').notNull(),
    pfp: varchar('pfp')
})

export const event = pgTable('events', {
    id: serial('id').notNull().unique(),
    creatorID: varchar('creatorID').notNull().references(() => employee.id, {onDelete: 'cascade'}),
    title: varchar('title').notNull(),
    description: varchar('description'),
    dueDate: timestamp('dueDate').notNull(),
    participants: varchar('participants').array(),
    department: varchar('department')
})

export const note = pgTable('notes', {
    id: serial('id').notNull().unique(),
    creatorID: varchar('creatorID').notNull().references(() => employee.id, {onDelete: 'cascade'}),
    title: varchar('title').notNull(),
    description: varchar('description'),
    category: varchar('category')
})

export const file = pgTable('files', {
    id: serial('id').notNull().unique(),
    creatorID: varchar('creatorID').notNull().references(() => employee.id, {onDelete: 'cascade'}),
    name: varchar('name').notNull(),
    mime: varchar('mime').notNull(),
    url: varchar('url').notNull()
})

export const chat = pgTable('chats', {
    id: serial('id').notNull().unique(),
    senderID: varchar('senderID').notNull().references(() => employee.id, {onDelete: 'cascade'}),
    receiverID: varchar('receiverID').notNull().references(() => employee.id, {onDelete: 'cascade'}),
    message: text('message').notNull(),
    timestamp: timestamp("timestamp", {
        withTimezone: true,
        mode: "date"
    }).notNull()
})

export const task = pgTable('tasks', {
    id: serial('id').notNull().unique(),
    creatorID: varchar('creatorID').notNull().references(() => employee.id, {onDelete: 'cascade'}),
    description: varchar('description').notNull(),
    checked: boolean('checked').notNull().default(false)
})

/* export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => employee.id, {onDelete: 'cascade'}),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
}) */

export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => employee.id, {onDelete: 'cascade'}),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

/* export const tasks = pgTable('tasks', {
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
}); */