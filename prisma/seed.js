const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");

const prisma = new PrismaClient()


async function main() {
    // truncate
    await prisma.therapistsOnMenus.deleteMany({})
    await prisma.therapist.deleteMany({})
    await prisma.menu.deleteMany({})
    await prisma.user.deleteMany({})

    // menu
    await prisma.menu.createMany({
        data: [
            { id: 1, name: "もみほぐし＋オイルセット" },
            { id: 2, name: "もみほぐし＋フットセット" },
            { id: 3, name: "オイル＋フットセット" },
            { id: 4, name: "もみほぐし" },
            { id: 5, name: "オイルトリートメント" }
        ]
    })
    // therapist
    await prisma.therapist.createMany({
        data: [
            {
                id: 1,
                name: 'sato hikaru',
                comment: 'よろしくお願いします。'
            },
            {
                id: 2,
                name: 'みく',
                comment: 'がんばります'
            }
        ]
    })
    // user
    await bcrypt.hash("password", 10, async (_, hashedPassword) => {
        await prisma.user.create({
            data: {
                name: 'ono ryo',
                mail: 'onopod@gmail.com',
                password: hashedPassword
            }
        })
    })
    // therapistsOnMenus
    await prisma.therapistsOnMenus.createMany({
        data: [
            { therapistId: 1, menuId: 1, treatmentTime: 60, price: 6000 },
            { therapistId: 1, menuId: 2, treatmentTime: 60, price: 6001 },
            { therapistId: 1, menuId: 3, treatmentTime: 60, price: 6002 },
            { therapistId: 1, menuId: 4, treatmentTime: 60, price: 6003 },
            { therapistId: 1, menuId: 5, treatmentTime: 60, price: 6004 },
        ]
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