import TextHelper from "../helpers/TextHelper";

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('CreditsScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#444444');
    let background = this.add.image(0, -100, 'background').setOrigin(0,0).setScale(0.5, 0.5);

    // Credits
    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Credits',
      80,
      true,
      0,
      -300
    ).setOrigin(0.5);

    // Programming
    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Programming',
      40,
      true,
      -350,
      -150
    ).setOrigin(0.5);

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Michael Ryngier',
      40,
      true,
      350,
      -150
    ).setOrigin(0.5);

    // Graphics design
    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Graphics design',
      40,
      true,
      -350,
      -100
    ).setOrigin(0.5);

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Michael Ryngier',
      40,
      true,
      350,
      -100
    ).setOrigin(0.5);

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Background by vectorpocket' +
      '\n          www.freepik.com',
      25,
      true,
      350,
      -65
    ).setOrigin(0.5);


    // Music and sound effects
    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'Music and sound effects',
      40,
      true,
      0,
      -20
    ).setOrigin(0.5);

    TextHelper.createText(
      this,
      'TempestApacheRegularBlack',
      'http://ccmixter.org/:\n' +
      '  Karstenholymoly - Stardust (Ziggy is coming)' +
      '\n\nhttps://freesound.org/:' +
      '\n  Robinhood76 - SPACE fiction sound effects' +
      '\n  Temp6754 - Jump, Climb or Damage Sound (F)' +
      '\n  Karas_Homemade_SFX - Calm Wind' +
      '\n  OwlStorm - Retro video game sfx - Collect 5' +
      '\n  Beetlemuse - Alert (1), Alert (2)',
      30,
      true,
      0,
      120
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