class GameObject {
  constructor(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    //default hero if not given a source(src)
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
    });
  }
  update() {}
}
// module.exports = { GameObject };
