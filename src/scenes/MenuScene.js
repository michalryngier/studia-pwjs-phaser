import 'phaser';
import highScoreService from '../services/HighScoreService';
import TextHelper from "../helpers/TextHelper";

export default class MenuScene extends Phaser.Scene
{
    constructor ()
    {
        super('MenuScene');
    }
    create ()
    {
        this.cameras.main.setBackgroundColor('#444444');

        let backgroundMusic = this.sound.add('stardust');
        backgroundMusic.play({
            loop: true
        });
        let background = this.add.image(0, -100, 'background').setOrigin(0,0).setScale(0.5, 0.5);

        this.title1 = TextHelper.createText(
          this,
          'TempestApache3DBlue',
          'NightCity',
          120,
          true,
          0,
          -300
        ).setOrigin(0.5);

        this.title2 = TextHelper.createText(
          this,
          'TempestApache3DRed',
          'Surfer',
          140,
          true,
          0,
          -200
        ).setOrigin(0.5);

        this.highScore = TextHelper.createText(
          this,
          'TempestApacheOutlineGold',
          `High Score: ${highScoreService.getHighScore()}`,
          50,
          true,
          0,
          300
        ).setOrigin(0.5);

        // PLAY BUTTON
        this.playButton = TextHelper.createText(
          this,
          'TempestApacheRegularBlack',
          'Play',
          100,
          true,
          0,
          0
        )
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
              this.playButton.setFont('TempestApacheRegularBlue');
              document.getElementsByTagName("body")[0].style.cursor = "pointer";
          })
          .on('pointerout', () => {
              this.playButton.setFont('TempestApacheRegularBlack');
              document.getElementsByTagName("body")[0].style.cursor = "default";
          })
          .on('pointerup', () => {
              document.getElementsByTagName("body")[0].style.cursor = "default";
              backgroundMusic.stop();
              this.scene.start('GameScene');
          });


        // HOW TO PLAY BUTTON
        this.howToPlay = TextHelper.createText(
          this,
          'TempestApacheRegularBlack',
          'How to play',
          50,
          true,
          0,
          150
        )
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
              this.howToPlay.setFont('TempestApacheRegularBlue');
              document.getElementsByTagName("body")[0].style.cursor = "pointer";
          })
          .on('pointerout', () => {
              this.howToPlay.setFont('TempestApacheRegularBlack');
              document.getElementsByTagName("body")[0].style.cursor = "default";
          })
          .on('pointerup', () => {
              document.getElementsByTagName("body")[0].style.cursor = "default";
              this.scene.start('HowToPlayScene');
          });

        // CREDITS BUTTON
        this.creditsButton = TextHelper.createText(
          this,
          'TempestApacheRegularBlack',
          'Credits',
          50,
          true,
          0,
          200
        )
          .setOrigin(0.5)
          .setInteractive()
          .on('pointerover', () => {
              this.creditsButton.setFont('TempestApacheRegularBlue');
              document.getElementsByTagName("body")[0].style.cursor = "pointer";
          })
          .on('pointerout', () => {
              this.creditsButton.setFont('TempestApacheRegularBlack');
              document.getElementsByTagName("body")[0].style.cursor = "default";
          })
          .on('pointerup', () => {
              document.getElementsByTagName("body")[0].style.cursor = "default";
              this.scene.start('CreditsScene');
          });
    }
}
