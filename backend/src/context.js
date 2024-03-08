const { PrismaClient } = require('@prisma/client')
const cron = require('node-cron')

const prisma = new PrismaClient()

const createContext = async () => ({
  prisma: prisma,
})

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
