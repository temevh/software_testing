import add from "../functions/src/add";

describe("add", () => {
  test("Add two positive integers", () => {
    const A = 1;
    const B = 2;
    expect(add(A, B)).toBe(3);
  });

  test("Add two positive floating point numbers", () => {
    const A = 0.5;
    const B = 1.2;
    expect(add(A, B)).toBeCloseTo(1.7);
  });

  test("Add a positive integer and a positive floating point number", () => {
    const A = 1;
    const B = 0.5;
    expect(add(A, B)).toBeCloseTo(1.5);
  });

  test("Add two negative integers", () => {
    const A = -1;
    const B = -2;
    expect(add(A, B)).toBe(-3);
  });

  test("Add a negative integer and a negative floating point number", () => {
    const A = -1;
    const B = -0.5;
    expect(add(A, B)).toBeCloseTo(-1.5);
  });

  test("Add two negative floating point numbers", () => {
    const A = -0.5;
    const B = -1.5;
    expect(add(A, B)).toBeCloseTo(-2);
  });

  test("Call the function with 3 or more numbers", () => {
    const A = 1;
    const B = 2;
    const C = 3;
    expect(add(A, B, C)).toBe(3);
  });

  test("Call the function with only 1 parameter", () => {
    const A = 1;
    expect(add(A)).toBe(1);
  });

  test("Return A when B is 0", () => {
    const A = 1;
    const B = 0;
    expect(add(A, B)).toBe(1);
  });

  test("Return error when using non-number as the input", () => {
    const A = "1";
    const B = "2";
    expect(add(A, B)).toBe("12");
  });
});
