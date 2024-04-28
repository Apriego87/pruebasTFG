import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { db } from "$lib";

import type { Actions } from "./$types";
import { employee } from "$lib/schema";

import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { eq } from "drizzle-orm";

const schema = z.object({
    name: z.string(),
    surname: z.string(),
    username: z.string().min(4).max(31).regex(new RegExp(/^[a-z0-9_]+$/), {
        message: 'El usuario solo puede contener letras minúsculas, números o guión bajo',
    }),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    email: z.string().email(),
    role: z.enum(['jefe', 'encargado', 'programador']),
    department: z.string(),
    location: z.string(),
    // pfp: z.string().optional()
}).refine(
    (values) => {
        return values.password === values.confirmPassword;
    },
    {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    }
);

export const load = (async () => {
    const form = await superValidate(zod(schema));

    return { form, title: 'Registo de Usuarios' };
});

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));

        if (!form.valid) {
            return fail(400, { form });
        }
        else {

            const name = (form.data.name as string) || ''
            const surname = (form.data.surname as string) || ''
            const username = (form.data.username as string) || '';
            const password = (form.data.password as string) || '';
            const email = (form.data.email as string) || '';
            const role = (form.data.role as string) || '';
            const department = (form.data.department as string) || '';
            const location = (form.data.location as string) || '';
            // const pfp = (form.data.pfp as string) || '';

            if (((await db.select().from(employee).where(eq(employee.username, username))).toString() != '')) {
                return setError(form, 'username', 'Este usuario ya existe');
            }

            else {
                const employeeID = generateId(15);
                const hashedPassword = await new Argon2id().hash(password);

                await db.insert(employee).values({
                    id: employeeID,
                    name: name,
                    surname: surname,
                    username: username,
                    password: hashedPassword,
                    email: email,
                    role: role,
                    department: department,
                    location: location,
                    pfp: 'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_570xN.3768265623_sji1.jpg'
                })

                return redirect(302, "/login");
            }
        }
    }
};