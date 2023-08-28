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

      //camera
      const cameraPerson = this.map.gameObjects.hero;

      //update all objects, another loop - performance!
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          // ref for map itself
          map: this.map,
        });
      }); // draws lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //draws game objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
        });
        //pass in ctx and camera person
        object.sprite.draw(this.ctx, cameraPerson);
      });

      // draws Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

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
    console.log(this.map.walls);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;
    this.startGameLoop();
    // console.log("Hello from the Overworld", this);
  }
}

// module.exports = { Overworld };
