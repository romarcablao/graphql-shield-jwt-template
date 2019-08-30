module.exports = `
    enum UserRoles {
        user
        admin
    }

    type UserData {
        id: ID!
        name: String!
        email: String!
        password: String
        role: String!
    }

    type LoginResponse {
        token: String
    }

    input UserCredentials {
        email: String!
        password: String!
    }

    input UserDataInput {
        name: String!
        email: String!
        password: String!
        role: UserRoles!
    }

    type Query {
        Users: [UserData]!
        User(email: String!): UserData
        Login(input: UserCredentials): LoginResponse!
    }
    
    type Mutation {
        CreateUser(input: UserDataInput): String!
    }
`