const { ApolloClient, InMemoryCache, gql } = require('@apollo/client/core')
const { objectType } = require('nexus')

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('bookmarks', {
      type: 'Bookmark',
      resolve: (_, __, context) => {
        if (!context.user) {
          throw new Error('You must be authenticated to view bookmarks')
        }

        return context.prisma.bookmark.findMany({
          where: {
            userId: context.user.id,
          },
        })
      },
    })

    t.nullable.field('me', {
      type: 'User',
      resolve: (parent, args, context) => {
        // If the user is not authenticated, return null
        if (!context.user) {
          return null
        }

        // If the user is authenticated, return the user
        return context.prisma.user.findUnique({
          where: { id: context.user.id },
        })
      },
    })

    t.list.field('characters', {
      type: 'Character',
      resolve: async (_, __, context) => {
        // Try to find characters in the database
        let characters = await context.prisma.character.findMany()

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
            origin: character.origin.name,
            dimension: character.location.dimension || 'unknown',
            image: character.image,
          }))

          for (const character of newCharacters) {
            await context.prisma.character.upsert({
              where: { id: parseInt(character.id) },
              update: character,
              create: character,
            })
          }

          characters = await context.prisma.character.findMany()
        }

        return characters
      },
    })
  },
})

module.exports = {
  Query,
}
