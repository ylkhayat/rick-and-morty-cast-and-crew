const { objectType } = require('nexus')
const { parse, compareAsc } = require('date-fns')

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
    t.boolean('isBookmarked', {
      resolve: async (parent, _, context) => {
        const bookmark = await context.prisma.bookmark.findFirst({
          where: { characterId: parent.id, userId: context.user.id },
        })
        return Boolean(bookmark)
      },
    })

    t.list.field('episodes', {
      type: 'Episode',
      resolve: async (parent, _, context) => {
        const episodes = await context.prisma.character
          .findUnique({
            where: { id: parent.id },
          })
          .episodes()

        return episodes.sort((a, b) => {
          const dateA = parse(a.airDate, 'MMMM d, yyyy', new Date())
          const dateB = parse(b.airDate, 'MMMM d, yyyy', new Date())
          return compareAsc(dateB, dateA)
        })
      },
    })
  },
})

module.exports = {
  Character,
}
