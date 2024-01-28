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
});