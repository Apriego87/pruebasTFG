import { auth } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { Argon2id } from "oslo/password";
import { db } from "$lib";

import type { Actions } from "./$types";
import { employee } from "$lib/schema";
import { eq } from "drizzle-orm";

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached

const schema = z.object({
	username: z.string().min(4).max(31).regex(new RegExp(/^[a-z0-9_]+$/), {
		message: 'Username must only contain lowercase letters, digits, hyphens, and underscores',
	}),
	password: z.string().min(8).max(50)
});

export const load = (async () => {
	const form = await superValidate(zod(schema));

	// Always return { form } in load functions
	return { form, title: 'Inicio de Sesión' };
});

export const actions: Actions = {
	default: async ({ request, cookies }) => {

		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}
		else {
			const username = (form.data.username as string) || '';
			const password = (form.data.password as string) || '';

			const existingUser = await db.select().from(employee).where(eq(employee.username, username.toLowerCase()))

			if (!existingUser) {
				return fail(400, {
					message: "Incorrect username or password"
				});
			}


			const validPassword = await new Argon2id().verify(existingUser[0].password, password);
			if (!validPassword) {
				return fail(400, {
					message: "Incorrect username or password"
				});
			}
			console.log(existingUser[0].id)
			const session = await auth.createSession(existingUser[0].id, {});
			const sessionCookie = auth.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: "/",
				secure: true,
				httpOnly: true,
				...sessionCookie.attributes
			})

			cookies.set('userid', existingUser[0].id, {
				secure: false,
				path: '/'
			})


			return redirect(302, "/");
		}

	}
};