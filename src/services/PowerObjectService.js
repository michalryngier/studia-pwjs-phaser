export default class PowerObjectService {
  constructor(game) {
    this.game = game;
    this.lastSpawnTime = 0;
  }

  /**
  * Counts probability of spawning any power object
  * @param {integer} timePlayer
  * */
  countProbability(timePlayed) {
    if (this.getRand() <= 5 && timePlayed % 5 === 0 && timePlayed !== this.lastSpawnTime) {
      this.lastSpawnTime = timePlayed;
      return true
    }
  }

  spawnPowerObject() {
    if (this.countProbability(this.game.timePlayed) === true) {
      this.drawAndSpawnObject();
    }
  }

  drawAndSpawnObject() {
    if (this.getRand() <= 40 && (
      this.game.player.hasActivePower() === false
      || this.game.player.activePowerRemainingTime() <= 1
      || this.game.player.powers.tripleJump.active === true
    )) {
      // spawn lower gravity
      this.game.powerObjectPool.addPowerObject(this.game.powerObjectPool.LOWER_GRAVITY_KEY);
    } else if (this.getRand() > 40 && (
      this.game.player.hasActivePower() === false
      || this.game.player.activePowerRemainingTime() <= 1
      || this.game.player.powers.lowerGravity.active === true
    )) {
      // spawn triple jump
      this.game.powerObjectPool.addPowerObject(this.game.powerObjectPool.TRIPLE_JUMP_KEY);
    }
  }

  getRand() {
    return Math.floor(Math.random() * 100 + 1);
  }

  addPower(player, power) {
    let key = power.texture.key;
    switch (key) {
      case this.game.powerObjectPool.TRIPLE_JUMP_KEY:
        // console.log("collected triple jump");
        player.addTripleJumpPower();
        break;
      case this.game.powerObjectPool.LOWER_GRAVITY_KEY:
        // console.log("collected lower gravity");
        player.addLowerGravityPower();
        break;
    }
    this.game.collectSound.play();
    power.destroy();;
  }
}