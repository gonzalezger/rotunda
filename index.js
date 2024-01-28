const { runUrlParserDemo } = require('./src/url-parser/demo');
const { runZooDemo } = require('./src/zoo/demo');

function runDemo() {
  console.log("Rotunda challenge demo")

  console.log('\n')

  console.log('Zoo Excercise')
  runZooDemo()

  console.log('\n')
  
  console.log('Url Parser Excercise')
  runUrlParserDemo()
}

runDemo()