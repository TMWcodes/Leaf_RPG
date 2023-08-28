class Person extends GameObject {
  constructor(config) {
    super(config);
    //keep moving till moved to next square, locked to grid
    this.movingProgressRemaining = 0;
    // default to fa;se (not player controlled)
    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      down: ["y", 1],
      up: ["y", -1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    this.updatePosition();
    this.updateSprite(state);
    // make sure player controlled first
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      state.arrow
    ) {
      this.direction = state.arrow;
      console.log(state.map.isSpaceTaken(this.x, this.y, this.direction));
      this.movingProgressRemaining = 16;
    }
  }
  //pulling from this.direction^
  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      // moving progress decreases
      this.movingProgressRemaining -= 1;
    }
  }
  updateSprite(state) {
    // player controlled, no more moving space and no arrow pressed.
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      !state.arrow
    ) {
      this.sprite.setAnimation("idle-" + this.direction);
      return;
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
    }
  }
}

// module.exports = { Person };
