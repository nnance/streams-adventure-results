var trumpet = require('trumpet');
var through = require('through');
var tr = trumpet();

var stream = tr.select('.loud').createStream();

var transform = through(function(buf){
  this.queue(buf.toString().toUpperCase());
});

stream.pipe(transform).pipe(stream);

process.stdin.pipe(tr).pipe(process.stdout);
