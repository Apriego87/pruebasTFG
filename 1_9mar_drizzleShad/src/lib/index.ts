// place files you want to import through the `$lib` alias in this folder.

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'
import { migrate } from 'drizzle-orm/postgres-js/migrator';

// for migrations
export const migrationClient = postgres("postgres://postgres:antonio@34.226.188.189:5432/antonio", { max: 1 });
await migrate(drizzle(migrationClient), {
    migrationsFolder: '../drizzle',
})
await migrationClient.end()

const queryClient = postgres("postgres://postgres:antonio@34.226.188.189:5432/antonio");
export const db = drizzle(queryClient, { schema });