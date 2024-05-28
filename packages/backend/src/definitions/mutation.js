const { objectType, nonNull, arg, intArg } = require('nexus');
const { comparePassword, hashPassword } = require('../encryption');
const jwt = require('jsonwebtoken');

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
        const existingUser = await context.prisma.user.findUnique({
          where: { username: args.data.username.toLowerCase() },
        });

        let user;
        if (existingUser) {
          const passwordValid = await comparePassword(
            args.data.password,
            existingUser.password,
          );
          if (!passwordValid) {
            throw new Error('Invalid password');
          }
          user = existingUser;
        } else {
          const hashedPassword = await hashPassword(args.data.password);
          user = await context.prisma.user.create({
            data: {
              username: args.data.username.toLowerCase(),
              password: hashedPassword,
            },
          });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: '1h',
        });
        return {
          user: user,
          sessionId: token,
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
