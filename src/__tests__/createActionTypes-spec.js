import createActionTypes from "../createActionTypes";

describe("createActionTypes", () => {
  test("creates a map with namespeced values", () => {
    const namespace = "module";
    const actionList = ["FOO", "BAR", "BAZ"];

    const result = createActionTypes(namespace, actionList);

    expect(result).toEqual({
      FOO: "~module/FOO",
      BAR: "~module/BAR",
      BAZ: "~module/BAZ"
    });
  });
});
