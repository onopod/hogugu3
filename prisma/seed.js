const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");

const prisma = new PrismaClient()


async function main() {
    await prisma.therapist.create({
        data: {
            name: 'sato hikaru',
            comment: 'よろしくお願いします。'
        }
    })

    await prisma.therapist.create({
        data: {
            name: 'みく',
            comment: 'がんばります'
        }
    })
    await bcrypt.hash("password", 10, async (_, hashedPassword) => {
        await prisma.user.create({
            data: {
                name: 'ono ryo',
                mail: 'onopod@gmail.com',
                password: hashedPassword
            }
        })
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })