const { PrismaClient } = require('@prisma/client')
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
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })