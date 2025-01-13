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

  const length = Math.max(
    MIN_PASSWORD_LENGTH,
    Math.min(MAX_PASSWORD_LENGTH, lengthProp)
  );

  let password = "";

  for (let i = 0; i < length; ++i) {
    password += getRandomCharInString(possibleCharacters);
  }

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
  const replaceOneWith = (replacementValues: string) => {
    password = getWithRandomlyReplacedChar(
      password,
      getRandomCharInString(replacementValues)
    );
  };
  if (includeUpperCase) replaceOneWith(UPPER_CASE_LETTERS);
  if (includeLowerCase) replaceOneWith(LOWER_CASE_LETTERS);
  if (includeSymbols) replaceOneWith(SYMBOLS);

  return password;
};

const getWithRandomlyReplacedChar = (
  input: string,
  validReplacementValues: string
) => {
  const randomIndex = Math.floor(Math.random() * input.length);
  const randomReplacementValue = getRandomCharInString(validReplacementValues);
  const inputAsArr = [...input];
  inputAsArr.splice(randomIndex, 1, randomReplacementValue);
  const result = inputAsArr.join("");
  return result;
};

const getRandomCharInString = (arr: string) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
