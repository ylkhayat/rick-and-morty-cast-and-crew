const { ApolloClient, InMemoryCache, gql } = require('@apollo/client/core')
const { objectType, intArg } = require('nexus')

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
      resolve: (_, __, context) => {
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
      args: {
        page: intArg({ default: 1 }),
      },
      resolve: async (_, { page }, context) => {
        const perPage = 20
        const minId = (page - 1) * perPage + 1
        const maxId = page * perPage
        let characters = await context.prisma.character.findMany({
          where: {
            id: {
              gte: minId,
              lte: maxId,
            },
          },
          include: {
            episodes: true,
          },
        })

        if (characters.length < 20) {
          const { data: charactersData } = await client.query({
            query: gql`
              query {
                characters(page: ${page}) {
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
                    episode {
                      id
                      name
                      air_date
                      episode
                    }
                    image
                  }
                }
              }
            `,
          })

          const newCharacters = charactersData.characters.results.map(
            (character) => ({
              id: parseInt(character.id),
              name: character.name,
              status: character.status,
              species: character.species,
              gender: character.gender,
              origin: character.origin.name,
              dimension: character.location.dimension || 'unknown',
              image: character.image,
              episode: character.episode,
            }),
          )

          for (const character of newCharacters) {
            const { episode, ...characterData } = character

            const characterRecord = await context.prisma.character.upsert({
              where: { id: parseInt(character.id) },
              update: characterData,
              create: characterData,
            })

            const lastThreeEpisodes = episode.slice(-3)

            for (const episodeData of lastThreeEpisodes) {
              const { __typename, id, air_date, ...data } = episodeData
              const recordId = parseInt(id)
              await context.prisma.episode.upsert({
                where: { id: parseInt(id) },
                update: {
                  ...data,
                  airDate: air_date,
                  characters: {
                    connect: { id: characterRecord.id },
                  },
                },
                create: {
                  ...data,
                  airDate: air_date,
                  id: recordId,
                  characters: {
                    connect: { id: characterRecord.id },
                  },
                },
              })
            }
          }
          characters = await context.prisma.character.findMany({
            where: {
              id: {
                gte: minId,
                lte: maxId,
              },
            },
            include: {
              episodes: true,
            },
          })
        }
        return characters
      },
    })
  },
})

module.exports = {
  Query,
}
