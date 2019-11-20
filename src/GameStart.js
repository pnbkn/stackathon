import Phaser from "phaser";
import spaceImg from "../assets/space30.png";
import btnPlayImg from "../assets/btnPlay.png";
import startTitleImg from "../assets/startTitle.png";
import bluePlanetImg from "../assets/bluePlanet.png";
import redPlanetImg from "../assets/redPlanet.png";

export class GameStart extends Phaser.Scene {
  constructor() {
    super({ key: "GameStart" });
  }
  preload() {
    this.load.image("space", spaceImg); // Load Images
    this.load.image("bluePlanet", bluePlanetImg);
    this.load.image("redPlanet", redPlanetImg);
    this.load.image("btnPlay", btnPlayImg);
    this.load.image("title", startTitleImg);
  }
  create() {
    this.space = this.add.tileSprite(0, 0, 1600, 1200, "space"); // Add Images
    this.bluePlanet = this.add.image(600, 50, "bluePlanet");
    this.bluePlanet.scaleX = 0.3;
    this.bluePlanet.scaleY = 0.3;
    this.redPlanet = this.add.image(700, 500, "redPlanet");
    this.redPlanet.scaleX = 2;
    this.redPlanet.scaleY = 2;
    this.btnPlay = this.add.image(390, 400, "btnPlay");
    this.starttitle = this.add.image(400, 130, "title");
    this.btnPlay.setInteractive();

    // Set up play button
    this.btnPlay.on(
      "pointerup",
      function() {
        this.scene.start("GamePlay");
      },
      this
    );

    // Add Instructions Text
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
    this.space.tilePositionX += 0.4; // Move Background
    this.bluePlanet.x -= 0.6;
    this.redPlanet.x -= 1;
  }
}
