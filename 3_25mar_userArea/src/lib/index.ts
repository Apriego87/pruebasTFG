// place files you want to import through the `$lib` alias in this folder.

import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '$lib/schema'

import dotenv from 'dotenv'
dotenv.config()

const queryClient = postgres(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

export const db = drizzle(queryClient, { schema, logger: true });