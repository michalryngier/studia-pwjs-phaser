export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setGravityY(1000);
    this.game = scene;
    this.playerJumps = 0;
  }

  setGravityY(value){
    return super.setGravityY(value);
  }

  tryJump() {
    this.game.input.on("pointerdown", this.jump, this);
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump(){
    if (this.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.game.gameOptions.jumps)) {
      if (this.body.touching.down) {
        this.playerJumps = 0;
      }
      this.setVelocityY(this.game.gameOptions.jumpForce * -1);
      this.playerJumps ++;
    }
  }
}
