import { UserAPI } from "./datasources/users";

const resolvers = {
  Query: {
    // Our resolvers can access the fields in contextValue
    // from their third argument
    currentUser: (_, __, contextValue) => {
      return contextValue.dataSources.userApi.findUser(contextValue.token);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({
    token: getToken(req.headers.authentication),
    dataSources: {
      userApi: new UserAPI(),
    },
  }),
});
