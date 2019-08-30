const {
  shield, and, or, not,
} = require('graphql-shield');
const rules = require('./rules');

const permissions = shield(
  {
    Query: {
      Users: and(rules.isAuthenticated, rules.isAdmin),
      User: or(rules.isAdmin, and(rules.isAuthenticated, rules.canViewUserProfile)),
    },
    Mutation: {
      // Use [not] when no data stored on database so you can add one
      CreateUser: not(rules.isAdmin),
    },
  },
  {
    fallbackError: new Error('Unauthorized Access!'),
  },
);

module.exports = permissions;
