const {
  intArg,
  makeSchema,
  nonNull,
  objectType,
  inputObjectType,
  arg,
  asNexusMethod,
} = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client/core')

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
})

const DateTime = asNexusMethod(DateTimeResolver, 'date')
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

const Bookmark = objectType({
  name: 'Bookmark',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.nonNull.field('updatedAt', { type: 'DateTime' })
    t.field('user', {
      type: 'User',
      resolve: (parent, _, context) => {
        return context.prisma.bookmark
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .user()
      },
    })
    t.field('character', {
      type: 'Character',
      resolve: (parent, _, context) => {
        return context.prisma.bookmark
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .character()
      },
    })
  },
})

const Origin = objectType({
  name: 'Origin',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
  },
})

const Location = objectType({
  name: 'Location',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.string('type')
    t.string('dimension')
  },
})

const Character = objectType({
  name: 'Character',
  definition(t) {
    t.nonNull.int('id')
    t.string('image')
    t.string('name')
    t.string('species')
    t.string('gender')
    t.string('status')

    t.field('location', {
      type: 'Location',
      resolve: (parent, _, context) => {
        return context.prisma.location.findUnique({
          where: { id: parent.locationId },
        })
      },
    })

    t.list.field('bookmarks', {
      type: 'Bookmark',
      resolve: (parent, _, context) => {
        return context.prisma.bookmark.findMany({
          where: { characterId: parent.id },
        })
      },
    })
    t.field('origin', {
      type: 'Origin',
      resolve: (parent, _, context) => {
        return context.prisma.origin.findUnique({
          where: { id: parent.originId },
        })
      },
    })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('bookmarks', {
      type: 'Bookmark',
      resolve: (_, __, context) => {
        return context.prisma.bookmark.findMany()
      },
    })

    t.list.field('characters', {
      type: 'Character',
      resolve: async (_, __, context) => {
        // Try to find characters in the database
        let characters = await context.prisma.character.findMany({
          include: {
            origin: true,
            location: true,
          },
        })

        // If less characters than per page are found, fetch from the API
        if (characters.length < 20) {
          const { data } = await client.query({
            query: gql`
              query {
                characters(page: 1) {
                  results {
                    id
                    name
                    status
                    species
                    gender
                    origin {
                      name
                    }
                    location {
                      dimension
                    }
                    image
                  }
                }
              }
            `,
          })

          // Map the results to match the Character model in the database
          const newCharacters = data.characters.results.map((character) => ({
            id: parseInt(character.id),
            name: character.name,
            status: character.status,
            species: character.species,
            gender: character.gender,
            origin: {
              create: {
                name: character.origin.name,
              },
            },
            location: {
              create: {
                dimension: character.location.dimension || 'unknown',
              },
            },
            image: character.image,
          }))

          for (const character of newCharacters) {
            await context.prisma.character.upsert({
              where: { id: parseInt(character.id) },
              update: character,
              create: character,
            })
          }

          characters = await context.prisma.character.findMany({
            include: {
              origin: true,
              location: true,
            },
          })
        }

        return characters
      },
    })
  },
})

const UserInput = inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.int('id')
    t.string('username')
  },
})

const LoginResponse = objectType({
  name: 'LoginResponse',
  definition(t) {
    t.nonNull.field('user', { type: 'User' })
    t.nonNull.string('sessionId')
  },
})

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

    t.nonNull.field('bookmarkCharacter', {
      type: 'Bookmark',
      args: {
        characterId: nonNull(intArg()),
      },
      resolve: (_, args, context) => {
        // Check if the user is authenticated
        if (!context.user) {
          throw new Error('You must be authenticated to bookmark a character')
        }

        // Create a new bookmark
        return context.prisma.bookmark.create({
          data: {
            User: {
              connect: { id: args.user.id },
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

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Character,
    User,
    LoginResponse,
    UserInput,
    Bookmark,
    Origin,
    Location,
    DateTime,
  ],
  outputs: {
    schema: __dirname + '/../../frontend/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})

module.exports = {
  schema: schema,
}
