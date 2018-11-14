module.exports = (_obj, args, ctx) => {
    return ctx.dataSources.launchAPI.getLaunchById({ launchId: args.id });
}