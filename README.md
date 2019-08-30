# graphql-shield-jwt-template
Sample structure/template on using GraphQL and JSON Web Token

## Instructions
1. Clone the repository and install node packages/modules
    ```bash
    git clone https://github.com/romarcablao/graphql-shield-jwt-template.git
    cd graphql-shield-jwt-template
    npm install
    ```

2. Run npm start to start the GraphQL server
    ```bash
    npm start
    ```
3. Open [localhhost:4000](http://localhost:4000) on browser and play around with the provided Schema and Docs.
   Here's a sample GraphQL Mutation for creating your first user:
   
    ```graphql
    mutation{
     CreateUser(input: {
      name: "Juan Dela Cruz", 
      password: "p@$$w0rd" , 
      email: "juandelacruz@sample.com", 
      role: admin
     })
    }
    ```
4. With this template you can add more queries, mutations and even subscriptions. You can play around and add more type definitions and resolvers. 

## Core: Local Database in JSON format Using [Lowdb](https://www.npmjs.com/package/lowdb)
This template uses Lowdb a small JSON database for Node, Electron and the browser. If you want to use MySQL, PostgreSQL, etc. you may check [GraphQL and Sequelize Template](https://github.com/romarcablao/graphql-sequelize-template "GraphQL and Sequelize").

```js
const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const jwt = require('jsonwebtoken');

class LocalDatabase {
    constructor() {
        this.adapter = new FileSync('./database/db.json');
        this.db = low(this.adapter);
        this.db.defaults({ users: [], count: 0 })
            .write();
    }
    
...
```
### Sample usage of JSON Web Token
```js
 async userLogin(credentials) {
    this.user = this.getUserbyEmail(credentials.email);
    if (this.user != undefined) {
        this.validPassword = await bcrypt.compare(credentials.password, this.user.password).then(function (res) {
            return res;
        });

        if (this.validPassword) {
            let token = await jwt.sign({ id: this.user.id, email: this.user.email }, 'secret', {
                algorithm: 'HS256',
                expiresIn: 60 * 5
            })
            return { token: token };
        }
    }

    throw new Error('Unauthorized Login!');
}
```
### Sample usage of GraphQl Shield
```js
// Setting Rules
const isAuthenticated = rule()(async (parent, args, ctx) => ctx.isValid);

const isAdmin = rule()(async (parent, args, ctx) => ctx.payload.role === 'admin' && ctx.isValid);

const isUser = rule()(async (parent, args, ctx) => ctx.payload.role === 'user' && ctx.isValid);

const canViewUserProfile = rule()(async (parent, args, ctx) => {
  if (args.email === ctx.payload.email) {
    return true;
  }
  return false;
});

// Setting Permissions
const permissions = shield(
  {
    Query: {
      Users: and(rules.isAuthenticated, rules.isAdmin),
      User: or(rules.isAdmin, and(rules.isAuthenticated, rules.canViewUserProfile)),
    },
    Mutation: {
      CreateUser: not(rules.isAdmin),
    },
  },
  {
    fallbackError: new Error('Unauthorized Access!'),
  },
);
```

---
:cloud: [Romar Cablao](https://www.linkedin.com/in/romarcablao) | <romarcablao@gmail.com>

