import { db } from "$lib";
import { employee } from "$lib/schema";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { auth } from "$lib/server/auth";


export const load: PageServerLoad = async ({ cookies }) => {
    /* let logged = false
    if (cookies.get('auth_session')) {
        logged = true
    }
    else {
        return redirect(302, '/login')
    } */

    const users = await db.select().from(employee)

    return {
        users, title: 'Área de Empleados'
    }
}

export const actions = {
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