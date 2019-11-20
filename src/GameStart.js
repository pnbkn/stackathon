import Phaser from "phaser";
import spaceImg from "../assets/space30.png";
import btnPlayImg from "../assets/btnPlay.png";
import startTitleImg from "../assets/startTitle.png";

export class GameStart extends Phaser.Scene {
  constructor() {
    super({ key: "GameStart" });
  }
  preload() {
    this.load.image("space", spaceImg);
    this.load.image("btnPlay", btnPlayImg);
    this.load.image("title", startTitleImg);
  }
  create() {
    this.space = this.add.tileSprite(0, 0, 1600, 1200, "space");
    this.btnPlay = this.add.image(390, 400, "btnPlay");
    this.starttitle = this.add.image(400, 130, "title");
    this.btnPlay.setInteractive();

    this.btnPlay.on(
      "pointerup",
      function() {
        this.scene.start("GamePlay");
      },
      this
    );

    this.guideText = this.add.text(
      this.game.config.width * 0.495,
      270,
      "▲ MOVE SHIP UP\n\n▼ MOVE SHIP DOWN\n\n⎵ FIRE LASERS ",
      {
        fontFamily: "helvetica",
        fontSize: 14,
        fontStyle: "bold",
        color: "#ffffff",
        align: "left"
      }
    );
    this.guideText.setOrigin(0.5);
  }
  update() {
    this.space.tilePositionX += 0.7;
  }
}
