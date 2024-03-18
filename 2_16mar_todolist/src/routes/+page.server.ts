/** @type {import('./$types').PageData} */

import { db } from '$lib'
import { tasks } from '$lib/schema.js'
import { and, eq, like } from 'drizzle-orm';

export async function load({ cookies }) {
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
            status: 500,
            error: 'Internal Server Error',
        };
    }
}

export const actions = {
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
    }
    /* delete: async ({ cookies, request }) => {
        const data = await request.formData()
        db.deleteTodo(cookies.get('userid'), data.get('task'))
    } */
}