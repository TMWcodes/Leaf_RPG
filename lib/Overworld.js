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
    // game objects
    const hero = new GameObject({
      x: 5,
      y: 6,
    });
    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "/images/characters/people/npc1.png",
    });
    // call game objects
    //200ms time out
    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  }
}

module.exports = { Overworld };
