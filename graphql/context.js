const isEmail = require('isemail');
const store = require('../db');

module.exports = async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = new Buffer(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    let [ user ] = await store.select().from('users').where({ email });
    if (!user) {
        user = await store.insert({ email }).into('users');
    }

    return { user };
};