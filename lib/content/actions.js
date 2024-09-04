window.Actions = {
  damage1: {
    name: "Cleave",
    description: "A slashing attack",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10 },
    ],
  },
  saucyStatus: {
    name: "Buff",
    description: "envelops the user",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "stateChange", status: { type: "saucy", expiresIn: 3 } },
    ],
  },
  clumsyStatus: {
    name: "De-buff",
    description: "obscure the target's vision",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
      { type: "animation", animation: "glob", color: "#dafd2a" },
      { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
      { type: "textMessage", text: "{TARGET} is clumsy" },
    ],
  },
  item_recoverStatus: {
    name: "Clear Status",
    description: "Feeling fresh",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}!" },
      { type: "stateChange", status: null },
      { type: "textMessage", text: "Status clear!" },
    ],
  },
  item_recoverHp: {
    name: "Healing",
    description: "output positive energy to heal",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} sprinkles on some {ACTION}!" },
      { type: "stateChange", recover: 10 },
      { type: "textMessage", text: "{CASTER} recovers HP!" },
    ],
  },
};
