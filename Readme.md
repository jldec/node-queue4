
# queue
[![CI](https://github.com/jldec/node-queue4/workflows/CI/badge.svg)](https://github.com/jldec/node-queue4/actions)

Task (function) queue with concurrency / timeout control.

## This is a fork of [tj/node-queue3](https://github.com/tj/node-queue3)
I was doing maintenance on some libraries and ran into vulnerabilities reported by npm because of old versions of dependencies in [queue3](https://github.com/tj/node-queue3).

This fork:
- bumps versions of debug and superagent
- migrates the tests to tape for simplicity and ease of debugging
- updates the example to work with the new superagent api
- removes the Makefile - to run tests do `npm test`

There have been no changes to the module code in index.js.

- The version number in pacakage.json was bumped to 1.0.4 since the original [queue3 on npm](https://www.npmjs.com/package/queue3) reports 1.0.3.
- July 13, 2019: bumped to 1.0.5 with updated deps and example, and CI
- Feb 16, 2020: bumped to 1.0.6 with updated deps and CI on github
- Apr 25, 2020: bumped to 1.0.7 with updated deps

## Installation

    $ npm install queue4

## Example

```js

var request = require('superagent');
var Queue = require('./');
var q = new Queue({ concurrency: 3, timeout: 1000 });

var urls = [
  'https://google.com',
  'https://yahoo.com',
  'https://ign.com',
  'https://msn.com',
  'https://hotmail.com',
  'https://cloudup.com',
  'https://learnboost.com'
];

var id = setInterval(function(){
  urls.forEach(function(url){
    q.push(function(fn){
      console.log('%s', url);
      request.get(url, function(err, res){
        console.log('%s -> %s %s',
          url,
          (res && res.status) || 'no response',
          (err && err.message) || 'OK');
        fn();
      });
    });
  });
}, 5000);

var tid = setInterval(function(){
  console.log('%s queued', q.length);
}, 1000);

setTimeout(function(){
  console.log('shutting down');
  clearInterval(id);
  clearInterval(tid);
}, 15000);
```

## License

  MIT
