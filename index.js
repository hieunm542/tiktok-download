var http = require("http");
var Axios = require("axios");
var cheerio = require("cheerio");
var qs = require("qs");
var express = require("express");
var app = express();

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log(
    "Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s",
    host,
    port
  );
});
app.get("/", function (req, res) {
  let url = "https://www.tiktok.com/@minhank0201/video/7129095061777796378";
  //res.write("Hello World!");
  Axios.get("https://ttdownloader.com/")
    .then((data) => {
      const $ = cheerio.load(data.data);
      const cookie = data.headers["set-cookie"].join("");
      const dataPost = {
        url: url,
        format: "",
        token: $("#token").attr("value")
      };
      // return console.log(cookie);
      Axios({
        method: "POST",
        url: "https://ttdownloader.com/query/",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          origin: "https://ttdownloader.com",
          referer: "https://ttdownloader.com/",
          cookie: cookie
        },
        data: qs.stringify(dataPost)
      })
        .then(({ data }) => {
          console.log(qs.stringify(dataPost));
          const $ = cheerio.load(data);
          const result = {
            nowm: $(
              "#results-list > div:nth-child(2) > div.download > a"
            )?.attr("href"),
            wm: $("#results-list > div:nth-child(3) > div.download > a")?.attr(
              "href"
            ),
            audio: $(
              "#results-list > div:nth-child(4) > div.download > a"
            ).attr("href")
          };
          res.json(result);
          res.end();
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
});
//the server object listens on port 8080
