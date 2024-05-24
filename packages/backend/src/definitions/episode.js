const { objectType } = require('nexus')

const Episode = objectType({
  name: 'Episode',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('airDate')
    t.nonNull.string('episode')
    t.nonNull.string('name')
  },
})

module.exports = {
  Episode,
}
