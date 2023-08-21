class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  // creates new image, assign source, copy all pixels onto the canvas
  init() {
    // console.log("Hello from the Overworld", this);
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
    image.src = "/images/maps/DemoLower.png";
  }
}

module.exports = { Overworld };
