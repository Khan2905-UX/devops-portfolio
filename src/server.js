const http = require("http");
const config = require("./config");
const app = require("./app");

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`${config.appName} listening on port ${config.port} in ${config.env} mode`);
});
