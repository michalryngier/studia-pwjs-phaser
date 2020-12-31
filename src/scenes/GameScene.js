import 'phaser';
import Player from '../gameObjects/Player'
import PlatformGroup from "../gameObjects/PlatformGroup";
import PlatformPool from "../gameObjects/PlatformPool";
import highScoreService from '../services/HighScoreService';
import TextHelper from "../helpers/TextHelper";
import PowerObjectService from "../services/PowerObjectService";
import PowerObjectPool from "../gameObjects/PowerObjectPool";
import BackgroundPool from "../gameObjects/BackgroundPool";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        // global game options
        this.gameOptions = {
            platformStartSpeed: 350,
            spawnRange: [200, 450],
            platformSizeRange: [100, 300],
            playerGravity: 900,
            jumpForce: 400,
            playerStartPosition: 400,
            jumps: 2,
            powerLifetime: 9
        }
        this.nextPlatformDistance = 0;
        this.score = 0;
        this.timePlayed = 1;
        this.multiplier = 1;
        this.extraScore = 0;
    }

    create() {
        // console.log('GameScene');
        this.cameras.main.setBackgroundColor('#444444');

        // audio
        this.deadSound = this.sound.add('dead');
        this.jumpSound = this.sound.add('jump');
        this.flySound = this.sound.add('fly');
        this.collectSound = this.sound.add('collect');
        this.alert1Sound = this.sound.add('alert1');
        this.alert2Sound = this.sound.add('alert2');

        this.flySound.play({
            loop: true
        });

        // random platform color for each game
        let platformTextures = this.textures.get('platform');
        let frames = platformTextures.getFrameNames();
        this.platformKey = Phaser.Utils.Array.GetRandom(frames);

        // group with all active platforms.
        this.platformGroup = new PlatformGroup(this);

        // pool
        this.platformPool = new PlatformPool(this);
        this.backgroundPool = new BackgroundPool(this);

        // adding a platform to the game, the arguments are platform width and x position
        this.platformPool.addPlatform(this.game.config.width, this.game.config.width / 2);

        // adding the player;
        this.player = new Player(
          this,
          this.gameOptions.playerStartPosition,
          this.game.config.height / 2,
          'player',
          'ride'
        );
        this.player.setDepth(0.5);
        this.player.setGravityY(this.gameOptions.playerGravity);
        this.player.displayWidth = this.game.config.height * 0.2;
        this.player.displayHeight = this.game.config.height * 0.2;
        this.player.tryJump();

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);

        // power objects
        this.powerObjectPool = new PowerObjectPool(this);
        this.powerObjectService = new PowerObjectService(this);
        this.physics.add.overlap(
          this.player,
          this.powerObjectPool,
          (player, power) => {
              this.powerObjectService.addPower(player, power);
          },
          null,
          this
        );

        // SCORE TEXT
        this.scoreIndicator();

        // END GAME TEXT
        this.newHighScore();
        this.notHighScore();
        this.pauseButton();

        this.events.on('resume', () => {
            this.pauseButtonText.setVisible(true);
            this.scene.launch('PowersScene', { game: this });
        })

        this.scene.launch('PowersScene', { game: this });
    }

    update() {
        if (
          this.backgroundPool.getLength() === 0
          || this.backgroundPool.children['entries'][this.backgroundPool.getLength() - 1].body.x <= -2000
        ) {
            this.backgroundPool.addBackground();
        }
        if (this.player.alive) {
            this.backgroundPool.setVelocity(
              (this.multiplier * this.gameOptions.platformStartSpeed * -1) / 2
            );
            this.player.flying();
            this.powerObjectService.spawnPowerObject();
            this.player.checkPowerLifetime();
            // game over
            if (this.player.y > this.game.config.height) {
                this.gameOver();
            }
            this.player.x = this.gameOptions.playerStartPosition;
            if (this.player.powers.lowerGravity.active) {
                this.player.setGravityY(
                this.player.powers.lowerGravity.gravityMultiplier
                 * this.gameOptions.playerGravity
                 * this.multiplier
                );
            } else {
                this.player.setGravityY(this.gameOptions.playerGravity * this.multiplier);
            }

            // recycling platforms
            let minDistance = this.game.config.width;
            this.platformGroup.getChildren().forEach(function(platform){
                let platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
                minDistance = Math.min(minDistance, platformDistance);
                if (platform.x < - platform.displayWidth / 2) {
                    this.platformGroup.killAndHide(platform);
                    this.platformGroup.remove(platform);
                }
            }, this);

            // adding new platforms
            if (minDistance > this.nextPlatformDistance) {
                let nextPlatformWidth = Phaser.Math.Between(
                  this.gameOptions.platformSizeRange[0],
                  this.gameOptions.platformSizeRange[1]
                );
                this.platformPool.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2);
            }

            this.extraScore++;
            if (this.extraScore % 60 === 0) {
                this.multiplier = this.timePlayed <= 15
                  ? 1
                  : (Math.log2((this.timePlayed - 15) / 100 + 2)  <= 2.5
                    ? Math.log2((this.timePlayed - 15) / 100 + 2)
                    : 2.5);
                this.timePlayed++;
            }
            this.score = Math.floor(this.multiplier * this.timePlayed * 100) + this.extraScore;
            this.setScore(this.score);
        }
    }

    // TEXT AND BUTTONS

    scoreIndicator() {
        this.scoreText = TextHelper.createText(
          this,
          'TempestApacheOutlineBlue',
          '',
          100,
          true,
          0,
          -200
        ).setOrigin(0.5);
    }

    newHighScore() {
        this.newHighScoreText = TextHelper.createText(
          this,
          'TempestApacheRegularBlack',
          'New High Score!',
          72,
          true,
          0,
          -100
        ).setOrigin(0.5)
          .setVisible(false);
    }

    notHighScore() {
        this.notHighScoreText = TextHelper.createText(
          this,
          'TempestApacheRegularBlack',
          'Almost there!',
          72,
          true,
          0,
          -100
        ).setOrigin(0.5)
          .setVisible(false);

        this.toHighScoreText = TextHelper.createText(
          this,
          'TempestApacheRegularBlack',
          '',
          40,
          true,
          0,
          -50
        ).setOrigin(0.5)
          .setVisible(false);
    }

    pauseButton() {
        this.pauseButtonText = TextHelper.createText(
          this,
          "TempestApache3D",
          "| |",
          72,
          false,
          this.game.config.width - 100,
          50
        )
          .setInteractive()
          .on('pointerover', () => {
              this.pauseButtonText.setFont('TempestApache3DRed');
              document.getElementsByTagName("body")[0].style.cursor = "pointer";
          })
          .on('pointerout', () => {
              this.pauseButtonText.setFont('TempestApache3D');
              document.getElementsByTagName("body")[0].style.cursor = "default";
          })
          .on('pointerup', () => {
              document.getElementsByTagName("body")[0].style.cursor = "default";
              this.pauseButtonText.setVisible(false);
              this.scene.stop('PowersScene');
              this.scene.launch('PauseGameScene');
              this.scene.pause();
          });
    }

    // GAME OVER, SCORE, CAMERA SHAKE AND RESET

    gameOver() {
        this.player.alive = false;
        let isHighScore = highScoreService.checkHighScore(this.score);
        // SHOW END GAME TEXT DEPENDING ON PLAYER SCORE
        if (isHighScore) {
            this.scoreText.setFont('TempestApache3DGold', 140);
            this.newHighScoreText.setVisible(true);
        } else {
            this.scoreText.setFont('TempestApache3DRed', 140);
            this.notHighScoreText.setVisible(true);
            this.toHighScoreText.setText(
              `get ${highScoreService.getHighScore() - this.score + 1} more for a new high score`
            )
            this.toHighScoreText.setVisible(true);
        }
        this.cameraShake();
        this.scene.stop('PowersScene');
        this.deadSound.play();
        this.pauseButtonText.setVisible(false);
        this.game.scene.start('PauseGameScene');
    }


    cameraShake() {
        this.cameras.main.shake(200, 0.2);
    }

    resetScene() {
        this.nextPlatformDistance = 0;
        this.timePlayed = 1;
        this.multiplier = 1;
        this.score = 0;
        this.extraScore = 0;
    }

    setScore(score) {
        this.scoreText.setText(score);
    }
}
