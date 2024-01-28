const { Animal } = require('./animal');

describe('Animal', () => {
  it('should create an animal with its sound', () => {
    const animal = new Animal('generic');
    expect(animal.sound).toBe('generic');
  });

  it('should throw an error if no sound is provided', () => {
    expect(() => new Animal()).toThrow('sound is required');
  });

  it('should speak', () => {
    const animal = new Animal('generic');

    const actualMessage = "I'm an animal";
    const expectedMessage = "I'm generic an generic animal generic";

    expect(animal.speak(actualMessage)).toBe(expectedMessage);
  })

  it('should handle interrogation and exclamation signs', () => {
    const animal = new Animal('ANM'); // just using ANM to make it easier to 
    
    const actualMessage = "Do you know I can handle interrogation or exclamation signs!?";
    const expectedMessage = "Do ANM you ANM know ANM I ANM can ANM handle ANM interrogation ANM or ANM exclamation ANM signs ANM!?"

    expect(animal.speak(actualMessage)).toBe(expectedMessage);
  })

  it('should handle numbers', () => {
    const animal = new Animal('ANM');

    const actualMessage = "Do you know I can handle numbers 123!?";
    const expectedMessage = "Do ANM you ANM know ANM I ANM can ANM handle ANM numbers ANM 123 ANM!?"

    expect(animal.speak(actualMessage)).toBe(expectedMessage);
  })

  // just demonstrate that commas, dot, interrogation and exclamation signs are moved after the sound thanks to the \b word boundary
  it('should handle complex Messages', () => {
    const animal = new Animal('ANM');

    const actualMessage = "Still don't trust me? Sure? Ok, I respect commas, dots and even apostrophes.";
    const expectedMessage = "Still ANM don't ANM trust ANM me ANM? Sure ANM? Ok ANM, I ANM respect ANM commas ANM, dots ANM and ANM even ANM apostrophes ANM."

    expect(animal.speak(actualMessage)).toBe(expectedMessage);
  })

  it('should handle null or undefined', () => {
    const animal = new Animal('ANM');
    expect(animal.speak(null)).toBe("");
    expect(animal.speak(undefined)).toBe("");
  })

  it('should handle empty string', () => {
    const animal = new Animal('ANM');
    expect(animal.speak("")).toBe("");
  });
});