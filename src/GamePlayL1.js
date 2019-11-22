import Phaser from "phaser";
import spaceImg from "../assets/space30.png";
import shipImg from "../assets/ship.png";
import laserImg from "../assets/laser.png";
import asteroidImg from "../assets/asteroid.png";
import bluePlanetImg from "../assets/bluePlanet.png";
import redPlanetImg from "../assets/redPlanet.png";
import greenPlanetImg from "../assets/greenPlanet.png";
import blasterSnd from "../assets/laser.m4a";
import asteroidExSnd from "../assets/asteroidExplosion.mp3";
import shipExSnd from "../assets/shipExplosion.mp3";
import musicSnd from "../assets/music.mp3";

export class GamePlayL1 extends Phaser.Scene {
  constructor() {
    super({ key: "GamePlayL1" });
  }

  preload() {
    this.load.image("space", spaceImg); // Load Image files
    this.load.image("laser", laserImg);
    this.load.image("ship", shipImg);
    this.load.image("asteroid", asteroidImg);
    this.load.image("bluePlanet", bluePlanetImg);
    this.load.image("redPlanet", redPlanetImg);
    this.load.image("greenPlanet", greenPlanetImg);
    this.load.audio("blaster", blasterSnd); // Load Audio files
    this.load.audio("asteroidEx", asteroidExSnd);
    this.load.audio("shipEx", shipExSnd);
    this.load.audio("music", musicSnd);
  }
  create() {
    this.score = 0;
    this.blaster = this.sound.add("blaster"); // Add Audio to Stage
    this.shipExplosion = this.sound.add("shipEx");
    this.astExplosion = this.sound.add("asteroidEx");
    this.music = this.sound.add("music");
    this.music.loop = true;
    this.music.play(); // Play annoying music

    this.space = this.add.tileSprite(0, 0, 1600, 1200, "space"); // Add Images to State
    this.bluePlanet = this.add.image(900, 50, "bluePlanet");
    this.bluePlanet.scaleX = 0.4;
    this.bluePlanet.scaleY = 0.4;
    this.redPlanet = this.add.image(1400, 100, "redPlanet");
    this.redPlanet.scaleX = 1;
    this.redPlanet.scaleY = 1;
    this.greenPlanet = this.add.image(3000, 600, "greenPlanet");
    this.greenPlanet.scaleX = 2;
    this.greenPlanet.scaleY = 2;
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

    this.cursorKeys = this.input.keyboard.createCursorKeys(); // Set up cursor keys for ship control

    // Add Score text field
    this.scoreText = this.add.text(650, 550, "score: " + this.score, {
      fontFamily: "helvetica",
      fontSize: "24px",
      fill: "#FFF"
    });

    this.ship.body.collideWorldBounds = true; // Stop ship from falling off stage

    // Set up asteroid / laser collision
    this.physics.add.overlap(
      this.lasers,
      this.asteroids,
      updateScore,
      null,
      this
    );

    // Update Score and remove asteroid
    function updateScore(laser, asteroid) {
      this.score += 50;
      this.scoreText.setText("Score: " + this.score);
      this.astExplosion.play();
      asteroid.setActive(false);
      asteroid.setVisible(false);
    }
    // Set up asteroid and ship collision
    this.physics.add.overlap(this.ship, this.asteroids, endGame, null, this);

    //Set up keyboard controls
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // When ship is hit, call game over
    function endGame(ship, asteroid) {
      this.shipExplosion.play();
      asteroid.setActive(false);
      asteroid.setVisible(false);
      ship.setActive(false);
      ship.setVisible(false);
      this.music.stop();
      this.scene.start("GameOver", this.score);
    }
  }

  update() {
    //Set speed of background based on score
    this.space.tilePositionX += 0.4;
    this.bluePlanet.x -= 0.6;
    this.redPlanet.x -= 0.8;
    this.greenPlanet.x -= 1.7;

    if (this.score > 1000) {
      this.music.stop();
      this.scene.start("GameStartL2", this.score);
    }

    //Add asteroids randomly to stage
    let asteroid = this.asteroids.get(
      Math.floor(Math.random() * 1500) + 700,
      Math.floor(Math.random() * 500)
    );
    // Create asteroid with random rotation, size and velocity
    if (asteroid) {
      asteroid.setActive(true);
      asteroid.setVisible(true);
      asteroid.scaleX = Math.floor(Math.random() * 1.3) + 0.5;
      asteroid.scaleY = Math.floor(Math.random() * 1.3) + 0.5;
      asteroid.body.velocity.x = Math.floor(Math.random() * -50) + -200;

      asteroid.angle = Math.floor(Math.random() * 180) + -75;
    }
    // Move Ship Up
    if (this.cursorKeys.up.isDown) {
      this.tweens.add({
        targets: this.ship,
        y: "-=20",
        duration: 100,
        ease: "Power1"
      });
    }
    // Move Ship Down
    if (this.cursorKeys.down.isDown) {
      this.tweens.add({
        targets: this.ship,
        y: "+=20",
        duration: 100,
        ease: "Power1"
      });
    }

    // Fire lasers
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
    //Remove asteroids that have been hit
    this.asteroids.children.each(
      function(a) {
        if (a.active) {
          if (a.x < 0) {
            a.setActive(false);
          }
        }
      }.bind(this)
    );
    //Remove lasers that have gone off screen
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
