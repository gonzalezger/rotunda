const { Animal } = require('./animal');

class Lion extends Animal {
  // sound is default to 'roar' to be open for extension
  constructor(sound = 'roar') {
    super(sound);
  }
}

module.exports = {
  Lion
}