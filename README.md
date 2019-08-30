# graphql-jwt-template
Sample structure/template on using GraphQL and JSON Web Token

### Core: Local Database in JSON format Using [lowdb package]

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


GraphQL and Sequelize Template: [Check previous template of GraphQL](https://github.com/romarcablao/graphql-sequelize-template "GraphQL and Sequelize")
