const { Animal } = require('./animal');

class Tiger extends Animal {
  // sound is default to 'grrr' to be open for extension
  constructor(sound = 'grrr') {
    super(sound);
  }
}

module.exports = { Tiger }