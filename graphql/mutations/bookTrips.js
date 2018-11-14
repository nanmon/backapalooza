module.exports = async (_root, args, ctx) => {
    const { launchIds } = args;
    const results = await ctx.dataSources.userAPI.bookTrips({ launchIds });
    const launches = await ctx.dataSources.launchAPI.getLaunchesByIds({ launchIds });

    return {
      success: results && results.length === launchIds.length,
      message:
        results.length === launchIds.length
          ? 'trips booked successfully'
          : `the following launches couldn't be booked: ${launchIds.filter(
              id => !results.includes(id),
            )}`,
      launches,
    };
};