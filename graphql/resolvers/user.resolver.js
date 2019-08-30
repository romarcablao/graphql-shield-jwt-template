const DB = require('../../database/database.class');

const userDB = new DB();

module.exports = {
  Query: {
    Users: () => userDB.getUsers(),
    User: (_, { email }) => userDB.getUserbyEmail(email),
    Login: (_, { input }) => userDB.userLogin(input),
  },
  Mutation: {
    CreateUser: (_, { input }) => {
      if (!userDB.emailExist(input.email)) {
        userDB.saveNewUser(input);
        return 'Account was successfully created!';
      }
      return new Error('Email already exists!');
    },
  },
};
