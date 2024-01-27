import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://klic.immoflux.ro",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
