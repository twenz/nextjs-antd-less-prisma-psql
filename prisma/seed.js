const { PrismaClient } = require('@prisma/client')
const { isEmpty } = require('lodash')
const _ = require('lodash')

const prisma = new PrismaClient()

const userData = [
    {
        name: 'Alice',
        email: 'alice@prisma.io'
    },
    {
        name: 'mm',
        email: 'mm@mm.mm'
    },
]


async function main() {
    console.log(`Start seeding ...`)
    const _emails = userData.map(e => e.email)
    const _users = await prisma.user.findMany({
        where: {
            email: { in: _emails}
        }
    })
    const diff = _.differenceBy(userData, _users, 'email')
    console.log('file: seed.js ~ line 28 ~ diff', diff)
    if (isEmpty(diff)) return console.log(`Seeding finished. No create new user`)
    diff.forEach( async e => {
        const user = await prisma.user.create({
            data: e,
        })
        console.log(`Created user with id: ${user.id}`)
    })
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })