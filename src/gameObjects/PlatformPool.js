import Platform from "./Platform";

export default class PlatformPool extends Phaser.GameObjects.Group  {
  constructor(scene, children, config) {
    super(scene, children, config);
    this.game = scene;
  }

  removeCallback(platform) {
    platform.scene.platformPool.add(platform)
  }


  // the core of the script: platform are added from the pool or created on the fly
  addPlatform(platformWidth, posX) {
    let platform;
    // console.log("logarithm x: ", (this.game.timePlayed - 15) / 10 + 2);
    // console.log("time played:", this.game.timePlayed, "multiplier:", this.game.multiplier);
    if (this.getLength()) {
      platform = this.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.remove(platform);
    } else {
      platform = new Platform(this.game, posX, this.game.game.config.height * 0.8, "platform");
      platform.setVelocityX(this.game.multiplier * this.game.gameOptions.platformStartSpeed * -1);
      this.game.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth * (this.game.multiplier / 10 + 1);
    this.game.nextPlatformDistance = Phaser.Math.Between(
      this.game.gameOptions.spawnRange[0],
      this.game.gameOptions.spawnRange[1]
    );
  }
}
