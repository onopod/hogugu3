import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました");
    }
}

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Hogugu login',
            credentials: {
                mail: {
                    label: 'mail',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await main();
                const user = await prisma.user.findFirstOrThrow({
                    where: {
                        mail: credentials.mail,
                    }
                });
                const matched = await bcrypt.compare(credentials?.password, user.password)
                if (matched) {
                    return user
                } else {
                    return null
                }
            },
        }),
    ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };

