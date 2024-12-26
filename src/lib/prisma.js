import { PrismaClient } from "@prisma/client";

let prisma;

if (!global.prisma) {
    prisma = new PrismaClient({
        // log: ['query'],
    });
    if (process.env.NODE_ENV !== 'production') {
        global.prisma = prisma;
    }
} else {
    prisma = global.prisma;
}

module.exports = prisma;