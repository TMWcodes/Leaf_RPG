class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  textMessage(resolve) {
    // console.log("Message");
    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);

    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });
    message.init(this.battle.element);
  }

  async stateChange(resolve) {
    const { caster, target, damage } = this.event;
    if (damage) {
      //change hp
      target.update({
        hp: target.hp - damage,
      });

      //start blink
      target.pizzaElement.classList.add("battle-damage-blink");
    }
    //wait
    await utils.wait(600);

    target.pizzaElement.classList.remove("battle-damage-blink");

    resolve();
  }
  //puts menu on screen
  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (submission) => {
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
