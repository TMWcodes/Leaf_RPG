class Person extends GameObject {
  constructor(config) {
    super(config);
    //keep moving till moved to next square, locked to grid
    this.movingProgressRemaining = 0;

    this.directionUpdate = {
      down: ["y", 1],
      up: ["y", -1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    this.updatePosition();
    if (this.movingProgressRemaining === 0 && state.arrow) {
      this.direction = state.arrow;
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
}
