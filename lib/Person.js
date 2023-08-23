class Person extends GameObject {
  constructor(config) {
    super(config);
    //keep moving till moved to next square, locked to grid
    this.movingProgressRemaining = 16 * 3;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    this.updatePosition();
  }
  //if in the process of moving
  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
}
