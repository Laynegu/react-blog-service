// module.exports = options => {
//   return async function adminauth(ctx, next) {
//     // console.log(ctx.session.openId);
//     if (ctx.session.openId) {
//       await next();
//     } else {
//       ctx.body = { data: '没有登录' };
//     }
//   }
// }

module.exports = options => {
  return async function adminauth(ctx, next) {
    const token = ctx.header.authorization;
    if (token.indexOf('null') === -1) {
      await next();
    } else {
      ctx.body = { data: '没有登录' };
    }
  }
}
