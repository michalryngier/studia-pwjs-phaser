import TextHelper from "../helpers/TextHelper";

export default class PowersScene extends Phaser.Scene {
  constructor() {
    super('PowersScene');
  }

  init(data) {
    this.gameData = data.game
  }

  create() {
    this.lowerGravityIndicator = this.physics.add.staticImage(
      TextHelper.screenCenter(this).x - 50,
      TextHelper.screenCenter(this).y - 100,
      'lowerGravityIndicator'
    )
    this.tripleJumpIndicator = this.physics.add.staticImage(
      TextHelper.screenCenter(this).x + 50,
      TextHelper.screenCenter(this).y - 100,
      'tripleJumpIndicator'
    )

    this.tripleJumpText = TextHelper.createText(
      this,
      'TempestApache3D',
      '9',
      45,
      true,
      50,
      -100
    ).setOrigin(0.5);
    this.lowerGravityText = TextHelper.createText(
      this,
      'TempestApache3D',
      '9',
      45,
      true,
      -50,
      -100
    ).setOrigin(0.5);

    this.lowerGravityIndicator.displayWidth = 75;
    this.lowerGravityIndicator.displayHeight = 75;
    this.tripleJumpIndicator.displayWidth = 75;
    this.tripleJumpIndicator.displayHeight = 75;
  }

  update() {
    // set indicators positions
    if (this.gameData.player.powers.tripleJump.active && this.gameData.player.powers.lowerGravity.active === false) {
      this.tripleJumpIndicator.x = TextHelper.screenCenter(this).x;
      this.tripleJumpText.setX(TextHelper.screenCenter(this).x);
    } else if (
      this.gameData.player.powers.lowerGravity.active && this.gameData.player.powers.tripleJump.active === false
    ) {
      this.lowerGravityIndicator.x = TextHelper.screenCenter(this).x;
      this.lowerGravityText.setX(TextHelper.screenCenter(this).x);
    } else {
      this.lowerGravityIndicator.x = TextHelper.screenCenter(this).x - 50;
      this.lowerGravityText.setX(TextHelper.screenCenter(this).x - 50) ;
      this.tripleJumpIndicator.x = TextHelper.screenCenter(this).x + 50;
      this.tripleJumpText.setX(TextHelper.screenCenter(this).x + 50);
    }

    // turn visibility of indicators and text
    this.tripleJumpIndicator.visible = this.gameData.player.powers.tripleJump.active === true;
    this.tripleJumpText.visible = this.gameData.player.powers.tripleJump.active === true;

    this.lowerGravityIndicator.visible = this.gameData.player.powers.lowerGravity.active === true;
    this.lowerGravityText.visible = this.gameData.player.powers.lowerGravity.active === true;


    // change text value
    let lowerGravityTimeLeft = this.gameData.gameOptions.powerLifetime - Math.abs(
      this.gameData.player.powers.lowerGravity.activationTime - this.gameData.timePlayed
    );
    let tripleJumpTimeLeft = this.gameData.gameOptions.powerLifetime - Math.abs(
      this.gameData.player.powers.tripleJump.activationTime - this.gameData.timePlayed
    );

    this.lowerGravityText.setText(lowerGravityTimeLeft);
    this.tripleJumpText.setText(tripleJumpTimeLeft);

    // change font
    if (lowerGravityTimeLeft <= 3) {
      this.lowerGravityText.setFont('TempestApache3DRed');
    } else {
      this.lowerGravityText.setFont('TempestApache3DBlue');
    }
    if (tripleJumpTimeLeft <= 3) {
      this.tripleJumpText.setFont('TempestApache3DRed');
    } else {
      this.tripleJumpText.setFont('TempestApache3DBlue');
    }
  }
}