class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // draws lower layer
      this.map.drawLowerImage(this.ctx);

      //draws game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        // object.x += 1;
        // object.y += 1;
        object.update({});
        object.sprite.draw(this.ctx);
      });

      // draws Upper layer
      this.map.drawUpperImage(this.ctx);

      // console.log("Text check Game loop");
      //browser feature, calls when new frame begins
      requestAnimationFrame(() => {
        // step calling step again when a new frame starts
        step();
      });
    };
    step();
  }
  // creates new image, assign source, copy all pixels onto the canvas
  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
    // console.log("Hello from the Overworld", this);
  }
}

module.exports = { Overworld };
