import 'phaser';
import highScoreService from '../services/HighScoreService';
import TextHelper from "../helpers/TextHelper";

export default class PauseGameScene extends Phaser.Scene {
  constructor() {
    super('PauseGameScene');
  }

  create() {
    // SHOW BUTTONS (MENU PAUSE AND RETRY)
    this.gameScene = this.scene.get('GameScene');
    this.buttons();
  }

  buttons() {
    let menuBtn = {
      font: 'TempestApacheRegularBlack',
      text: 'Menu',
      yVertex: 150,
      size: 90
    };
    let restartBtn = {
      font: 'TempestApacheRegularBlack',
      text: 'Restart',
      yVertex: 150,
      size: 90
    }
    let resumeBtn = {
      font: 'TempestApacheRegularBlack',
      text: 'Resume',
      yVertex: 150,
      size: 90
    }
    let buttons;
    if (this.gameScene.player.alive) {
      buttons = TextHelper.createTwoLinedTexts(this, menuBtn, resumeBtn);
      this.resumeButtonText = buttons[1];
      this.resumeButton();
    } else {
      buttons = TextHelper.createTwoLinedTexts(this, menuBtn, restartBtn);
      this.retryButtonText = buttons[1];
      this.retryButton();
    }
    this.mainMenuButtonText = buttons[0];
    this.mainMenuButton();
  }

  mainMenuButton() {
    this.mainMenuButtonText
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.mainMenuButtonText.setFont('TempestApacheRegularBlue');
        document.getElementsByTagName("body")[0].style.cursor = "pointer";
      })
      .on('pointerout', () => {
        this.mainMenuButtonText.setFont('TempestApacheRegularBlack');
        document.getElementsByTagName("body")[0].style.cursor = "default";
      })
      .on('pointerup', () => {
        this.resetGameScene();
        document.getElementsByTagName("body")[0].style.cursor = "default";
        this.game.scene.stop('GameScene');
        this.scene.start('MenuScene');
      })
  }

  resumeButton() {
    this.resumeButtonText
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.resumeButtonText.setFont('TempestApacheRegularBlue');
        document.getElementsByTagName("body")[0].style.cursor = "pointer";
      })
      .on('pointerout', () => {
        this.resumeButtonText.setFont('TempestApacheRegularBlack');
        document.getElementsByTagName("body")[0].style.cursor = "default";
      })
      .on('pointerup', () => {
        document.getElementsByTagName("body")[0].style.cursor = "default";
        this.scene.stop();
        this.gameScene.scene.resume();
      })
  }

  retryButton() {
    this.retryButtonText
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerover', () => {
        this.retryButtonText.setFont('TempestApacheRegularBlue');
        document.getElementsByTagName("body")[0].style.cursor = "pointer";
      })
      .on('pointerout', () => {
        this.retryButtonText.setFont('TempestApacheRegularBlack');
        document.getElementsByTagName("body")[0].style.cursor = "default";
      })
      .on('pointerup', () => {
        document.getElementsByTagName("body")[0].style.cursor = "default";
        this.scene.stop();
        this.gameScene.resetScene();
        this.gameScene.scene.restart();
      })
  }

  resetGameScene() {
    this.gameScene.resetScene();
  }


}