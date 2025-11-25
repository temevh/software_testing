import eq from "../src/eq";

describe("equals (eq)", () => {
  test("returns true for identical primitive values", () => {
    expect(eq("a", "a")).toBe(true);
    expect(eq(5, 5)).toBe(true);
    expect(eq(true, true)).toBe(true);
  });

  test("returns true when comparing the same object reference", () => {
    const obj = { a: 1 };
    expect(eq(obj, obj)).toBe(true);
  });

  test("returns false for different objects with same content", () => {
    expect(eq({ a: 1 }, { a: 1 })).toBe(false);
  });

  test("null and undefined are considered equal", () => {
    expect(eq(null, undefined)).toBe(true);
  });

  test("undefined equals undefined", () => {
    expect(eq(undefined, undefined)).toBe(true);
  });

  test("uses loose equality for boolean coercion", () => {
    expect(eq(true, 1)).toBe(true);
    expect(eq(false, 0)).toBe(true);
  });

  test("returns false for symbols unless same reference", () => {
    const s1 = Symbol("x");
    const s2 = Symbol("x");

    expect(eq(s1, s1)).toBe(true);
    expect(eq(s1, s2)).toBe(false);
  });
});
