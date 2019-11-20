import Phaser from "phaser";
import spaceImg from "../assets/space30.png";
import shipImg from "../assets/ship.png";
import laserImg from "../assets/laser.png";
import asteroidImg from "../assets/asteroid.png";
import blasterSnd from "../assets/laser.m4a";
import asteroidExSnd from "../assets/asteroidExplosion.mp3";
import shipExSnd from "../assets/shipExplosion.mp3";
import musicSnd from "../assets/music.mp3";

export class GamePlay extends Phaser.Scene {
  constructor() {
    super({ key: "GamePlay" });
  }

  preload() {
    this.load.image("space", spaceImg);
    this.load.image("laser", laserImg);
    this.load.image("ship", shipImg);
    this.load.image("asteroid", asteroidImg);
    this.load.audio("blaster", blasterSnd);
    this.load.audio("asteroidEx", asteroidExSnd);
    this.load.audio("shipEx", shipExSnd);
    this.load.audio("music", musicSnd);
  }
  create() {
    this.score = 0;
    this.blaster = this.sound.add("blaster");
    this.shipExplosion = this.sound.add("shipEx");
    this.astExplosion = this.sound.add("asteroidEx");
    this.music = this.sound.add("music");
    this.music.loop = true;
    this.music.play();
    // this.sound.setDecodedCallback([this.blaster], update, this);
    this.space = this.add.tileSprite(0, 0, 1600, 1200, "space");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    //this.asteroid = this.add.image(800, 300, "asteroid");
    this.asteroids = this.physics.add.group({
      defaultKey: "asteroid",
      maxSize: 7,
      setXY: { x: 800, y: 0, stepX: 400 }
    });
    this.lasers = this.physics.add.group({
      defaultKey: "laser",
      maxSize: 2
    });
    this.ship = this.physics.add.image(200, 200, "ship");

    this.scoreText = this.add.text(650, 550, "score: " + this.score, {
      fontFamily: "helvetica",
      fontSize: "24px",
      fill: "#FFF"
    });
    this.ship.body.collideWorldBounds = true;
    this.physics.add.overlap(this.lasers, this.asteroids, addScore, null, this);
    this.physics.add.overlap(this.ship, this.asteroids, endGame, null, this);

    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    function endGame(ship, asteroid) {
      this.shipExplosion.play();
      asteroid.setActive(false);
      asteroid.setVisible(false);
      this.music.stop();
      this.scene.start("GameOver", this.score);
    }

    function addScore(lasers, asteroid) {
      this.score += 50;
      this.scoreText.setText("Score: " + this.score);
      this.astExplosion.play();
      asteroid.setActive(false);
      asteroid.setVisible(false);
    }
  }
  update() {
    if (this.score < 1000) {
      this.space.tilePositionX += 0.7;
    }

    if (this.score > 1000) {
      this.space.tilePositionX += 1.5;
    }

    let asteroid = this.asteroids.get(
      Math.floor(Math.random() * 1500) + 700,
      Math.floor(Math.random() * 500)
    );
    if (asteroid) {
      asteroid.setActive(true);
      asteroid.setVisible(true);
      //asteroid.setScale(Math.floor(Math.random() * 2) + 0.5);
      asteroid.scaleX = Math.floor(Math.random() * 1.3) + 0.5;
      asteroid.scaleY = Math.floor(Math.random() * 1.3) + 0.5;
      if (this.score < 1000) {
        asteroid.body.velocity.x = Math.floor(Math.random() * -50) + -200;
      } else if (this.score > 1000) {
        asteroid.body.velocity.x = Math.floor(Math.random() * -100) + -400;
      }

      asteroid.angle = Math.floor(Math.random() * 180) + -75;

      this.tweens.add({
        targets: asteroid,
        rotation: Math.floor(Math.random() * -10) + 10,
        duration: 15000,
        ease: "Power1"
      });
    }

    if (this.cursorKeys.up.isDown) {
      this.tweens.add({
        targets: this.ship,
        y: "-=20",
        duration: 100,
        ease: "Power1"
      });
    }
    if (this.cursorKeys.down.isDown) {
      this.tweens.add({
        targets: this.ship,
        y: "+=20",
        duration: 100,
        ease: "Power1"
      });
    }

    if (this.spaceBar.isDown) {
      this.blaster.play();
      let laserTop = this.lasers.get(this.ship.x + 10, this.ship.y - 5);
      if (laserTop) {
        laserTop.setActive(true);
        laserTop.setVisible(true);
        laserTop.body.velocity.x = 1000;
        laserTop.body.velocity.y = 0;
      }
      let laserBottom = this.lasers.get(this.ship.x + 10, this.ship.y + 5);
      if (laserBottom) {
        laserBottom.setActive(true);
        laserBottom.setVisible(true);
        laserBottom.body.velocity.x = 1000;
        laserBottom.body.velocity.y = 0;
      }
    }
    this.asteroids.children.each(
      function(a) {
        if (a.active) {
          if (a.x < 0) {
            a.setActive(false);
          }
        }
      }.bind(this)
    );

    this.lasers.children.each(
      function(l) {
        if (l.active) {
          if (l.x > 700) {
            l.setActive(false);
          }
        }
      }.bind(this)
    );
  }
}
