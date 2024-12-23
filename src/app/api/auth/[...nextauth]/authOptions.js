import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';

const bcrypt = require('bcrypt');

const authOptions = {
    providers: [
        CredentialsProvider({
            id: "user",
            name: 'Hogugu',
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
                        image: user.imageFileName,
                        role: "user"
                    };
                } else {
                    return null
                }
            },
        }),
        CredentialsProvider({
            id: "therapist",
            name: 'Hogugu Therapist',
            credentials: {
                mail: {
                    label: 'mail',
                    type: 'text',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const therapist = await prisma.therapist.findFirstOrThrow({
                        where: {
                            mail: credentials.mail,
                        }
                    });
                    const matched = credentials?.password && await bcrypt.compare(credentials.password, therapist.password);
                    if (matched) {
                        return {
                            ...therapist,
                            email: therapist.mail,
                            image: therapist.imageFileName,
                            role: "therapist"
                        };
                    } else {
                        return null
                    }

                } catch (err) {
                    console.dir(err)
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;

            }
            return token;
        },
        async session({ session, token }) {
            if (token?.id) {
                session.user = {
                    ...session.user,
                    image: token.picture,
                    id: token.id,
                    role: token.role

                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/login"
    }
}
export default authOptions;