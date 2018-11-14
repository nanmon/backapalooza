module.exports = async (_root, args, ctx) => {
    const { launchId } = args;
    const result = ctx.dataSources.userAPI.cancelTrip({ launchId });

    if (!result)
      return {
        success: false,
        message: 'failed to cancel trip',
      };

    const launch = await ctx.dataSources.launchAPI.getLaunchById({ launchId });
    return {
      success: true,
      message: 'trip cancelled',
      launches: [launch],
    };
  }