import { userArea } from './schema';
import { faker } from "@faker-js/faker";
import { db } from '$lib';

enum Role {
    Jefe = 'jefe',
    Encargado = 'encargado',
    Programador = 'programador'
}

enum Location {
    Barbastro = 'Barbastro',
    Huesca = 'Huesca',
    Monzon = 'Monzón',
}

const roles: Role[] = [Role.Jefe, Role.Encargado, Role.Programador]
const locations: Location[] = [Location.Barbastro, Location.Huesca, Location.Monzon]

async function insertFakeUsers() {
    for (let i = 0; i < 100; i++) {
        await db.insert(userArea).values({
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            role: roles[Math.floor(Math.random() * roles.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            pfp: faker.image.avatar()
        });
    }
}

insertFakeUsers().then(() => {
    console.log('Insertion complete');
}).catch(error => {
    console.error('Error inserting fake users:', error);
});