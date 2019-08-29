const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDef');

const options = {
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/',
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, ({ port }) => console.log(`Server is running on localhost:${port}`))