const { createProxyMiddleware } = require('http-proxy-middleware');



module.exports = function(app) {
  app.use('/api/login', 
  createProxyMiddleware({ 
    target: 'http://localhost:3001', 
    changeOrigin: true }));



  app.use('/api/sign_up', 
  createProxyMiddleware({ 
  target: 'http://localhost:3001', 
  changeOrigin: true }));



  app.use(
    createProxyMiddleware("/api/v1/posts",{
      target: "http://localhost:3001",
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/api/authByToken",{
      target: "http://localhost:3001",
      changeOrigin: true
    })
  );
}

