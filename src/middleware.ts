export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/reservation(.*)",
        "/message(.*)",
        "/profile(.*)",
        "/logout(.*)",
        "/favorites(.*)",
        "/t/reservation(.*)",
        "/t/message(.*)",
        "/t/profile(.*)",
        "/t/logout(.*)",
        "/t/favorites(.*)",
        "/t/menu(.*)",
        "/t/schedule(.*)"
    ]
};
