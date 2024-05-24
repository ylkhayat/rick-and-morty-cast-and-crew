const { objectType } = require('nexus');

const UnbookmarkCharacterResult = objectType({
  name: 'UnbookmarkCharacterResult',
  definition(t) {
    t.nonNull.field('unbookmarkedCharacter', { type: 'Bookmark' });
    t.nonNull.int('total');
  },
});

module.exports = {
  UnbookmarkCharacterResult,
};
