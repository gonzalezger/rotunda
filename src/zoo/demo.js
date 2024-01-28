const { Lion } = require('./animals/lion');
const { Tiger } = require('./animals/tiger');

function runZooDemo() {
  const lion = new Lion();
  const tiger = new Tiger();

  console.log('Lion: ', lion.speak("I'm a lion"));
  console.log('Tiger: ', tiger.speak("Lions suck"));
}

module.exports = {
  runZooDemo
}