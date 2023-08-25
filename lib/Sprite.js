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
      idleRight: [[0, 1]],
      idleUp: [[0, 2]],
      idleLeft: [[0, 3]],
      walkDown: [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      walkRight: [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      walkUp: [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      walkLeft: [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation || "idleLeft";
    this.currentAnimationFrame = 0;
    this.animationFrameLimit = 16;
    // time till next frame
    this.animationFrameProgress = this.animationFrameLimit;
    // ref game object
    this.gameObject = config.gameObject;
  }
  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }
  // method to change character appearance, // if current animation not new key set to key
  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame;
    }
  }
  updateAnimationProgress() {
    //frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
    // if out of bounds reset to 0
    if (this.frame == undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx) {
    //-8 nudge
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;
    //shadow before hero
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    // this.frame gives and array of coordinates
    const [frameX, frameY] = this.frame;
    //make sure loaded before trying to draw
    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);
    this.updateAnimationProgress();
  }
}
