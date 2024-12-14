import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

const bcrypt = require('bcrypt');

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
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user = {
                    ...session.user,
                    image: token.picture,
                    id: token.id,
                };
            }
            return session;
        },
    }
}
export default authOptions;