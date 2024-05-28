const { PrismaClient } = require('@prisma/client');
const cron = require('node-cron');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const createContext = async ({ req }) => {
  const authorization = req.headers.authorization || '';

  if (authorization.startsWith('Bearer ')) {
    const token = authorization.slice(7);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });
      return { user, prisma };
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  return { user: null, prisma };
};

async function deleteOldBookmarks() {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  await prisma.bookmark.deleteMany({
    where: {
      createdAt: {
        lt: oneDayAgo,
      },
    },
  });

  await prisma.$disconnect();
}

cron.schedule('*/5 * * * *', deleteOldBookmarks);

module.exports = {
  createContext,
};
