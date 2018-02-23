import createReducer, { NonStandardAction } from "../createReducer";
import nullAction from "../nullAction";

describe("createReducer", () => {
  const mockHandler = jest.fn();
  const reducer = createReducer(
    { candy: 10 },
    {
      ["ACTION_MATCH"]: mockHandler
    }
  );
  const initialState = reducer(undefined, nullAction);

  test("the reducer returns unchanged state with no match", () => {
    const state = initialState;
    const action = { type: "NON_MATCHING" };
    const newState = reducer(state, action);

    expect(newState).toEqual(state);
  });

  test("the reducer calls the matched hander with state", () => {
    const state = initialState;
    const action = { type: "ACTION_MATCH" };

    reducer(state, action);

    expect(mockHandler).toHaveBeenCalledWith(state, action);
  });

  test("the reducer checks for flux standard actions", () => {
    const state = initialState;
    const invalidAction = {};

    expect(() => reducer(state, invalidAction)).toThrowError(NonStandardAction);
  });

  describe("whitelisting non-flux standard actions", () => {
    const reducerWithWhitelist = createReducer(
      {},
      {},
      {
        allowNonStandardActionIf: action => action.type === "WHITELISTED"
      }
    );
    const state = reducerWithWhitelist(undefined, nullAction);

    test("does not complain about whitelisted actions", () => {
      const whitelistedAction = { type: "WHITELISTED", notPayload: {} };

      expect(() =>
        reducerWithWhitelist(state, whitelistedAction)
      ).not.toThrowError(NonStandardAction);
    });

    test("continues to complain about non-whitelisted actions", () => {
      const invalidAction = { type: "NOT WHITELISTED", notPayload: {} };

      expect(() => reducer(state, invalidAction)).toThrowError(
        NonStandardAction
      );
    });
  });
});
