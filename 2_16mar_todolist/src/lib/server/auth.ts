import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { db } from "$lib";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, employee } from "$lib/schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, employee); // your adapter

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
    getUserAttributes: (attributes) => {
        return {
			id: attributes.id,
			name: attributes.name,
            username: attributes.username,
			hashed_password: attributes.hashed_password
        }
    }
});

declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	id: string;
	name: string;
    username: string;
	hashed_password: string;
}