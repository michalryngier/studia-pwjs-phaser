export default class BackgroundPool extends Phaser.GameObjects.Group {
  constructor(scene, children, config) {
    super(scene, children, config);
    this.maxSize = 2;
    this.game = scene;
  }


  setVelocity(velocity) {
    this.children['entries'].forEach(child => {
      child.body.setVelocityX(velocity);
    })
  }

  addBackground() {
    if (this.getLength() === this.maxSize) {
      this.getChildren()[0].destroy();
    }
    let xVertex = this.getLength() > 0 ? 2000: 0;
    let velocity = this.getLength() > 0
      ? this.children['entries'][0].body.velocity.x
      : (this.game.multiplier * this.game.gameOptions.platformStartSpeed * -1) / 2
    let background = this.game
      .physics
      .add
      .image(xVertex, -1000, 'background')
      .setOrigin(0,0)
      .setVelocityX(velocity)
      .setDepth(-1);
    this.add(background);
  }
}