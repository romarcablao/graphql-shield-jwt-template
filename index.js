const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDef');
const authDefs = require('./graphql/graphql_shield');
const permissions = require('./graphql/graphql_shield/permissions');

const options = {
    port: 4000,
    endpoint: '/graphql',
    subscriptions: '/subscriptions',
    playground: '/',
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    middlewares: [permissions],
    context: req => ({
        ...req,
        token: authDefs.getToken(req),
        payload: authDefs.getUserData(req),
        isValid: authDefs.checkTokenValidity(req)
    })
});
server.start(options, ({ port }) => console.log(`Server is running on localhost:${port}`));