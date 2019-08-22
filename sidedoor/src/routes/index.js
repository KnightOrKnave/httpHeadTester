var express = require('express');
var router = express.Router();
var Redis = require("ioredis");

const databaseHost = process.env.DB_HOST || "localhost";
const databasePort = process.env.DB_PORT || 32770;

/* GET home page. */
router.get('/', function(req, res, next) {
  (async () => {
    try {
      const redis = new Redis(databasePort, databaseHost);
      keys = await redis.keys("*");
      kvarray = [];
      for (var x of keys) {
        var t = await redis.get(x);
      }
      redis.disconnect();
    } catch (err) {
      console.log(err);
      redis.disconnect();
    } finally {
      res.render('index', { title: 'Express' });
    }
  })();
});

module.exports = router;
