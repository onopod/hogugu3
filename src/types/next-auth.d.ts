import { DefaultSession } from "next-auth";

declare module "next-auth" {

    interface Session {
        user: {
            id: number,
            mail: string,
            image: string,
        } & DefaultSession["user"]
    }

    interface User {
        id: number;
        mail: string;
        image: string;
    }
}