const path = require('path');
const { fileLoader } = require('merge-graphql-schemas');

const resolverArray = fileLoader(path.join(__dirname, './*.js'));

module.exports = resolverArray;
