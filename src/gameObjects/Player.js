export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setGravityY(1000);
    this.game = scene;
    this.playerJumps = 0;
    this.alive = true
    this.powers = {
      tripleJump: {
        active: false,
        activationTime: 0,
        availableJumps: 1,
      },
      lowerGravity: {
        active: false,
        activationTime: 0,
        gravityMultiplier: 0.25
      }
    }
  }

  setGravityY(value){
    return super.setGravityY(value);
  }

  tryJump() {
    this.game.input.on("pointerdown", this.jump, this);
  }

  hasActivePower() {
    return this.powers.tripleJump.active || this.powers.lowerGravity.active;
  }

  activePowerRemainingTime() {
    if (this.hasActivePower() === false) {
      return 0;
    }
    if (this.powers.tripleJump.active === true) {
      return this.game.timePlayed - this.powers.tripleJump.activationTime;
    }
    if (this.powers.lowerGravity.active === true) {
      return this.game.timePlayed - this.powers.lowerGravity.activationTime;
    }
  }

  // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
  jump() {
    if (this.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.game.gameOptions.jumps)) {
      if (this.body.touching.down) {
        this.playerJumps = 0;
        this.powers.tripleJump.availableJumps = 1;
      }
      this.setVelocityY(this.game.gameOptions.jumpForce * -1);
      this.game.jumpSound.play();
      this.playerJumps++;
    } else if (this.powers.tripleJump.active && this.powers.tripleJump.availableJumps === 1) {
      this.game.jumpSound.play();
      this.setVelocityY(this.game.gameOptions.jumpForce * -1);
      this.powers.tripleJump.availableJumps = 0
    }
  }

  flying() {
    if (this.body.touching.down) {
      this.game.flySound.play();
    } else {
      this.game.flySound.stop();
    }
  }

  addTripleJumpPower() {
    this.powers.tripleJump.active = true;
    this.powers.tripleJump.activationTime = this.game.timePlayed;
    this.powers.tripleJump.availableJumps = 1;
  }

  addLowerGravityPower() {
    this.powers.lowerGravity.active = true;
    this.powers.lowerGravity.activationTime = this.game.timePlayed;
  }

  checkPowerLifetime() {
    if (this.hasActivePower() === true) {
      if (
        this.powers.lowerGravity.active
        && this.game.timePlayed - this.powers.lowerGravity.activationTime > this.game.gameOptions.powerLifetime
      ) {
        this.game.alert1Sound.play();
        this.resetPower(this.powers.lowerGravity);
      } else if (
        this.powers.tripleJump.active
        && this.game.timePlayed - this.powers.tripleJump.activationTime > this.game.gameOptions.powerLifetime
      ) {
        this.game.alert2Sound.play();
        this.resetPower(this.powers.tripleJump);
      }
    }
  }

  resetPower(power) {
    power.active = false;
    power.activationTime = 0;
  }
}
