const config = require('../knexfile')['development'];
const knex = require('knex')(config);

module.exports = knex;