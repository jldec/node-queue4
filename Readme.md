
# queue

Task (function) queue with concurrency / timeout control.

## This is a fork of https://github.com/tj/node-queue3
I was doing maintenance on some libraries and ran into vulnerabilities reported by npm because of old versions of dependencies in [queue3](https://github.com/tj/node-queue3). Thr original repo is not accepting PRs, so i've published this fork as queue4 on npm.

This fork:
- bumps versions of debug and superagent
- migrates the tests to tape for simplicity and ease of debugging
- updates the example to work with the new superagent api
- removes the Makefile - to run tests do `npm test`

There have been no changes to the module code in index.js.

The version number in pacakage.json was bumped to 1.0.4 since the original [queue3 on npm](https://www.npmjs.com/package/queue3) reports 1.0.3.

## Installation

    $ npm install queue4

## Example

```js

var request = require('superagent');
var Queue = require('queue4');
var q = new Queue({ concurrency: 3, timeout: 3000 });

var urls = [
  'http://google.com',
  'http://yahoo.com',
  'http://ign.com',
  'http://msn.com',
  'http://hotmail.com',
  'http://cloudup.com',
  'http://learnboost.com'
];

urls.forEach(function(url){
  q.push(function(fn){
    console.log('%s', url);
    request.get(url).then(function(res){
      console.log('%s -> %s', url, res.status);
      fn();
    });
  });
});
```

## License

  MIT
