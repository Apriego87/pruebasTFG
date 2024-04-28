import { db } from '$lib';
import { employee, note } from '$lib/schema.js';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types.js';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth.js';

export const load: PageServerLoad = async () => {
    const notes = await db.select().from(note)

    await Promise.all(notes.map(async (item) => {
        const creator = await db.select().from(employee).where(eq(employee.id, item.creatorID));
        if (creator.length > 0) {
            item.creatorName = `${creator[0].name} ${creator[0].surname}`;
        }
    }));

    return {
        notes, title: 'Tablón de Anuncios'
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request, cookies }) => {
        const data = await request.formData();

        const userID = await db.select().from(employee).where(eq(employee.id, cookies.get('userid')))

        console.log(String(data.get('category')))

        await db.insert(note).values({
            creatorID: userID[0].id,
            title: String(data.get('title')),
            description: String(data.get('description')),
            category: String(data.get('category'))
        })

        return { success: true };
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
};