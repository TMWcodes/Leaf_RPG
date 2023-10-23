window.Actions = {
  damage1: {
    name: "Cleave",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}" },
      { type: "stateChange", damage: 10 },
    ],
  },
};
