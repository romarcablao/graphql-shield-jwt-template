const { shield, and, or, not } = require("graphql-shield");
const rules = require('./rules');

const permissions = shield(
    {
        Query: {
            Users: and(rules.isAuthenticated, rules.isAdmin),
            User: or(rules.isAdmin, and(rules.isAuthenticated, rules.canViewUserProfile))
        },
        Mutation: {
            CreateUser: not(rules.isAdmin) //Use not when no data stored on database s you can add one
        }
    }
);

module.exports = permissions;