module.exports = async (_root, args, ctx) => {
    const { email } = args;
    const user = await ctx.dataSources.userAPI.findOrCreateUser({ email });
    if (user) return new Buffer(email).toString('base64');
}