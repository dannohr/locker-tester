const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({ target: "http://192.168.1.67:3001" })
  );
  // app.use(
  //   "/io",
  //   createProxyMiddleware({
  //     target: "http://localhost:3006",
  //     ws: true,
  //     // changeOrigin: true,
  //     // autoRewrite: true,
  //   })
  // );

  // createProxyMiddleware("/io", {
  //   target: "http://localhost:3006",
  //   ws: true,
  //   changeOrigin: true,
  //   autoRewrite: true,
  // });
  // app.use(proxy("/api", { target: "http://localhost:3001" }));
  // app.use(proxy("/io", { target: "ws://127.0.0.1:3006", ws: true }));
};
