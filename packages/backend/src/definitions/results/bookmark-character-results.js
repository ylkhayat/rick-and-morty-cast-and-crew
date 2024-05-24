const { objectType } = require('nexus');

const BookmarkCharacterResult = objectType({
  name: 'BookmarkCharacterResult',
  definition(t) {
    t.nonNull.field('bookmarkedCharacter', { type: 'Bookmark' });
    t.nonNull.int('total');
  },
});

module.exports = {
  BookmarkCharacterResult,
};
