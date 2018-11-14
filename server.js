const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');

const resolvers = require('./graphql/resolvers');
const schema = fs.readFileSync(__dirname + '/graphql/schema.graphql', 'utf8');
const typeDefs = gql(schema);
const context = require('./graphql/context');

const UserAPI = require('./datasources/user');
const LaunchAPI = require('./datasources/launch');
const store = require('./db');

const server = new ApolloServer({ 
    resolvers, 
    typeDefs,
    context,
    dataSources: () => ({
        userAPI: new UserAPI({ store }),
        launchAPI: new LaunchAPI()
    })
 });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});