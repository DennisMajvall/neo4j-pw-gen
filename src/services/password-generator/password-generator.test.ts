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
  // When using includes the minimum length is the number of includes
  // Even if the constant MIN_PASSWORD_LENGTH is lower
  // Alternatively one could write a compile-time test to assert this instead (min 3 if 3 includes are possible)
  const props = {
    includeUpperCase: true,
    includeLowerCase: true,
    includeSymbols: true,
  };

  const numPropsWithTrue = Object.entries(props).reduce<number>(
    (acc, [_key, val]) => (val ? acc + 1 : acc),
    0
  );

  for (let i = 0; i < 100; i++) {
    const password = generateRandomPassword({
      length: i,
      ...props,
    });

    const minLength = Math.max(
      Math.max(numPropsWithTrue, MIN_PASSWORD_LENGTH),
      i
    );

    const allowedLength = Math.min(MAX_PASSWORD_LENGTH, minLength);
    expect(password.length).toBe(allowedLength);
  }
});
