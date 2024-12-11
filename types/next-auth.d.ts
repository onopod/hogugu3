import { DefaultSession } from "next-auth"

declare module "next-auth/client" {

    interface Session {
        user: {
            id: Int
        } & DefaultSession["user"]
    }
}