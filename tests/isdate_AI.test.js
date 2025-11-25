/* 
    Model used:
    OpenAI chatGPT 5.1

    Link to chat:
    https://chatgpt.com/share/6925da7d-bcc4-8010-9075-02302031b0c0

    Prompt used: 
    Using jest, write comprehensive tests for the following function. The function is a utility function for an e-commerce store. For full context consider the following overview/summary of the e-commerce store
    The application context is an E-commerce store selling food products from various small producers. Users can search products by category, price, product contents, and producer. Products can be added to a shopping cart. Shopping cart automatically updates and shows the total price. Checkout and payment process is handled with a third-party solution. The food producers can add their products via a previously created portal, or by using a front-end application. The producers can leave some fields blank if they do not want to specify some attributes like category or contents.

    The application consists of a REST back-end, which provides the interfaces for executing the core functionality of the E-commerce store (searching, buying, adding and removing products). The back-end is also responsible for accessing third party services.

    Additionally, the application includes a front-end built with React. The React application uses an utility library, which can be found here. Unit testing for the applicable parts of the utility library must be included in your test plan. The React application is used for the store functionality and can also be used to access the portal mentioned above. The React application performs validation for user inputs (e.g. check that product descriptions look similar, first word of a sentence start with an upper-case letter, prices are added with two decimal accuracy, user does not input malformed data when ordering products, etc.).

    import getTag from './.internal/getTag.js'
    import isObjectLike from './isObjectLike.js'
    import nodeTypes from './.internal/nodeTypes.js'

    const nodeIsDate = nodeTypes && nodeTypes.isDate;

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
     * @example
     *
     * isDate(new Date)
     * // => true
     *
     * isDate('Mon April 23 2012')
     * // => false
    const isDate = nodeIsDate
    ? (value) => nodeIsDate(value)
    : (value) => isObjectLike(value) && getTag(value) == '[object Date]'

    export default isDate
*/

/*Below is the result copied from chatGPT, only change being made is the path for the isDate file  */

// isDate.test.js
// Adjust the import path to where your isDate utility lives
import isDate from "../src/isDate.js";

describe("isDate utility", () => {
  describe("returns true for real Date objects", () => {
    test("current date instance", () => {
      const value = new Date();
      expect(isDate(value)).toBe(true);
    });

    test("date constructed from ISO string", () => {
      const value = new Date("2024-05-01T12:34:56.000Z");
      expect(isDate(value)).toBe(true);
    });

    test("invalid Date is still a Date object", () => {
      const value = new Date("not a real date");
      // Even though value.getTime() is NaN, it is still a Date instance / tagged as [object Date]
      expect(isDate(value)).toBe(true);
    });

    test("date object used in e-commerce order metadata", () => {
      const order = {
        orderId: "ORDER-123",
        createdAt: new Date(),
        // user typed this; frontend hasn’t parsed it yet
        requestedDeliveryDate: "2025-01-01",
      };

      expect(isDate(order.createdAt)).toBe(true);
      expect(isDate(order.requestedDeliveryDate)).toBe(false);
    });
  });

  describe("returns false for date-like but non-Date values", () => {
    test("date string", () => {
      expect(isDate("2024-05-01")).toBe(false);
      expect(isDate("Mon April 23 2012")).toBe(false);
    });

    test("numeric timestamp", () => {
      const timestamp = 1609459200000; // 2021-01-01T00:00:00.000Z
      expect(isDate(timestamp)).toBe(false);
    });

    test("plain object pretending to be a date", () => {
      const fakeDate = {
        year: 2024,
        month: 5,
        day: 1,
      };
      expect(isDate(fakeDate)).toBe(false);
    });

    test("array of date parts", () => {
      expect(isDate([2024, 5, 1])).toBe(false);
    });

    test("object with custom toString that looks like a Date tag", () => {
      const tricky = {
        toString() {
          return "[object Date]";
        },
      };

      // getTag (via Object.prototype.toString.call) should still see this
      // as [object Object], not a real Date.
      expect(isDate(tricky)).toBe(false);
    });
  });

  describe("returns false for non-object-like values", () => {
    test("null and undefined", () => {
      expect(isDate(null)).toBe(false);
      expect(isDate(undefined)).toBe(false);
    });

    test("booleans", () => {
      expect(isDate(true)).toBe(false);
      expect(isDate(false)).toBe(false);
    });

    test("numbers", () => {
      expect(isDate(0)).toBe(false);
      expect(isDate(42)).toBe(false);
      expect(isDate(NaN)).toBe(false);
      expect(isDate(Infinity)).toBe(false);
    });

    test("strings that are clearly not dates", () => {
      expect(isDate("")).toBe(false);
      expect(isDate("not a date")).toBe(false);
      expect(isDate("2024-13-40")).toBe(false); // impossible date
    });

    test("functions", () => {
      function fn() {}
      const arrow = () => {};

      expect(isDate(fn)).toBe(false);
      expect(isDate(arrow)).toBe(false);
    });

    test("symbols", () => {
      expect(isDate(Symbol("date"))).toBe(false);
    });

    test("bigints", () => {
      // If your environment supports BigInt
      expect(isDate(BigInt(123))).toBe(false);
    });
  });

  describe("object-like non-Date values common in the app", () => {
    test("product object from catalog", () => {
      const product = {
        id: "prod-1",
        name: "Organic Oat Granola",
        price: 4.99,
        // might come as a string from backend
        availableFrom: "2025-01-15T10:00:00.000Z",
      };

      expect(isDate(product)).toBe(false);
      expect(isDate(product.availableFrom)).toBe(false);
    });

    test("shopping cart item with date-like fields", () => {
      const cartItem = {
        productId: "prod-2",
        quantity: 3,
        addedAt: new Date(),
        // stored as plain string in some APIs
        bestBefore: "2025-02-01",
      };

      expect(isDate(cartItem.addedAt)).toBe(true);
      expect(isDate(cartItem.bestBefore)).toBe(false);
    });

    test("plain object, array, and RegExp", () => {
      expect(isDate({})).toBe(false);
      expect(isDate([])).toBe(false);
      expect(isDate(/2024-05-01/)).toBe(false);
    });

    test("Object.create(Date.prototype) is not a real Date instance", () => {
      const fake = Object.create(Date.prototype);
      // Brand is still Object, so getTag should not treat it as Date
      expect(isDate(fake)).toBe(false);
    });
  });
});
