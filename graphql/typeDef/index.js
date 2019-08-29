const path = require('path');
const { fileLoader, mergeTypes } = require("merge-graphql-schemas");

const typesArray = fileLoader(path.join(__dirname, "./*.js"));
const typesMerged = mergeTypes(typesArray);

module.exports = typesMerged;