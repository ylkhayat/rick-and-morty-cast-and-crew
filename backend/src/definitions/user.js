const { objectType } = require('nexus')

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('username')
    t.list.field('bookmarks', {
      type: 'Bookmark',
      resolve: (parent, _, context) => {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .bookmarks()
      },
    })
  },
})

module.exports = {
  User,
}
