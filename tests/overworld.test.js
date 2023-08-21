const { Overworld } = require("../lib/Overworld");

// Mock the canvas and context methods
const mockContext = {
  drawImage: jest.fn(),
};
const mockCanvas = {
  getContext: jest.fn(() => mockContext),
};
const mockElement = {
  querySelector: jest.fn(() => mockCanvas),
};

describe("Overworld class", () => {
  it("should initialize canvas and ctx properties", () => {
    const overworld = new Overworld({
      element: mockElement,
    });

    expect(overworld.canvas).toBeDefined();
    expect(overworld.ctx).toBeDefined();
  });
});
