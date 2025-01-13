import {
  generateRandomPassword,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from ".";

test("generatePassword can include uppercase letters", () => {
  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      includeUpperCase: true,
      includeLowerCase: true,
      includeSymbols: true,
      length: 20,
    });
    expect(/[A-Z]/.test(password)).toBe(true);
  }
});

test("generatePassword does not include uppercase letters", () => {
  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      includeUpperCase: false,
      includeLowerCase: true,
      includeSymbols: true,
      length: 20,
    });
    expect(/[A-Z]/.test(password)).toBe(false);
  }
});

test("generatePassword can include lowercase letters", () => {
  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      includeLowerCase: true,
      includeUpperCase: true,
      includeSymbols: true,
      length: 20,
    });
    expect(/[a-z]/.test(password)).toBe(true);
  }
});

test("generatePassword does not include lowercase letters", () => {
  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      includeLowerCase: false,
      includeUpperCase: true,
      includeSymbols: true,
      length: 20,
    });
    expect(/[a-z]/.test(password)).toBe(false);
  }
});

test("generatePassword can include symbols", () => {
  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      includeSymbols: true,
      includeUpperCase: true,
      includeLowerCase: true,
      length: 20,
    });
    expect(/[^A-Za-z0-9]/.test(password)).toBe(true);
  }
});

test("generatePassword does not include symbols", () => {
  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      includeSymbols: false,
      includeUpperCase: true,
      includeLowerCase: true,
      length: 20,
    });
    expect(/[^A-Za-z0-9]/.test(password)).toBe(false);
  }
});

test("generatePassword has correct length", () => {
  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      length: i,
      includeUpperCase: true,
      includeLowerCase: true,
      includeSymbols: true,
    });
    const minLength = Math.max(MIN_PASSWORD_LENGTH, i);
    const allowedLength = Math.min(MAX_PASSWORD_LENGTH, minLength);
    expect(password.length).toBe(allowedLength);
  }
});
