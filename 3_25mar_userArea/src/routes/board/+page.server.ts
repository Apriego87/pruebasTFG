import { db } from '$lib';
import { note } from '$lib/schema.js';

export const load: PageServerLoad = async () => {
    const notes = await db.select().from(note)

    return {
        notes
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        // const title = data.get('title');

        console.log(String(data.get('category')))

        await db.insert(note).values({
            creatorID: 1,
            title: String(data.get('title')),
            description: String(data.get('description')),
            category: String(data.get('category'))
        })

        return { success: true };
    }
};