var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
  var genre;

  function groupBooks(line){
    if (line.length === 0) return;

    var item = JSON.parse(line);
    if (item.type === 'genre') {
      if (genre) {
        this.queue(JSON.stringify(genre) + '\n');
      }
      genre = {name: item.name, books:[]};
    } else {
      genre.books.push(item.name);
    }
  }

  function completeBooks() {
    this.queue(JSON.stringify(genre) + '\n');
    this.queue(null);
  }

  return combine(
    // read newline-separated json,
    // group books into genres,
    // then gzip the output
    split(),
    through(groupBooks, completeBooks),
    zlib.createGzip()
  )
}
