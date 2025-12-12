import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export type NewUser = { name: string, email: string, password: string };

export async function registerUser(payload: NewUser) {
    const existing = await prisma.user.findUnique({ 
        where: { email: payload.email }
    });

    if(existing) {
        throw new Error("Email already in use");
    }

    const hashed = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashed,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    });

    return user;
}

export async function validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) {
        return null;
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        return null;
    }

    const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    return safeUser;
}