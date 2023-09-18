class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    //default to empty object
    this.walls = config.walls || {};
    //lower and upper src for layering
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.Src = config.upperSrc;
    this.isCutscenePlaying = false;
  }
  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }
  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }
  // should evalutate to true if space taken
  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    // console.log(`${x}, ${y}`)
    return this.walls[`${x}, ${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key];
      object.id = key;
      object.mount(this);
    });
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }
    this.isCutscenePlaying = false;
  }
  addWall(x, y) {
    this.walls[`${x}, ${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x}, ${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

// config objects
// object of all the different maps
window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npcA: new Person({
        x: utils.withGrid(9),
        y: utils.withGrid(8),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 }, //ms
          { type: "stand", direction: "right", time: 800 },
          { type: "stand", direction: "up", time: 800 },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 800 }, //ms
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
        ],
      }),
    },
    // coords from aseprite grid
    //console (bases/multiples of 16): {112,96: true, 128,96: true, 112,112: true, 128,112: true}
    walls: {
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new GameObject({
        x: 3,
        y: 5,
      }),
      npc1: new GameObject({
        x: 9,
        y: 6,
        src: "/images/characters/people/npc1.png",
      }),
      npc2: new GameObject({
        x: 2,
        y: 8,
        src: "/images/characters/people/npc2.png",
      }),
      npc3: new GameObject({
        x: 5,
        y: 5,
        src: "/images/characters/people/npc3.png",
      }),
    },
  },
};
