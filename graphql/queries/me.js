module.exports = (_obj, _args, ctx) => {
    return ctx.dataSources.userAPI.findOrCreateUser();
}