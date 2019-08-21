var http = require("http");
var Redis = require("ioredis");
const uuid = require("uuid/v4");
const moment = require("moment");
const databaseHost = process.env.DB_HOST || "localhost";
const databasePort = process.env.DB_PORT || 6379;
const httpServerPort = process.env.HTTP_PORT || 3000;

const redis = new Redis(databasePort, databaseHost);

var server = http.createServer();
server.on("request", function(request, response) {
  (async () => {
    let res="NONE"
    try {
      const key = moment(Date.now()).format("YYYY-MM-DD-hh-mm-ss-") + uuid();
      const value = JSON.stringify(request.headers);
      res = await redis.ping();
      await redis.set(key, value);
    } catch (err) {
      console.log(err);
      console.log("dbhost:"+databaseHost+" dbport:"+databasePort);
    } finally {
      response.end(uuid()+"-"+res);
    }
  })();
});
server.on("close", function() {
  redis.disconnect();
});

server.listen(httpServerPort);
