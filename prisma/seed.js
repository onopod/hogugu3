const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");

const prisma = new PrismaClient()


async function main() {
    // truncate
    await prisma.message.deleteMany({})
    await prisma.reservation.deleteMany({})
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
            { id: 1, name: 'sato hikaru', comment: 'よろしくお願いします。', imageFileName: "tavatar.jpg" },
            { id: 2, name: 'みく', comment: 'がんばります', imageFileName: "tavatar.jpg" }
        ]
    })
    // therapistsOnMenus
    await prisma.therapistsOnMenus.createMany({
        data: [
            { id: 1, therapistId: 1, menuId: 1, treatmentTime: 60, price: 6000 },
            { id: 2, therapistId: 1, menuId: 2, treatmentTime: 60, price: 6001 },
            { id: 3, therapistId: 1, menuId: 3, treatmentTime: 60, price: 6002 },
            { id: 4, therapistId: 1, menuId: 4, treatmentTime: 60, price: 6003 },
            { id: 5, therapistId: 1, menuId: 5, treatmentTime: 60, price: 6004 },
            { id: 6, therapistId: 2, menuId: 1, treatmentTime: 90, price: 7200 },
        ]
    })

    // user
    await bcrypt.hash("password", 10, async (_, hashedPassword) => {
        await prisma.user.createMany({
            data: [
                { id: 1, name: 'ono ryo', mail: 'onopod@gmail.com', password: hashedPassword },
                { id: 2, name: 'ono hanako', mail: 'onopod2@gmail.com', password: hashedPassword }
            ]
        })
        // reservation
        await prisma.reservation.createMany({
            data: [
                { userId: 1, therapistMenuId: 1, startDt: "2024-12-08T21:00:00.000+09:00" },
                { userId: 1, therapistMenuId: 6, startDt: "2024-12-09T22:30:00.000+09:00" },
                { userId: 2, therapistMenuId: 2, startDt: "2024-12-02T21:00:00.000+09:00" },
            ]
        })

        // message 
        await prisma.message.createMany({
            data: [
                { userId: 1, therapistId: 1, message: "こんにちは", isUserSend: true, created: "2024-12-08T21:00:00.000+09:00" },
                { userId: 1, therapistId: 1, message: "どうかされましたか？", created: "2024-12-08T21:01:00.000+09:00" },
                { userId: 1, therapistId: 1, message: "予約についてのお問い合わせです。", isUserSend: true, created: "2024-12-08T21:02:00.000+09:00" },
                { userId: 2, therapistId: 1, message: "初めて問い合わせします", isUserSend: true, created: "2024-12-08T22:00:00.000+09:00", isRead: true },
            ]
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