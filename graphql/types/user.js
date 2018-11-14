module.exports = {
    trips: async (user, args, ctx) => {
        // get ids of launches by user
        const launchIds = await ctx.dataSources.userAPI.getLaunchIdsByUser();

        if (!launchIds.length) return [];

        // look up those launches by their ids
        const launches = ctx.dataSources.launchAPI.getLaunchesByIds({launchIds});
        return launches || [];
    }
}