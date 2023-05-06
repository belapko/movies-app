import NextAuth, {AuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from '@/libs/prismadb';
import {compare} from 'bcrypt'

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required!');
                }
                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user.hashedPassword) {
                    throw new Error('Email does not exists!');
                }
                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
                if (!isCorrectPassword) {
                    throw new Error('Wrong password!')
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: '/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions)
