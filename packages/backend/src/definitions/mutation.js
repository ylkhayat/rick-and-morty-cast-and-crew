const { objectType, nonNull, arg, intArg } = require('nexus');

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.nonNull.field('loginOrSignup', {
      type: 'LoginResponse',
      args: {
        data: nonNull(
          arg({
            type: 'UserInput',
          }),
        ),
      },
      resolve: async (_, args, context) => {
        const user = await context.prisma.user.upsert({
          where: { username: args.data.username },
          update: {},
          create: { username: args.data.username },
        });

        const sessionId = args.data.username;

        return {
          user: user,
          sessionId: sessionId,
        };
      },
    });

    t.nonNull.field('unbookmarkCharacter', {
      type: 'UnbookmarkCharacterResult',
      args: {
        characterId: nonNull(intArg()),
      },
      resolve: async (_, args, context) => {
        if (!context.user) {
          throw new Error(
            'You must be authenticated to unbookmark a character',
          );
        }
        if (!args.characterId) {
          throw new Error(
            'You provide a valid character id to unbookmark a character',
          );
        }
        const unbookmarkedCharacter = await context.prisma.bookmark.delete({
          where: {
            userId_characterId: {
              userId: context.user.id,
              characterId: args.characterId,
            },
          },
        });
        const total = await context.prisma.bookmark.count({
          where: {
            userId: context.user.id,
          },
        });
        return {
          unbookmarkedCharacter,
          total,
        };
      },
    });

    t.nonNull.field('bookmarkCharacter', {
      type: 'BookmarkCharacterResult',
      args: {
        characterId: nonNull(intArg()),
      },
      resolve: async (_, args, context) => {
        if (!context.user) {
          throw new Error('You must be authenticated to bookmark a character');
        }
        if (!args.characterId) {
          throw new Error(
            'You provide a valid character id to bookmark a character',
          );
        }
        const bookmarkedCharacter = await context.prisma.bookmark.create({
          data: {
            User: {
              connect: { id: context.user.id },
            },
            Character: {
              connect: { id: args.characterId },
            },
          },
        });
        const total = await context.prisma.bookmark.count({
          where: {
            userId: context.user.id,
          },
        });
        return {
          bookmarkedCharacter,
          total,
        };
      },
    });
  },
});

module.exports = {
  Mutation,
};
