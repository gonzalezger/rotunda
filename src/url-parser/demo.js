const { parse } = require('./url-parser');

function runUrlParserDemo() {
  console.log('Parsing /:version/api/:collection/:id - /6/api/listings/3?sort=desc&limit=10\n', JSON.stringify(parse('/:version/api/:collection/:id', '/6/api/listings/3?sort=desc&limit=10'), null, 2));
}

module.exports = {
  runUrlParserDemo
};
