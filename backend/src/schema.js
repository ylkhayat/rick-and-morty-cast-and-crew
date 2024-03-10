const {
  makeSchema,
  objectType,
  inputObjectType,
  asNexusMethod,
} = require('nexus')
const { DateTimeResolver } = require('graphql-scalars')
const { User } = require('./definitions/user')
const { Bookmark } = require('./definitions/bookmark')
const { Character } = require('./definitions/character')
const { Mutation } = require('./definitions/mutation')
const { Query } = require('./definitions/query')
const { Episode } = require('./definitions/episode')

const DateTime = asNexusMethod(DateTimeResolver, 'date')

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

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Character,
    User,
    LoginResponse,
    UserInput,
    Bookmark,
    Episode,
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
