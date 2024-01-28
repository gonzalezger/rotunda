const { Tiger } = require('./tiger');

describe('Tiger', () => {
  it('should create a tiger with its sound', () => {
    const tiger = new Tiger();
    expect(tiger.sound).toBe('grrr');
  });

  it('should grrr', () => {
    const tiger = new Tiger();

    const actualMessage = "Lions suck";
    const expectedMessage = "Lions grrr suck grrr";

    expect(tiger.speak(actualMessage)).toBe(expectedMessage);
  })
})