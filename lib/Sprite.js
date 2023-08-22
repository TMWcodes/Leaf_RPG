class Sprite {
  constructor(config) {
    //set up image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      //wont draw until loaded
      this.isLoaded = true;
    };

    //config animations
    this.animations = config.animations || {
      // 2d array
      idleDown: [[0, 0]],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;
    // ref game object
    this.gameObject = config.gameObject;
  }

  draw(ctx) {
    //-8 nudge
    const x = this.gameObject.x * 16 - 8;
    const y = this.gameObject.y * 16 - 18;

    //make sure loaded before trying to draw
    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
