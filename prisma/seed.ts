import 'dotenv/config'; // Carga el archivo .env automáticamente
import { PrismaClient } from '../src/generado/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcryptjs';

function configDelDriver(databaseUrl: string) {
    const u = new URL(databaseUrl);
    return {
        host: u.hostname,
        port: Number(u.port || 3306),
        user: decodeURIComponent(u.username),
        password: decodeURIComponent(u.password),
        database: u.pathname.replace(/^\//, ''),
        allowPublicKeyRetrieval: true,
    };
}

const url = process.env.DATABASE_URL;
if (!url) {
    throw new Error('Falta DATABASE_URL. Revisa el archivo .env');
}

// Instanciamos el cliente pasándole el argumento que exige y el adaptador correcto
const prisma = new PrismaClient({ adapter: new PrismaMariaDb(configDelDriver(url)) });

async function main() {
    // 1. Limpiar la tabla de usuarios primero
    await prisma.usuario.deleteMany();

    // 2. Crear los usuarios
    const passwordHash = await bcrypt.hash('gimnasio2026', 10);
    await prisma.usuario.createMany({
        data: [
            { correo: 'karla@itson.mx', passwordHash, rol: 'miembro', miembroId: 1 },
            { correo: 'ana@itson.mx', passwordHash, rol: 'entrenador' },
            { correo: 'admin@itson.mx', passwordHash, rol: 'admin' },
        ],
    });

    console.log('Seed ejecutado correctamente.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });