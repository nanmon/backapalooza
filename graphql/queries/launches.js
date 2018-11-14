const { paginateResults } = require('../utils');

module.exports = async (_obj, args, ctx) => {
    const results = await ctx.dataSources.launchAPI.getAllLaunches();

    results.reverse();

    const launches = paginateResults({ ...args, results });

    const lastLaunchInPage = launches[launches.length - 1];
    const lastLaunchOfAll = results[results.length - 1];
    const cursor = launches.length > 0 ? lastLaunchInPage.cursor : null;
    const hasMore = launches.length > 0 && lastLaunchInPage.cursor != lastLaunchOfAll.cursor;

    return { items: launches, cursor, hasMore };
}