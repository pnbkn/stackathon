import Phaser from "phaser";
import config from "./config";
import { GameStart } from "./GameStart";
import { GameStartL2 } from "./GameStartL2";
import { GamePlayL1 } from "./GamePlayL1";
import { GamePlayL2 } from "./GamePlayL2";
import { GameOver } from "./GameOver";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("GameStart", GameStart);
    this.scene.add("GameStartL2", GameStartL2);
    this.scene.add("GamePlayL1", GamePlayL1);
    this.scene.add("GamePlayL2", GamePlayL2);
    this.scene.add("GameOver", GameOver);
    this.scene.start("GameStart");
  }
}

window.game = new Game();
