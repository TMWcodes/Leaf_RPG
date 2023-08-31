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
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, { type: "walk", direction: state.arrow });
      }
      this.updateSprite(state);
    }

    // make sure player controlled first
  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      // if true
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
    }
  }
  //pulling from this.direction^
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    // moving progress decreases
    this.movingProgressRemaining -= 1;
  }
  updateSprite() {
    // player controlled, no more moving space and no arrow pressed.
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}

// module.exports = { Person };
