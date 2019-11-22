import Phaser from "phaser";
import spaceImg from "../assets/space30.png";
import btnRestartImg from "../assets/btnRestart.png";
import endTitleImg from "../assets/endTitle.png";
import bluePlanetImg from "../assets/bluePlanet.png";
import redPlanetImg from "../assets/redPlanet.png";

export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: "GameOver" });
  }
  init(data) {
    this.score = data;
  }
  preload() {
    this.load.image("space", spaceImg);
    this.load.image("bluePlanet", bluePlanetImg);
    this.load.image("redPlanet", redPlanetImg);
    this.load.image("btnRestart", btnRestartImg);
    this.load.image("end", endTitleImg);
    this.score;
  }
  create() {
    this.space = this.add.tileSprite(0, 0, 1600, 1200, "space");
    this.bluePlanet = this.add.image(600, 50, "bluePlanet");
    this.bluePlanet.scaleX = 0.4;
    this.bluePlanet.scaleY = 0.4;
    this.redPlanet = this.add.image(700, 400, "redPlanet");
    this.redPlanet.scaleX = 2.2;
    this.redPlanet.scaleY = 2.2;
    this.endtitle = this.add.image(400, 130, "end");
    this.btnRestart = this.add.image(400, 300, "btnRestart");
    this.btnRestart.setInteractive();
    if (isNaN(this.score)) {
      this.score = 0;
    }
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
        this.scene.start("GamePlayL1", this.score);
      },
      this
    );
  }
  update() {
    this.space.tilePositionX += 0.4;
    this.bluePlanet.x -= 0.7;
    this.redPlanet.x -= 1.2;
  }
}
