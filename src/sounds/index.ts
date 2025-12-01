import { counter, flip, gameOver, whistle } from "./getSounds";
import { Howl } from "howler";
import type { Sounds, TESounds } from "../interfaces";

const SOUNDS: Sounds = {
  COUNTER: new Howl({
    src: [counter],
  }),
  FLIP: new Howl({
    src: [flip],
  }),
  GAME_OVER: new Howl({
    src: [gameOver],
  }),
  WHISTLE: new Howl({
    src: [whistle],
  }),
};

export const playSound = (type: TESounds) => {
  SOUNDS[type].play();
};
