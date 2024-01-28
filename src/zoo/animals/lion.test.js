const { Lion } = require('./lion');

describe('Lion', () => {
  it('should create a lion with its sound', () => {
    const lion = new Lion();
    expect(lion.sound).toBe('roar');
  });

  it('should roar', () => {
    const lion = new Lion();

    const actualMessage = "I'm a lion";
    const expectedMessage = "I'm roar a roar lion roar";

    expect(lion.speak(actualMessage)).toBe(expectedMessage);
  })

  it('should override default sound', () => {
    const lion = new Lion('meow');

    const actualMessage = "I'm just a big cat.";
    const expectedMessage = "I'm meow just meow a meow big meow cat meow.";

    expect(lion.sound).toBe('meow');
    expect(lion.speak(actualMessage)).toBe(expectedMessage);
  });
});