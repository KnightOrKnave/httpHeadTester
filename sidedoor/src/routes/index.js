var express = require("express");
var router = express.Router();
var Redis = require("ioredis");

const databaseHost = process.env.DB_HOST || "localhost";
const databasePort = process.env.DB_PORT || 6379;

/* GET home page. */
router.get("/", function(req, res, next) {
  let kvarray = [];
  (async () => {
    try {
      const redis = new Redis(databasePort, databaseHost);
      keys = await redis.keys("*");
      let skeys=await keys.sort();
      for (var x of skeys) {
        let tm=x.split('-');
        let time=`${tm[0]}-${tm[1]}-${tm[2]}T${tm[3]}:${tm[4]}:${tm[5]}`;
        let t = await redis.get(x);
        kvarray.push({ time: time, header: t });
      }
      redis.disconnect();
      res.render("index", { title: "Express", arr: kvarray });
    } catch (err) {
      console.log(err);
      redis.disconnect();
    } finally {
    }
  })();
});

module.exports = router;
