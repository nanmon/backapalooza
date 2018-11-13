module.exports = () => {
    const config = require('../knexfile')['development'];
    const knex = require('knex')(config);

    return knex;
}