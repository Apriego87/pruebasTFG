/** @type {import('./$types').PageData} */

import { db } from '$lib'
import { task } from '$lib/schema.js'
import { and, eq } from 'drizzle-orm';

import type { PageServerLoad, Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
    /* let logged = false
    if (cookies.get('auth_session')) {
        logged = true
    }
    else {
        return redirect(302, '/login')
    } */

    try {
        const userID = cookies.get('userid') || ''
        const allTasks = await db.select().from(task).where(eq(task.creatorID, userID))

        return {
            allTasks, title: 'Lista de Tareas'
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
        const newTask = String(data.get('task'))

        const userID = cookies.get('userid');

        if (!userID) {
            return fail(401, {
                message: "Usuario no autenticado"
            });
        }

        await db.insert(task).values({
            creatorID: userID,
            description: newTask
        })

        return { success: true }
    },
    update: async ({ request, cookies }) => {
        const data = await request.json()

        console.log(data)

        const newTask = data

        const userID = cookies.get('userid');
        if (!userID) {
            return fail(401, {
                message: "Usuario no autenticado"
            });
        }

        await db.update(task).set({
            checked: !newTask.checked
        }).where(
            and(
                eq(task.creatorID, userID),
                eq(task.description, newTask.description)
            )
        )
    },
    deleteChecked: async ({ cookies }) => {
        const userID = cookies.get('userid') || ''
        await db.delete(task).where(and(eq(task.checked, true), eq(task.creatorID, userID)))
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

        return redirect(302, "/login");
    }
}