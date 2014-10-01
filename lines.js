var through = require('through');
var split = require('split');

var count = 1;

var tr = through(function (buf) {
  var line = buf.toString();
  if (count % 2 == 0) {
    line = line.toUpperCase() + '\n';
  } else {
    line = line.toLowerCase() + '\n';
  }
  this.queue(line);
  count++;
});

process.stdin
  .pipe(split())
  .pipe(tr)
  .pipe(process.stdout)
;
