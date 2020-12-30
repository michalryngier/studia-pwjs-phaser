import TextHelper from "../helpers/TextHelper";

export default class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super('HowToPlayScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#444444');
    let background = this.add.image(0, -100, 'background').setOrigin(0,0).setScale(0.5, 0.5);

    // Credits
    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'How to play',
      80,
      true,
      0,
      -300
    ).setOrigin(0.5);

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'LMB to jump, that is all you need to know',
      40,
      true,
      0,
      -100
    ).setOrigin(0.5);

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Collectable powers',
      50,
      true,
      0,
      0
    ).setOrigin(0.5);

    let lowerGravityIcon = this.physics.add.staticImage(100, 500, 'lowerGravityIcon');
    lowerGravityIcon.displayHeight = 75;
    lowerGravityIcon.displayWidth = 75;

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Reduces gravity by 25%',
      40,
      false,
      400,
      500
    ).setOrigin(0.5);

    let tripleJumpIcon = this.physics.add.staticImage(700, 500, 'tripleJumpIcon');
    tripleJumpIcon.displayHeight = 75;
    tripleJumpIcon.displayWidth = 75;

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Gives you a triple jump',
      40,
      false,
      992,
      500
    ).setOrigin(0.5);


    this.backButton = TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Back',
      50,
      true,
      0,
      300
    )
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.backButton.setFont('TempestApacheRegularBlue');
        document.getElementsByTagName("body")[0].style.cursor = "pointer";
      })
      .on('pointerout', () => {
        this.backButton.setFont('TempestApacheRegularBlack');
        document.getElementsByTagName("body")[0].style.cursor = "default";
      })
      .on('pointerup', () => {
        document.getElementsByTagName("body")[0].style.cursor = "default";
        this.scene.start('MenuScene');
      });
  }
}