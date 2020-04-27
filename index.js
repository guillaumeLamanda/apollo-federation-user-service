const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
  }

  type Query {
    me: User!
  }
`;

const user = {
  id: 1,
  name: "Hubert de La Bath"
};

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    me: (root, args, context) => user
  },
  User: {
    __resolveReference(user, otherstuffs) {
      console.log(user, otherstuffs);
      return 1;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
