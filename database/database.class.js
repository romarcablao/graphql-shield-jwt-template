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

    getUsers() {
        return this.db.get('users').value();
    }

    getUserbyEmail(email) {
        this.user = this.db.get('users')
            .find({ email: email })
            .value();

        return this.user;
    }

    emailExist(email) {
        this.user = this.db.get('users')
            .find({ email: email })
            .value();

        if (this.user === undefined) {
            return false;
        }
        return true;
    }

    async saveNewUser(params) {

        params.password = await bcrypt.hash(params.password, 10).then(function (hash) {
            return hash;
        });

        this.db.get('users')
            .push({
                id: uniqid(),
                name: params.name,
                email: params.email,
                password: params.password,
                role: params.role
            })
            .write();

        this.db.update('count', n => n + 1)
            .write();
    }

    async userLogin(credentials) {
        this.user = this.getUserbyEmail(credentials.email);
        if (this.user != undefined) {
            this.validPassword = await bcrypt.compare(credentials.password, this.user.password).then(function (res) {
                return res;
            });

            if (this.validPassword) {
                let token = await jwt.sign({ id: this.user.id, email: this.user.email, role: this.user.role }, 'secret', {
                    algorithm: 'HS256',
                    expiresIn: 60 * 1
                })
                return { token: token };
            }
        }

        throw new Error('Unauthorized Login!');
    }
}

module.exports = LocalDatabase;