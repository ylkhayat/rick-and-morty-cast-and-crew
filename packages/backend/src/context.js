const { PrismaClient } = require('@prisma/client')
const cron = require('node-cron')

const prisma = new PrismaClient()

const createContext = async ({ req }) => {
  let username = req.headers.authorization || ''

  if (username.startsWith('Bearer ')) {
    username = username.slice(7)
  }
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })

  return { user, prisma }
}

async function deleteOldBookmarks() {
  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)

  await prisma.bookmark.deleteMany({
    where: {
      createdAt: {
        lt: oneDayAgo,
      },
    },
  })

  await prisma.$disconnect()
}

cron.schedule('*/5 * * * *', deleteOldBookmarks)

module.exports = {
  createContext,
}
