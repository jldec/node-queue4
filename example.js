
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
