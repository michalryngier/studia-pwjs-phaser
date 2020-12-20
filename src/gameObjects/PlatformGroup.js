import Platform from "./Platform";

export default class PlatformGroup extends Phaser.GameObjects.Group {
  constructor(scene, children, config) {
    super(scene, children, config);
    this.game = scene;
  }


  removeCallback(platform) {
    this.game.platformPool.add(platform);
  }
}