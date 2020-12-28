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
              this.scene.stop();
              this.scene.start('GameScene');
          });
    }
}
