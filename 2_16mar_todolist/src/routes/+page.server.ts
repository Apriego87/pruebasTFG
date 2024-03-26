/** @type {import('./$types').PageData} */

import { db } from '$lib'
import { tasks } from '$lib/schema.js'
import { and, eq } from 'drizzle-orm';

import type { PageServerLoad, Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
    let logged = false
    if (cookies.get('auth_session')) {
        logged = true
    }
    else {
        return redirect(302, '/login')
    }

    try {
        const userID = cookies.get('userid') || ''
        const allTasks = await db.select().from(tasks).where(eq(tasks.userID, userID))

        return {
            allTasks, logged
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

        const userID = cookies.get('userid');

        if (!userID) {
            return fail(401, {
                message: "Usuario no autenticado"
            });
        }

        await db.insert(tasks).values({
            userID: userID,
            description: task
        })

        return { success: true }
    },
    update: async ({ request, cookies }) => {
        const data = await request.json()

        console.log(data)

        const task = data

        const userID = cookies.get('userid');
        if (!userID) {
            return fail(401, {
                message: "Usuario no autenticado"
            });
        }

        await db.update(tasks).set({
            checked: !task.checked
        }).where(
            and(
                eq(tasks.userID, userID),
                eq(tasks.description, task.description)
            )
        )
    },
    deleteChecked: async ({ cookies }) => {
        const userID = cookies.get('userid') || ''
        await db.delete(tasks).where(and(eq(tasks.checked, true), eq(tasks.userID, userID)))
    },
    signout: async (event) => {
        if (!event.locals.session) {
            return fail(401);
        }
        await auth.invalidateSession(event.locals.session.id);
        const sessionCookie = auth.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            expires: new Date(0),
            path: "/",
            secure: false
        });

        event.cookies.set('userid', '', {
            expires: new Date(0),
            path: '/',
            secure: false
        });

        return redirect(302, "/");
    }
}