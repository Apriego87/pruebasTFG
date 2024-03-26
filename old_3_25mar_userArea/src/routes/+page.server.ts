import { db } from "$lib";
import { userArea } from "$lib/schema";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async () => {
    const users = await db.select().from(userArea)

    return {
        users
    }
}