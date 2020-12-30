export default class PowerObjectPool extends Phaser.GameObjects.Group {
  LOWER_GRAVITY_KEY = 'lowerGravityIcon';
  TRIPLE_JUMP_KEY = 'tripleJumpIcon';

  constructor(scene, children, config) {
    super(scene, children, config);
    this.maxSize = 2;
    this.game = scene;
  }

  addPowerObject(key) {
    if (this.getLength() >= this.maxSize) {
      let last = this.getChildren()[0];
      last.destroy(true, true);
    }
    switch (key) {
      case this.TRIPLE_JUMP_KEY:
        this.createTripleJumpPower();
        break;
      case this.LOWER_GRAVITY_KEY:
        this.createLowerGravityPower();
        break;
    }
  }

  createTripleJumpPower() {
    let tripleJump = this.game.physics.add.sprite(
      this.game.game.config.width + 100,
      this.game.game.config.height * 0.4,
      'tripleJumpIcon'
    );
    tripleJump.setVelocityX(this.game.multiplier * this.game.gameOptions.platformStartSpeed * -1);
    tripleJump.displayWidth = 50;
    tripleJump.displayHeight = 50;
    this.add(tripleJump);
  }

  createLowerGravityPower() {
    let lowerGravity = this.game.physics.add.sprite(
      this.game.game.config.width + 100,
      this.game.game.config.height * 0.4,
      'lowerGravityIcon'
    );
    lowerGravity.setVelocityX(this.game.multiplier * this.game.gameOptions.platformStartSpeed * -1);
    lowerGravity.displayWidth = 50;
    lowerGravity.displayHeight = 50;
    this.add(lowerGravity);
  }
}