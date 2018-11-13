const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    let [ user ] = await this.store.select().from('users').where({ email });
    if (!user) {
        user = await this.store.insert({ email }).into('users');
    }
    return user;
  }

  async bookTrips({ launchIds }) {
    const userId = this.context.user.id;
    if (!userId) return;

    let results = [];

    // for each launch id, try to book the trip and add it to the results array
    // if successful
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }

    return results;
  }

  async bookTrip({ launchId }) {
    const userId = this.context.user.id;
    let [ trip ] = await this.store.select().from('trips').where({ userId, launchId });
    if (!trip) {
        trip = await this.store.insert({ userId, launchId }).into('trips');
    }
    return trip;
  }

  async cancelTrip({ launchId }) {
    const userId = this.context.user.id;
    return !!this.store.delete().from('trips').where({ userId, launchId });
  }

  async getLaunchIdsByUser() {
    const userId = this.context.user.id;
    return await this.store.select('id').from('trips').where({ userId });
  }

  async isBookedOnLaunch({ launchId }) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.select().from('trips').count('id').where({ userId, launchId });
    return found;
  }
}

module.exports = UserAPI;
