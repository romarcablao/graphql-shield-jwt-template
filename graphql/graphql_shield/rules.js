const { rule } = require("graphql-shield");

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
    return ctx.isValid;
});

const isAdmin = rule()(async (parent, args, ctx, info) => {
    return ctx.payload.role === 'admin' && ctx.isValid;
});

const isUser = rule()(async (parent, args, ctx, info) => {
    return ctx.payload.role === 'user' && ctx.isValid;
});

const canViewUserProfile = rule()(async (parent, args, ctx, info) => {
    if (args.email === ctx.payload.email) {
        return true;
    }
    return false;
});

module.exports = {
    isAuthenticated,
    isAdmin,
    isUser,
    canViewUserProfile,
}