XVideos
=======

Access [xvideos](http://www.xvideos.com/) (WARNING: NSFW) programmatically with
Node.JS.

Overview
--------

This module scrapes the HTML of xvideos.com and gives you information you can
use in your node programs!

Super Quickstart
----------------

```javascript
var xv = require("xvideos");

xv.details("http://www.xvideos.com/video3823160/stranded_busty_sweetie_decides_to_have_sex_with_a_stranger_in_public_for_money", function(err, details) {
  console.log(err, details);
});
```

Installation
------------

Available via [npm](http://npmjs.org/):

> $ npm install xvideos

Or via git:

> $ git clone git://github.com/deoxxa/xvideos.git node_modules/xvideos

Usage
-----

The `xvideos` package exports a single documented function right now, `details`.

XVideos API
-----------

**details**

Gets details about a specific video.

```javascript
xv.details(uri, cb);
```

```javascript
// get details about a video
xv.details("http://www.xvideos.com/video3823160/stranded_busty_sweetie_decides_to_have_sex_with_a_stranger_in_public_for_money", function(err, details) {
  console.log(err, details);
});
```

Arguments

* _uri_ - a full url to an xvideos video page
* _cb_ - a callback to be called in the normal node way with an error (or null)
  and the video details

**search**

Performs a search and returns the results. `parameters` is an object that is
used to construct the query string for the search URL. Available parameters are:
`k` (the actual search string), `sort` (relevance, uploaddate, rating), `datef`
("date filter"), (all, today, week, month), `durf` ("duration filter"),
(allduration, 1-3min, 3-10min, 10min_more), and `p`, which is the page number.

```javascript
xv.search(parameters, cb);
```

```javascript
// get details about a video
xv.search({k: "porn"}, function(err, results) {
  console.log(err, results);
});
```

Arguments

* _parameters_ - an object containing parameters for the query string (see above
  for details about its properties)
* _cb_ - a callback to be called in the normal node way with an error (or null)
  and the search results

Example
-------

Also see [example.js](https://github.com/deoxxa/xvideos/blob/master/example.js).

```javascript
#!/usr/bin/env node

var xv = require("xvideos");

// get details about a video
xv.details("http://www.xvideos.com/video3823160/stranded_busty_sweetie_decides_to_have_sex_with_a_stranger_in_public_for_money", function(err, details) {
  console.log(err, details);
});
```

Output (example):

```
null { title: 'Stranded busty sweetie decides to have sex with a stranger in public for money',
  duration: '5 min',
  tags:
   [ 'amateur',
     'bigtits',
     'brunette',
     'busty',
     'european',
     'flashing',
     'hardcore',
     'money',
     'outdoor',
     'POV',
     'public' ],
  flv: 'http://porn.im.cbce7ca3.3823160.x.xvideos.com/videos/flv/f/e/6/xvideos.com_fe6e41a62c4162b6b9ff750620acf599.flv?e=1366800046&ri=1024&rs=85&h=2cf1096659393b4c153b7cdfe93a8889' }
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* ADN ([@deoxxa](https://alpha.app.net/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
