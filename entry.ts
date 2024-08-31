function importAll(ctx: __WebpackModuleApi.RequireContext) {
  ctx.keys().forEach(ctx);
}

const context = require.context("./packages", true, /index.module\.[j,t]sx?$/);

importAll(context);
