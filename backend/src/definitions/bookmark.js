const { objectType } = require('nexus')

const Bookmark = objectType({
  name: 'Bookmark',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('user', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.user.findUnique({
          where: { id: parent.userId || undefined },
        })
      },
    })
    t.field('character', {
      type: 'Character',
      resolve: (parent, _, context) => {
        return context.prisma.character.findUnique({
          where: { id: parent.characterId || undefined },
        })
      },
    })
  },
})

module.exports = {
  Bookmark,
}
