const { objectType } = require('nexus');
const { parse, compareAsc } = require('date-fns');

const Character = objectType({
  name: 'Character',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('image');
    t.nonNull.string('name');
    t.nonNull.string('species');
    t.nonNull.string('gender');
    t.nonNull.string('status');
    t.nonNull.string('origin');
    t.nonNull.string('dimension');
    t.nonNull.boolean('isBookmarked', {
      resolve: async (parent, _, context) => {
        const bookmark = await context.prisma.bookmark.findFirst({
          where: { characterId: parent.id, userId: context.user.id },
        });
        return Boolean(bookmark);
      },
    });

    t.nonNull.list.nonNull.field('episodes', {
      type: 'Episode',
      resolve: async (parent, _, context) => {
        const episodes = await context.prisma.character
          .findUnique({
            where: { id: parent.id },
          })
          .episodes();

        return episodes.sort((a, b) => {
          const dateA = parse(a.airDate, 'MMMM d, yyyy', new Date());
          const dateB = parse(b.airDate, 'MMMM d, yyyy', new Date());
          return compareAsc(dateB, dateA);
        });
      },
    });
  },
});

module.exports = {
  Character,
};
