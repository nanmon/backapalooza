const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');

const resolvers = require('./graphql/resolvers');
const schema = fs.readFileSync(__dirname + '/graphql/schema.graphql', 'utf8');
const typeDefs = gql(schema);

const server = new ApolloServer({ 
    resolvers, 
    typeDefs
 });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});