const { objectType } = require('nexus')

const BookmarkResults = objectType({
  name: 'BookmarkResults',
  definition(t) {
    t.nonNull.list.nonNull.field('results', { type: 'Bookmark' })
    t.nonNull.int('total')
  },
})

module.exports = {
  BookmarkResults,
}
