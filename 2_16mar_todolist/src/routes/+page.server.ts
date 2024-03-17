import { db } from '$lib'
import { tasks } from '$lib/schema.js'

export function load({ cookies }) {
    let id = cookies.get('userid');

    if (!id) {
        id = crypto.randomUUID();
        cookies.set('userid', id, { path: '/' });
    }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData()

        const task = String(data.get('task'))

        // cookies.set('task', task, {})
        // const task = data.get('task')
        await db.insert(tasks).values({
            userID: cookies.get('userid'),
            descrption: task
        })

        return { success: true }

    },
    /* delete: async ({ cookies, request }) => {
        const data = await request.formData()
        db.deleteTodo(cookies.get('userid'), data.get('task'))
    } */
}