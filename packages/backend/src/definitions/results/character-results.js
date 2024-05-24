const { objectType } = require('nexus');

const CharacterResults = objectType({
  name: 'CharacterResults',
  definition(t) {
    t.nonNull.list.nonNull.field('results', { type: 'Character' });
    t.nonNull.int('total');
  },
});

module.exports = {
  CharacterResults,
};
