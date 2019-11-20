export default {
  type: Phaser.AUTO,
  parent: "root",
  width: 800,
  height: 600,
  backgroundColor: "black1",
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  pixelArt: true,
  roundPixels: true
};
