import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { db } from "$lib";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { employee, sessionTable } from "$lib/schema";

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
			surname: attributes.surname,
			username: attributes.username,
			password: attributes.hashed_password,
			email: attributes.email,
			role: attributes.role,
			department: attributes.department,
			location: attributes.location,
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
	surname: string;
	username: string;
	email: string;
	role: string;
	department: string;
	location: string;
	hashed_password: string;
}