import Phaser from "phaser";
import config from "./config";
import { GameStart } from "./GameStart";
import { GamePlay } from "./GamePlay";
import { GameOver } from "./GameOver";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("GameStart", GameStart);
    this.scene.add("GamePlay", GamePlay);
    this.scene.add("GameOver", GameOver);
    this.scene.start("GameStart");
  }
}

window.game = new Game();
