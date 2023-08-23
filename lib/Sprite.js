class Sprite {
  constructor(config) {
    //set up image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      //wont draw until loaded
      this.isLoaded = true;
    };

    //shadow
    // if - for if there is already a shadow
    this.shadow = new Image();
    this.useShadow = true;

    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
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
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;
    //shadow before hero
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    //make sure loaded before trying to draw
    this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
  }
}
