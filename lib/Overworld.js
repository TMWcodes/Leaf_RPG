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
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
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

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //is talking person there?
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        //heros position change
        // console.log("Hero at position");
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.DemoRoom);

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    // this.directionInput.direction;

    this.bindHeroPositionCheck();
    this.bindActionInput();
    this.startGameLoop();

    // console.log("Hello from the Overworld", this);
    // this.map.startCutscene([
    //   { who: "hero", type: "walk", direction: "left" },
    //   { who: "hero", type: "walk", direction: "left" },
    //   { who: "hero", type: "walk", direction: "left" },
    //   { who: "hero", type: "stand", direction: "down" },
    //   { who: "npcB", type: "walk", direction: "left" },
    //   { who: "npcB", type: "stand", direction: "up" },
    //   { who: "npcA", type: "stand", direction: "right" },
    //   { type: "textMessage", text: "My name's Ken" },
    // ]);
  }
}

// module.exports = { Overworld };
