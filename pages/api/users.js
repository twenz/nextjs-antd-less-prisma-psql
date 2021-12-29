import prisma from '../../lib/prisma'

const handle = async (req, res) => {
    const users = await prisma.user.findMany()
    console.log('file: users.js ~ line 5 ~ users', users)
    res.json(users)
}

export default handle