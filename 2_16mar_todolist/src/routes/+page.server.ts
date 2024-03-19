/** @type {import('./$types').PageData} */

import { db } from '$lib'
import { tasks } from '$lib/schema.js'
import { and, eq } from 'drizzle-orm';

import type { PageServerLoad, Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
    let id = cookies.get('userid');

    if (!id) {
        id = crypto.randomUUID();
        cookies.set('userid', id, { path: '/' });
    }

    try {
        const allTasks = await db.select().from(tasks)

        return {
            allTasks
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            status: 404,
            error: 'Data not found',
        };
    }
}

export const actions: Actions = {
    send: async ({ request, cookies }) => {
        const data = await request.formData()

        // const task = JSON.stringify(data.get('task'))
        const task = String(data.get('task'))

        // cookies.set('task', task, {})
        // const task = data.get('task')
        await db.insert(tasks).values({
            userID: cookies.get('userid'),
            description: task
        })

        return { success: true }
    },
    update: async ({ request, cookies }) => {
        const data = await request.json()

        console.log(data)

        const task = data

        await db.update(tasks).set({
            checked: !task.checked
        }).where(
            and(
                eq(tasks.userID, cookies.get('userid')),
                eq(tasks.description, task.description)
            )
        )
    },
    signOut: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(event.locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
		redirect(302, "/");
	}
    /* delete: async ({ cookies, request }) => {
        const data = await request.formData()
        db.deleteTodo(cookies.get('userid'), data.get('task'))
    } */
}