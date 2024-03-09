const { objectType } = require('nexus')

const Character = objectType({
  name: 'Character',
  definition(t) {
    t.nonNull.int('id')
    t.string('image')
    t.string('name')
    t.string('species')
    t.string('gender')
    t.string('status')
    t.string('origin')
    t.string('dimension')

    t.list.field('bookmarks', {
      type: 'Bookmark',
      resolve: (parent, _, context) => {
        return context.prisma.bookmark.findMany({
          where: { characterId: parent.id },
        })
      },
    })
  },
})

module.exports = {
  Character,
}
