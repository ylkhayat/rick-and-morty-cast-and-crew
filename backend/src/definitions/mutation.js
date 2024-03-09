const { objectType, nonNull, arg, intArg } = require('nexus')

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
        })

        const sessionId = args.data.username

        return {
          user: user,
          sessionId: sessionId,
        }
      },
    })

    t.nonNull.field('unbookmarkCharacter', {
      type: 'Bookmark',
      args: {
        characterId: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        if (!context.user) {
          throw new Error('You must be authenticated to unbookmark a character')
        }
        if (!args.characterId) {
          throw new Error(
            'You provide a valid character id to unbookmark a character',
          )
        }

        // Delete the bookmark
        return context.prisma.bookmark.delete({
          where: {
            userId_characterId: {
              userId: context.user.id,
              characterId: args.characterId,
            },
          },
        })
      },
    })

    t.nonNull.field('bookmarkCharacter', {
      type: 'Bookmark',
      args: {
        characterId: nonNull(intArg()),
      },
      resolve: async (_, args, context) => {
        if (!context.user) {
          throw new Error('You must be authenticated to bookmark a character')
        }
        const character = await context.prisma.character.findUnique({
          where: { id: args.characterId },
        })
        if (!character) {
          throw new Error(
            `Character with id ${args.characterId} does not exist`,
          )
        }
        return context.prisma.bookmark.create({
          data: {
            User: {
              connect: { id: context.user.id },
            },
            Character: {
              connect: { id: args.characterId },
            },
          },
        })
      },
    })
  },
})

module.exports = {
  Mutation,
}
