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

    t.list.field('bookmarks', {
      type: 'Bookmark',
      resolve: (parent, _, context) => {
        return context.prisma.character
          .findUnique({
            where: { id: parent.id },
          })
          .bookmarks()
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
