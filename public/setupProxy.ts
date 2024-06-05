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

  // Adaugarea unui proxy pentru feed-ul agenților activi
  app.use(
    "/api/sites/v1/agents",
    createProxyMiddleware({
      target: "https://klic.immoflux.ro", 
      changeOrigin: true,
      pathRewrite: { "^/api/sites/v1/agents": "" },
    })
  );
};
