var http = require("http");
var Redis = require("ioredis");

const databaseHost = process.env.DB_HOST || "localhost";
const databasePort = process.env.DB_PORT || 32770;
const httpServerPort = process.env.HTTP_PORT || 3000;

var server = http.createServer();
server.on("request", function(request, response) {
  (async () => {
    let res = "non";
    try {
      const redis = new Redis(databasePort, databaseHost);
      keys = await redis.keys("*");
      kvarray = [];
      res = "<html><body><ul>";
      for (var x of keys) {
        var t = await redis.get(x);
        console.log(t);
        res += `<li>${x}:${t}</li>`;
      }
      res += "</li></body></html>";
      redis.disconnect();
    } catch (err) {
      console.log(err);
      redis.disconnect();
    } finally {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(res);
    }
  })();
});
server.on("close", function() {});

server.listen(httpServerPort);
