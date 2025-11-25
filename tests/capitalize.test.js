import capitalize from "../functions/src/capitalize";

describe("capitalize", () => {
  test("Input a lowercase string", () => {
    const S = "string";
    expect(capitalize(S)).toBe("String");
  });

  test("Input an uppercase string", () => {
    const S = "STRING";
    expect(capitalize(S)).toBe("String");
  });

  test("Input a mixed-case string", () => {
    const S = "sTrInG";
    expect(capitalize(S)).toBe("String");
  });

  test("Input an empty string", () => {
    const S = "";
    expect(capitalize(S)).toBe("");
  });

  test("Input a non-string", () => {
    const S = 1;
    expect(capitalize(S)).toBe("1");
  });

  test("Input a string with spaces", () => {
    const S = "string with spaces";
    expect(capitalize(S)).toBe("String with spaces");
  });

  test("Input a single lowercase letter", () => {
    const S = "s";
    expect(capitalize(S)).toBe("S");
  });

  test("Input a single uppercase letter", () => {
    const S = "S";
    expect(capitalize(S)).toBe("S");
  });
});
