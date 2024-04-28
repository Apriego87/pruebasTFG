import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ cookies }) => {
    let logged = false
    if (cookies.get('auth_session')) {
        logged = true
    }


    /* else {
        return redirect(302, '/login')
    } */

    return {
        logged
    }
}

