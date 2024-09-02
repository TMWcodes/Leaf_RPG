window.PizzaTypes = {
  normal: "normal",
  spicy: "spicy",
  veggie: "veggie",
  fungi: "fungi",
  chill: "chill",
};

window.Pizzas = {
  s001: {
    name: "Spicy",
    type: PizzaTypes.spicy,
    src: "/images/characters/pizzas/s001.png",
    icon: "/images/icons/spicy.png",
    actions: ["clumsyStatus", "damage1", "saucyStatus"],
  },
  v001: {
    name: "Kalle",
    type: PizzaTypes.veggie,
    src: "/images/characters/pizzas/v001.png",
    icon: "/images/icons/veggie.png",
    actions: ["damage1"],
  },
  f001: {
    name: "bella Express",
    type: PizzaTypes.fungi,
    src: "/images/characters/pizzas/f001.png",
    icon: "/images/icons/fungi.png",
    actions: ["damage1"],
  },
};
