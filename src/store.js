import { reactive } from 'vue';

export const classes = [
  {
    name: "Gunslinger",
    startingWeapon: "Compact SMG",
    equipment: "Frag Grenade",
    image: "/classes-icons/gunslinger.jpg",
  },
  {
    name: "Hellraiser",
    startingWeapon: "Shotgun",
    equipment: "C4 / Claymore Mine",
    image: "/classes-icons/hellraiser.jpg",
  },
  {
    name: "Medic",
    startingWeapon: "Compact SMG",
    equipment: "Stim Pistol",
    image: "/classes-icons/medic.jpg",
  },
  {
    name: "Fixer",
    startingWeapon: "Scout Rifle",
    equipment: "Supply Bag / Masking Gas Grenade",
    image: "/classes-icons/fixer.jpg",
  },
  {
    name: "Slasher",
    startingWeapon: "Compact SMG",
    equipment: "Stun Gun",
    image: "/classes-icons/slasher.jpg",
  },
  {
    name: "Exterminator",
    startingWeapon: "Shotgun",
    equipment: "Molotov Cocktail / Claymore Mine",
    image: "/classes-icons/exterminator.jpg",
  },
  {
    name: "Dronemaster",
    startingWeapon: "Scout Rifle",
    equipment: "Quadrocopter",
    image: "/classes-icons/dronemaster.jpg",
  },
  {
    name: "Vanguard",
    startingWeapon: "Shotgun",
    equipment: "Mobile Shield",
    image: "/classes-icons/vanguard.jpg",
  },
];



export const store = reactive({
  selectedClass: classes[0]
});
