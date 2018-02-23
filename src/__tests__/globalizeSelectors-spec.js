import { curry, prop } from "ramda";

import globalizeSelectors from "../globalizeSelectors";

describe("globalizeSelectors", () => {
  const globalState = {
    section: {
      numbers: [2, 3, 4]
    }
  };
  const localState = prop("section");
  const numbers = prop("numbers");
  const numberAt = (index, state) => state.numbers[index];
  const globalized = globalizeSelectors(localState, {
    numbers,
    numberAt,
    curriedNumberAt: curry(numberAt)
  });

  describe("with a single-argument selector", () => {
    test("allows the selector to work from the global state", () => {
      expect(globalized.numbers(globalState)).toEqual([2, 3, 4]);
    });
  });

  describe("with a multi-argument selector", () => {
    test("allows the selector to work from the global state", () => {
      expect(globalized.numberAt(1, globalState)).toBe(3);
    });
  });

  describe("with a curried selector", () => {
    test("the selector can be called normally", () => {
      expect(globalized.curriedNumberAt(2, globalState)).toBe(4);
    });

    test("the selector can be curried", () => {
      expect(globalized.curriedNumberAt(2)(globalState)).toBe(4);
    });
  });
});
