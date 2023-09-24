class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    //default hero if not given a source(src)
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
    });
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    this.talking = config.talking || [];
  }

  mount(map) {
    console.log("mounting");
    this.isMounted = true;
    map.addWall(this.x, this.y);
    // if behavior exist, execute after delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {}
  //setting up event
  async doBehaviorEvent(map) {
    // don't anything if cutscene is going etc
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //create an event instane out of our next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    //nothing below execute until this is finished, avoids infinite loop
    await eventHandler.init();

    //setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    // do it again
    this.doBehaviorEvent(map);
  }
}
// module.exports = { GameObject };
