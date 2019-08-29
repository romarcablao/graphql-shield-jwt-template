const DB = require('../../database/database.class');
let userDB = new DB;

module.exports = {
    Query: {
        Users: () => {
            return userDB.getUsers();
        },
        User: (_, { email }) => {
            return userDB.getUserbyEmail(email);
        },
        Login: (_, { input }) => {
            return userDB.userLogin(input);
        }
    },
    Mutation: {
        CreateUser: (_, { input }) => {
            if (!userDB.emailExist(input.email)) {
                userDB.saveNewUser(input);
                return "Account was successfully created!"
            } else {
                throw new Error("Email already exists!");
            }
        }
    }
}