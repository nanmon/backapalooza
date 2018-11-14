module.exports = {
    isBooked: async (launch, _args, ctx) => {
        return ctx.dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id })
    }
};