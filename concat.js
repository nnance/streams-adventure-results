var concat = require('concat-stream');

var reverseString = function(buf) {
  console.log(buf.toString().split('').reverse().join(''));
}

process.stdin.pipe(concat(reverseString));
