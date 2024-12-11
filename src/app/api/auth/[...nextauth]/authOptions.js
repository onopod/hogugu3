import { PrismaClient } from "@prisma/client";
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
                const matched = credentials?.password && await bcrypt.compare(credentials.password, user.password);
                if (matched) {
                    return {
                        ...user,
                        email: user.mail,
                        image: user.imageFileName
                    };
                } else {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // JWTトークンに`id`を追加
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user = {
                    ...session.user,
                    id: token.id, // tokenからidを取得
                };
            }
            // console.log("Session:", session); // デバッグ用ログ
            // console.log("Token:", token); // デバッグ用ログ
            return session;
        },
    }
}
export default authOptions;