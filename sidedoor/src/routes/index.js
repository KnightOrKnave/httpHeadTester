var express = require('express');
var router = express.Router();
var Redis = require("ioredis");

const databaseHost = process.env.DB_HOST || "localhost";
const databasePort = process.env.DB_PORT || 6379;

/* GET home page. */
router.get('/', function(req, res, next) {
  let kvarray = [];
  (async () => {
    try {
      const redis = new Redis(databasePort, databaseHost);
      keys = await redis.keys("*");
      for (var x of keys.sort) {
        var t = await redis.get(x);
        kvarray.push({time:x,header:t})
      }
      redis.disconnect();
    } catch (err) {
      console.log(err);
      redis.disconnect();
    } finally {
      res.render('index', { title: 'Express' ,arr: kvarray});
    }
  })();
});

module.exports = router;
