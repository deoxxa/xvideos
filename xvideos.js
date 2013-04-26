var cheerio = require("cheerio"),
    http = require("http"),
    qs = require("querystring"),
    url = require("url");

var XVideos = module.exports;

XVideos.resolveId = function resolveId(id, cb) {
  if (typeof id !== "number") {
    return cb(Error("wrong type for id; expected number but got " + typeof id));
  }

  var req = http.get("http://www.xvideos.com/video" + id, function(res) {
    if (res.statusCode === 404) {
      return cb(Error("video not found"));
    }

    if (res.statusCode !== 301) {
      return cb(Error("incorrect status code; expected 301 but got " + res.statusCode));
    }

    return cb(null, res.headers.location);
  });

  req.once("error", cb);
};

XVideos.details = function details(url, cb) {
  var req = http.get(url, function(res) {
    var body = Buffer(0);

    res.on("readable", function() {
      var chunk;
      while (chunk = res.read()) {
        body = Buffer.concat([body, chunk]);
      }
    });

    if (res.statusCode === 404) {
      return cb(Error("video not found"));
    }

    if (res.statusCode !== 200) {
      return cb(Error("incorrect status code; expected 200 but got " + res.statusCode));
    }

    res.on("end", function() {
      body = body.toString("utf8");

      var $ = cheerio.load(body);

      var title = $("#main > h2").text().replace(/-[^-]+$/, "").trim();

      var tags = $("#video-tags > li > a").map(function(i, e) {
        return $(e).text().trim();
      }).filter(function(e) {
        return e !== "tags";
      });

      var duration = $(".duration").text().trim().replace(/^-/, "").trim();

      var flv;
      if (matches = body.match(/flv_url=(http%3A%2F%2F.+?)&amp;/)) {
        flv = unescape(matches[1]);
      }
      if (!flv) {
        return cb(Error("couldn't find flv"));
      }

      return cb(null, {title: title, duration: duration, tags: tags, flv: flv});
    });
  });

  req.once("error", cb);
};

XVideos.constructSearchUrl = function constructSearchUrl(parameters) {
  return "http://www.xvideos.com/?" + qs.stringify(parameters);
};

XVideos.search = function search(parameters, cb) {
  var req = http.get(this.constructSearchUrl(parameters), function(res) {
    var body = Buffer(0);

    res.on("readable", function() {
      var chunk;
      while (chunk = res.read()) {
        body = Buffer.concat([body, chunk]);
      }
    });

    if (res.statusCode !== 200) {
      return cb(Error("incorrect status code; expected 200 but got " + res.statusCode));
    }

    res.on("end", function() {
      body = body.toString("utf8");

      var $ = cheerio.load(body);

      var videos = $(".thumbBlock > .thumbInside").map(function(i, e) {
        var find;

        if ($(e).find("script").length) {
          find = cheerio.load($(e).find("script").text().replace(/^thumbcastDisplayRandomThumb\('(.+?)'\);$/, "$1"));
        } else {
          find = $(e).find.bind($(e));
        }

        return {
          url: url.resolve("http://www.xvideos.com/", find("div.thumb > a").attr("href").replace("/THUMBNUM/", "/")),
          title: find("p > a").text(),
          duration: $(e).find("span.duration").text().replace(/[\(\)]/g, "").trim(),
        };
      });

      var total = parseInt($("h3.blackTitle").text().replace(/[\r\n]/g, " ").replace(/^.*- (\d+) results.*$/, "$1"), 10);

      return cb(null, {total: total, videos: videos});
    });
  });

  req.once("error", cb);
};
