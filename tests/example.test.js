const add = require("./add"); // Import the module you want to test

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3); // Assertion
});
//
