class Animal {
  constructor(sound) {
    if (!sound) throw new Error('sound is required');
    this.sound = sound;
  }

  speak(message) {
    if (!message) return '';

    // \b is for word boundary
    // [\w']+ is for word character following by an apostrophe (to handle words like "don't"). (if you want to be more specific, use [a-zA-Z0-9_] instead)
    return message.replace(/\b[\w']+/g, `$& ${this.sound}`);
  }
}

module.exports = {
  Animal
}