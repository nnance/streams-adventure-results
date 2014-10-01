var duplexer = require('duplexer');
var through = require('through');

module.exports = function (counter) {
  // return a duplex stream to capture countries on the writable side
  // and pass through `counter` on the readable side
  var counts = {};
  var reader = through(function(item){
    if (!counts[item.country]) {
      counts[item.country] = 0;
    }
    counts[item.country]++;
  }, function(){
    counter.setCounts(counts);
  });

  return duplexer(reader,counter);
};
