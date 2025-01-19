import {
  LOWER_CASE_LETTERS,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  NUMBERS,
  SYMBOLS,
  UPPER_CASE_LETTERS,
} from "./constants";

export * from "./constants";

type Props = {
  includeUpperCase: boolean;
  includeLowerCase: boolean;
  includeSymbols: boolean;
  length: number;
};

export const generateRandomPassword = ({
  includeUpperCase,
  includeLowerCase,
  includeSymbols,
  length: lengthProp,
}: Props) => {
  const possibleCharacters = [
    ...NUMBERS,
    ...(includeUpperCase ? UPPER_CASE_LETTERS : ""),
    ...(includeLowerCase ? LOWER_CASE_LETTERS : ""),
    ...(includeSymbols ? SYMBOLS : ""),
  ].join("");

  /**
   * Not sure if this is a requirement but nowhere in the assignment
   * is it mentioned that the password should be random.
   *
   * So if a user says "☑ (Do) include uppercase letters" then logically (🤓)
   * the password should have at least one uppercase letter
   * rather than being 100% random in it's generation.
   *
   * Since more variation leads to a stronger password
   * I'm going forwards with this assumption.
   *
   * PS. If this is not the case the automatic tests need to be modified.
   * */
  const replacementValues = [
    ...(includeUpperCase ? getRandomCharInString(UPPER_CASE_LETTERS) : ""),
    ...(includeLowerCase ? getRandomCharInString(LOWER_CASE_LETTERS) : ""),
    ...(includeSymbols ? getRandomCharInString(SYMBOLS) : ""),
  ].join("");

  const length = Math.max(
    Math.max(MIN_PASSWORD_LENGTH, Math.min(MAX_PASSWORD_LENGTH, lengthProp)),
    replacementValues.length
  );

  // Place the replacement values at the start of the password
  let password = replacementValues;

  // Fill up the rest of the array with random characters
  for (let i = 0; i < length - replacementValues.length; ++i) {
    password += getRandomCharInString(possibleCharacters);
  }

  // Move the replacement values to random positions in the password
  for (let i = 0; i < replacementValues.length; ++i) {
    password = swapRandomCharInString(password, i, replacementValues[i]);
  }

  return password;
};

const swapRandomCharInString = (
  str: string,
  index: number,
  replacement: string
): string => {
  const randomIndex = Math.floor(Math.random() * str.length);
  const temp = str[randomIndex];
  const result = str.split("");

  result.splice(randomIndex, 1, replacement);
  result.splice(index, 1, temp);
  return result.join("");
};

const getRandomCharInString = (arr: string) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
