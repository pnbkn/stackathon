import Phaser from "phaser";
import spaceImg from "../assets/space30.png";
import btnRestartImg from "../assets/btnRestart.png";
import endTitleImg from "../assets/endTitle.png";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }
  init(data) {
    this.score = data;
  }
  preload() {
    this.load.image("space", spaceImg);
    this.load.image("btnRestart", btnRestartImg);
    this.load.image("end", endTitleImg);
    this.score;
  }
  create() {
    this.space = this.add.tileSprite(0, 0, 1600, 1200, "space");
    this.endtitle = this.add.image(400, 130, "end");
    this.btnRestart = this.add.image(400, 300, "btnRestart");
    this.btnRestart.setInteractive();

    this.scoreText = this.add.text(
      this.game.config.width * 0.5,
      500,
      "Score: " + this.score,
      {
        fontFamily: "SF Atarian System",
        fontSize: 44,
        fontStyle: "bold",
        color: "#ffffff",
        align: "center"
      }
    );
    this.scoreText.setOrigin(0.5);

    this.btnRestart.on(
      "pointerup",
      function() {
        this.scene.start("GamePlay", this.score);
      },
      this
    );
  }
  update() {
    this.space.tilePositionX += 0.7;
  }
}
