import compact from "../src/compact";

describe.skip("compact", () => {
  test("removes falsey values from a mixed array", () => {
    expect(compact([0, 1, false, 2, "", 3, null, undefined, NaN])).toEqual([
      1, 2, 3,
    ]);
  });

  test("keeps all truthy values", () => {
    expect(compact([1, "hello", [], {}, 5, true])).toEqual([
      1,
      "hello",
      [],
      {},
      5,
      true,
    ]);
  });
});
