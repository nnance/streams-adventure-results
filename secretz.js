var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar');
var through = require('through');

var stream = crypto.createDecipher(process.argv[2], process.argv[3]);
var gunzip = zlib.createGunzip();
var parser = tar.Parse();

parser.on('entry',function(e){
  if (e.type === 'File') {
    var md5 = crypto.createHash('md5', { encoding: 'hex' });
    
    e.pipe(md5).pipe(through(null, function(){
      this.queue(' ' + e.path + '\n');
    })).pipe(process.stdout);
  }
});

process.stdin.pipe(stream).pipe(gunzip).pipe(parser);
