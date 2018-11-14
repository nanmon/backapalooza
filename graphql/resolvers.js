module.exports = {
    Query: {
        launches: require('./queries/launches'),
        launch: require('./queries/launch'),
        me: require('./queries/me')
    },
    Mutation: {
        login: require('./mutations/login'),
        bookTrips: require('./mutations/bookTrips'),
        cancelTrip: require('./mutations/cancelTrip')
    },
    User: require('./types/user'),
    Launch: require('./types/launch'),
    Mission: require('./types/mission')
};