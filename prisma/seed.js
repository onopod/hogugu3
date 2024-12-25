const { PrismaClient } = require('@prisma/client')

const bcrypt = require("bcrypt");
const { addHours, addDays } = require('date-fns');
const fs = require("fs");


const prisma = new PrismaClient();

async function main() {
    // truncate
    await prisma.schedule.deleteMany({})
    await prisma.history.deleteMany({})
    await prisma.review.deleteMany({})
    await prisma.favorite.deleteMany({})
    await prisma.message.deleteMany({})
    await prisma.reservation.deleteMany({})
    await prisma.therapistsOnMenus.deleteMany({})
    await prisma.therapist.deleteMany({})
    await prisma.menu.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.prefecture.deleteMany({})
    await prisma.region.deleteMany({})
    await prisma.status.deleteMany({})
    await prisma.messageStatus.deleteMany({})
    await prisma.gender.deleteMany({})

    // gender 
    await prisma.gender.createMany({
        data: [
            { id: 1, name: "男性" },
            { id: 2, name: "女性" },
            { id: 3, name: "その他" }
        ]
    })
    // messageStatus
    await prisma.messageStatus.createMany({
        data: [
            { id: 1, name: "ユーザーの送信" },
            { id: 2, name: "セラピストの送信" },
            { id: 3, name: "ユーザー用インフォメーション" },
            { id: 4, name: "セラピスト用インフォメーション" }
        ]
    })
    // status
    await prisma.status.createMany({
        data: [
            { id: 1, name: "リクエスト中" },
            { id: 2, name: "予約確定" },
            { id: 3, name: "支払完了" },
            { id: 4, name: "施術完了" },
            { id: 9, name: "キャンセル" }
        ]
    });

    // region
    await prisma.region.createMany({
        data: [
            { id: 1, name: '北海道地方', kana: 'ホッカイドウ' },
            { id: 2, name: '東北地方', kana: 'トウホクチホウ' },
            { id: 3, name: '関東地方', kana: 'カントウチホウ' },
            { id: 4, name: '中部地方', kana: 'チュウブチホウ' },
            { id: 5, name: '近畿地方', kana: 'キンキチホウ' },
            { id: 6, name: '中国地方', kana: 'チュウゴクチホウ' },
            { id: 7, name: '四国地方', kana: 'シコクチホウ' },
            { id: 8, name: '九州地方', kana: 'キュウシュウチホウ' }
        ]
    })
    await prisma.prefecture.createMany({
        data: [
            { id: 1, regionId: 1, name: '北海道', kana: 'ホッカイドウ' },
            { id: 2, regionId: 2, name: '青森県', kana: 'アオモリケン' },
            { id: 3, regionId: 2, name: '岩手県', kana: 'イワテケン' },
            { id: 4, regionId: 2, name: '宮城県', kana: 'ミヤギケン' },
            { id: 5, regionId: 2, name: '秋田県', kana: 'アキタケン' },
            { id: 6, regionId: 2, name: '山形県', kana: 'ヤマガタケン' },
            { id: 7, regionId: 2, name: '福島県', kana: 'フクシマケン' },
            { id: 8, regionId: 3, name: '茨城県', kana: 'イバラキケン' },
            { id: 9, regionId: 3, name: '栃木県', kana: 'トチギケン' },
            { id: 10, regionId: 3, name: '群馬県', kana: 'グンマケン' },
            { id: 11, regionId: 3, name: '埼玉県', kana: 'サイタマケン' },
            { id: 12, regionId: 3, name: '千葉県', kana: 'チバケン' },
            { id: 13, regionId: 3, name: '東京都', kana: 'トウキョウト' },
            { id: 14, regionId: 3, name: '神奈川県', kana: 'カナガワケン' },
            { id: 15, regionId: 4, name: '新潟県', kana: 'ニイガタケン' },
            { id: 16, regionId: 4, name: '富山県', kana: 'トヤマケン' },
            { id: 17, regionId: 4, name: '石川県', kana: 'イシカワケン' },
            { id: 18, regionId: 4, name: '福井県', kana: 'フクイケン' },
            { id: 19, regionId: 4, name: '山梨県', kana: 'ヤマナシケン' },
            { id: 20, regionId: 4, name: '長野県', kana: 'ナガノケン' },
            { id: 21, regionId: 4, name: '岐阜県', kana: 'ギフケン' },
            { id: 22, regionId: 4, name: '静岡県', kana: 'シズオカケン' },
            { id: 23, regionId: 4, name: '愛知県', kana: 'アイチケン' },
            { id: 24, regionId: 5, name: '三重県', kana: 'ミエケン' },
            { id: 25, regionId: 5, name: '滋賀県', kana: 'シガケン' },
            { id: 26, regionId: 5, name: '京都府', kana: 'キョウトフ' },
            { id: 27, regionId: 5, name: '大阪府', kana: 'オオサカフ' },
            { id: 28, regionId: 5, name: '兵庫県', kana: 'ヒョウゴケン' },
            { id: 29, regionId: 5, name: '奈良県', kana: 'ナラケン' },
            { id: 30, regionId: 5, name: '和歌山県', kana: 'ワカヤマケン' },
            { id: 31, regionId: 6, name: '鳥取県', kana: 'トットリケン' },
            { id: 32, regionId: 6, name: '島根県', kana: 'シマネケン' },
            { id: 33, regionId: 6, name: '岡山県', kana: 'オカヤマケン' },
            { id: 34, regionId: 6, name: '広島県', kana: 'ヒロシマケン' },
            { id: 35, regionId: 6, name: '山口県', kana: 'ヤマグチケン' },
            { id: 36, regionId: 7, name: '徳島県', kana: 'トクシマケン' },
            { id: 37, regionId: 7, name: '香川県', kana: 'カガワケン' },
            { id: 38, regionId: 7, name: '愛媛県', kana: 'エヒメケン' },
            { id: 39, regionId: 7, name: '高知県', kana: 'コウチケン' },
            { id: 40, regionId: 8, name: '福岡県', kana: 'フクオカケン' },
            { id: 41, regionId: 8, name: '佐賀県', kana: 'サガケン' },
            { id: 42, regionId: 8, name: '長崎県', kana: 'ナガサキケン' },
            { id: 43, regionId: 8, name: '熊本県', kana: 'クマモトケン' },
            { id: 44, regionId: 8, name: '大分県', kana: 'オオイタケン' },
            { id: 45, regionId: 8, name: '宮崎県', kana: 'ミヤザキケン' },
            { id: 46, regionId: 8, name: '鹿児島県', kana: 'カゴシマケン' },
            { id: 47, regionId: 8, name: '沖縄県', kana: 'オキナワケン' }
        ]
    })
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

    await bcrypt.hash("password", 10, async (_, hashedPassword) => {


        const therapists = await prisma.therapist.createManyAndReturn({
            data: [
                {
                    name: 'sato hikaru', comment: 'よろしくお願いします。',
                    imageFileName: "1.jpg", prefectureId: 27, city: "大阪市中央区", workYear: 3,
                    genderId: 2, password: hashedPassword, mail: "onopod@gmail.com", tel: "07012345678"
                },
                { name: 'みく', comment: 'がんばります', password: hashedPassword, imageFileName: "2.jpg", prefectureId: 27, mail: "onopod2@gmail.com", tel: "07012345678" },
                { name: '水野', comment: 'がんばります', password: hashedPassword, imageFileName: '3.jpg', prefectureId: 26, mail: "onopod3@gmail.com", tel: "07012345678" },
                { name: '二競', comment: 'がんばります', password: hashedPassword, imageFileName: '4.jpg', mail: "onopod4@gmail.com", tel: "07012345678" },
                { name: '中川', comment: 'がんばります', password: hashedPassword, imageFileName: '5.jpg', mail: "onopod5@gmail.com", tel: "07012345678" },
                { name: '二梁', comment: 'がんばります', password: hashedPassword, imageFileName: '6.jpg', mail: "onopod6@gmail.com", tel: "07012345678" },
                { name: '村松', comment: 'がんばります', password: hashedPassword, imageFileName: '7.jpg', mail: "onopod7@gmail.com", tel: "07012345678" },
                { name: '野田', comment: 'がんばります', password: hashedPassword, imageFileName: '8.jpg', mail: "onopod8@gmail.com", tel: "07012345678" },
                { name: '西田', comment: 'がんばります', password: hashedPassword, imageFileName: '9.jpg', mail: "onopod9@gmail.com", tel: "07012345678" },
                { name: '二針', comment: 'がんばります', password: hashedPassword, imageFileName: '10.jpg', mail: "onopod10@gmail.com", tel: "07012345678" },
                { name: '河村', comment: 'がんばります', password: hashedPassword, imageFileName: '11.jpg', mail: "onopod11@gmail.com", tel: "07012345678" },
                { name: '亨夏', comment: 'がんばります', password: hashedPassword, imageFileName: '12.jpg', mail: "onopod12@gmail.com", tel: "07012345678" },
                { name: '倉増', comment: 'がんばります', password: hashedPassword, imageFileName: '13.jpg', mail: "onopod13@gmail.com", tel: "07012345678" },
                { name: '奥村', comment: 'がんばります', password: hashedPassword, imageFileName: '14.jpg', mail: "onopod14@gmail.com", tel: "07012345678" },
                { name: '大沢', comment: 'がんばります', password: hashedPassword, imageFileName: '15.jpg', mail: "onopod15@gmail.com", tel: "07012345678" },
                { name: '中西', comment: 'がんばります', password: hashedPassword, imageFileName: '16.jpg', mail: "onopod18@gmail.com", tel: "07012345678" },
                { name: '早川', comment: 'がんばります', password: hashedPassword, imageFileName: '17.jpg', mail: "onopod16@gmail.com", tel: "07012345678" },
                { name: '大西', comment: 'がんばります', password: hashedPassword, imageFileName: '18.jpg', mail: "onopod17@gmail.com", tel: "07012345678" },
                { name: '小酒', comment: 'がんばります', password: hashedPassword, imageFileName: '19.jpg', mail: "onopod19@gmail.com", tel: "07012345678" },
                { name: '田中', comment: 'がんばります', password: hashedPassword, imageFileName: '20.jpg', mail: "onopod20@gmail.com", tel: "07012345678" },
                { name: '安部', comment: 'がんばります', password: hashedPassword, imageFileName: '21.jpg', mail: "onopod21@gmail.com", tel: "07012345678" },
                { name: '道渕', comment: 'がんばります', password: hashedPassword, imageFileName: '22.jpg', mail: "onopod22@gmail.com", tel: "07012345678" },
                { name: '小倉', comment: 'がんばります', password: hashedPassword, imageFileName: '23.jpg', mail: "onopod23@gmail.com", tel: "07012345678" },
                { name: '押樋', comment: 'がんばります', password: hashedPassword, imageFileName: '24.jpg', mail: "onopod24@gmail.com", tel: "07012345678" },
                { name: '岡村', comment: 'がんばります', password: hashedPassword, imageFileName: '25.jpg', mail: "onopod25@gmail.com", tel: "07012345678" },
                { name: '苔田', comment: 'がんばります', password: hashedPassword, imageFileName: '26.jpg', mail: "onopod26@gmail.com", tel: "07012345678" },
                { name: '下関', comment: 'がんばります', password: hashedPassword, imageFileName: '27.jpg', mail: "onopod27@gmail.com", tel: "07012345678" }
            ]
        })
        fs.rm("./public/therapistImg", { recursive: true, force: true }, () => {
            therapists.filter(therapist => therapist.imageFileName?.length > 0).forEach((therapist, idx) => {
                const filePath = `./public/female/${idx + 1}.jpg`;
                const distDir = `./public/therapistImg/${therapist.id}`
                fs.mkdir(distDir, { recursive: true }, () => {
                    fs.copyFile(filePath, `${distDir}/${therapist.imageFileName}`, () => { })
                })
            })

        })

        // therapistsOnMenus
        const firstTherapistId = therapists[0].id;
        const secondTherapistId = therapists[1].id;
        const therapistsOnMenus = await prisma.therapistsOnMenus.createManyAndReturn({
            data: [
                { therapistId: firstTherapistId, menuId: 1, treatmentTime: 60, price: 6000 },
                { therapistId: firstTherapistId, menuId: 1, treatmentTime: 90, price: 9000 },
                { therapistId: firstTherapistId, menuId: 1, treatmentTime: 120, price: 12000 },
                { therapistId: firstTherapistId, menuId: 1, treatmentTime: 150, price: 15000 },
                { therapistId: firstTherapistId, menuId: 1, treatmentTime: 180, price: 18000 },
                { therapistId: firstTherapistId, menuId: 2, treatmentTime: 60, price: 6000 },
                { therapistId: firstTherapistId, menuId: 2, treatmentTime: 90, price: 9000 },
                { therapistId: firstTherapistId, menuId: 2, treatmentTime: 120, price: 12000 },
                { therapistId: firstTherapistId, menuId: 2, treatmentTime: 150, price: 15000 },
                { therapistId: firstTherapistId, menuId: 2, treatmentTime: 180, price: 18000 },
                { therapistId: firstTherapistId, menuId: 3, treatmentTime: 60, price: 6000 },
                { therapistId: firstTherapistId, menuId: 3, treatmentTime: 90, price: 9000 },
                { therapistId: firstTherapistId, menuId: 3, treatmentTime: 120, price: 12000 },
                { therapistId: firstTherapistId, menuId: 3, treatmentTime: 150, price: 15000 },
                { therapistId: firstTherapistId, menuId: 3, treatmentTime: 180, price: 18000 },
                { therapistId: firstTherapistId, menuId: 4, treatmentTime: 60, price: 6000 },
                { therapistId: firstTherapistId, menuId: 4, treatmentTime: 90, price: 9000 },
                { therapistId: firstTherapistId, menuId: 4, treatmentTime: 120, price: 12000 },
                { therapistId: firstTherapistId, menuId: 4, treatmentTime: 150, price: 15000 },
                { therapistId: firstTherapistId, menuId: 4, treatmentTime: 180, price: 18000 },
                { therapistId: firstTherapistId, menuId: 5, treatmentTime: 60, price: 6000 },
                { therapistId: firstTherapistId, menuId: 5, treatmentTime: 90, price: 9000 },
                { therapistId: firstTherapistId, menuId: 5, treatmentTime: 120, price: 12000 },
                { therapistId: firstTherapistId, menuId: 5, treatmentTime: 150, price: 15000 },
                { therapistId: firstTherapistId, menuId: 5, treatmentTime: 180, price: 18000 },
                { therapistId: secondTherapistId, menuId: 1, treatmentTime: 90, price: 7200 },
            ]
        })

        const firstTherapistsOnMenusId = therapistsOnMenus[0].id;
        const secondTherapistsOnMenusId = therapistsOnMenus[1].id;

        // schedule
        await prisma.schedule.createMany({
            data: [
                { therapistId: firstTherapistId, startDt: new Date(), endDt: addHours(new Date(), 8) },
                { therapistId: firstTherapistId, startDt: addDays(new Date(), 1), endDt: addHours(addDays(new Date(), 1), 8) },
                { therapistId: firstTherapistId, startDt: addDays(new Date(), 2), endDt: addHours(addDays(new Date(), 2), 8) }
            ]
        })

        // user
        await bcrypt.hash("password", 10, async (_, hashedPassword) => {
            const users = await prisma.user.createManyAndReturn({
                data: [
                    {
                        name: 'ono ryo', mail: 'onopod@gmail.com', tel: "07012345678",
                        password: hashedPassword, imageFileName: "1.jpg",
                        prefectureId: 27, zipcode: "5420062", city: "大阪市中央区", address: "上本町西",
                        genderId: 1
                    },
                    { name: 'ono hanako', mail: 'onopod2@gmail.com', password: hashedPassword, imageFileName: "2.jpg", prefectureId: 27 },
                    { name: '小野 太郎', mail: 'onopod3@gmail.com', password: hashedPassword, imageFileName: "3.jpg", prefectureId: 26 }
                ]
            })

            fs.rm("./public/userImg", { recursive: true, force: true }, () => {
                users.filter(user => user.imageFileName?.length > 0).forEach((user, idx) => {
                    const filePath = `./public/male/${idx + 1}.jpg`;
                    const distDir = `./public/userImg/${user.id}`
                    fs.mkdir(distDir, { recursive: true }, () => {
                        fs.copyFile(filePath, `${distDir}/${user.imageFileName}`, () => { })
                    })
                })
            })


            const firstUserId = users[0].id;
            const secondUserId = users[1].id;

            // reservation
            const reservations = await prisma.reservation.createManyAndReturn({
                data: [
                    { userId: firstUserId, therapistId: firstTherapistId, therapistMenuId: firstTherapistsOnMenusId, statusId: 3, startDt: "2024-12-08T21:00:00.000+09:00", replyDt: "2024-12-06T21:10:00.000+09:00", created: "2024-12-06T21:00:00.000+09:00" },
                    { userId: firstUserId, therapistId: firstTherapistId, therapistMenuId: firstTherapistsOnMenusId, statusId: 2, startDt: "2024-12-09T22:30:00.000+09:00", replyDt: "2024-12-08T22:50:00.000+09:00", created: "2024-12-08T22:20:00.000+09:00" },
                    { userId: firstUserId, therapistId: firstTherapistId, therapistMenuId: secondTherapistsOnMenusId, startDt: "2024-12-10T22:30:00.000+09:00" },
                    { userId: firstUserId, therapistId: firstTherapistId, therapistMenuId: secondTherapistsOnMenusId, statusId: 4, startDt: "2024-12-08T22:30:00.000+09:00" },
                    { userId: secondUserId, therapistId: firstTherapistId, therapistMenuId: secondTherapistsOnMenusId, startDt: "2024-12-02T21:00:00.000+09:00" }
                ]
            })
            const firstReservationId = reservations[0].id;
            const secondReservationId = reservations[1].id;

            // message 
            await prisma.message.createMany({
                data: [
                    { userId: firstUserId, therapistId: firstTherapistId, message: "こんにちは", messageStatusId: 1, created: "2024-12-08T21:00:00.000+09:00" },
                    { userId: firstUserId, therapistId: firstTherapistId, message: "どうかされましたか？", messageStatusId: 2, created: "2024-12-08T21:01:00.000+09:00" },
                    { userId: firstUserId, therapistId: firstTherapistId, message: "予約についてのお問い合わせです。", messageStatusId: 1, created: "2024-12-08T21:02:00.000+09:00" },
                    { userId: secondUserId, therapistId: firstTherapistId, message: "初めて問い合わせします", messageStatusId: 1, created: "2024-12-08T22:00:00.000+09:00", isRead: true },
                ]
            })

            // favorite
            await prisma.favorite.createMany({
                data: [
                    { userId: firstUserId, therapistId: firstTherapistId },
                    { userId: firstUserId, therapistId: secondTherapistId },
                    { userId: secondUserId, therapistId: secondTherapistId }
                ]
            })

            // review
            await prisma.review.createMany({
                data: [
                    { reservationId: firstReservationId, comment: "とても良かったです" },
                    { reservationId: secondReservationId, rate: 4, comment: "まあまあでした" }
                ]
            })

            // history
            await prisma.history.createMany({
                data: [
                    { userId: firstUserId, therapistId: firstTherapistId },
                    { userId: firstUserId, therapistId: secondTherapistId },
                    { userId: secondUserId, therapistId: secondTherapistId }
                ]
            })
        })
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })