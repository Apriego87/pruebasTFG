/* import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const student = mysqlTable('student', {
    fName: varchar('name', { length: 20 }).notNull(),
    surname: varchar('surname', { length: 50 }).notNull(),
    email: varchar('email', { length: 70 }).primaryKey(),
}) */

import { pgTable, varchar } from 'drizzle-orm/pg-core';

export const student = pgTable('student', {
    fName: varchar('name', { length: 20 }).notNull(),
    surname: varchar('surname', { length: 50 }).notNull(),
    email: varchar('email', { length: 70 }).primaryKey(),
})