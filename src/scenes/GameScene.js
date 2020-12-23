import 'phaser';
import Platform from '../gameObjects/Platform'
import Player from '../gameObjects/Player'
import PlatformGroup from "../gameObjects/PlatformGroup";
import PlatformPool from "../gameObjects/PlatformPool";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        // global game options
        this.gameOptions = {
            platformStartSpeed: 350,
            spawnRange: [150, 400],
            platformSizeRange: [100, 300],
            playerGravity: 900,
            jumpForce: 400,
            playerStartPosition: 400,
            jumps: 2
        }
        this.score = 0;
        this.timePlayed = 1;
        this.multiplier = 1;
        this.extraScore = 0;
    }

    create() {
        // console.log('GameScene');
        this.cameras.main.setBackgroundColor('#444444');

        // group with all active platforms.
        this.platformGroup = new PlatformGroup(this);

        // pool
        this.platformPool = new PlatformPool(this);

        // adding a platform to the game, the arguments are platform width and x position
        this.platformPool.addPlatform(this.game.config.width, this.game.config.width / 2);

        // adding the player;
        this.player = new Player(
          this,
          this.gameOptions.playerStartPosition,
          this.game.config.height / 2,
          'player'
        );
        this.player.setGravityY(this.gameOptions.playerGravity);

        // setting collisions between the player and the platform group
        this.physics.add.collider(this.player, this.platformGroup);

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 4;
        this.scoreText = this.add.text(screenCenterX, screenCenterY, '0', {
            fontFamily: 'tempestOutline',
            fontSize: '100px'
        }).setOrigin(0.5);

        // reset and set time counter
        this.reset = true;
        this.setScore(0);
        setTimeout(() => {
            this.reset = false;
            this.counter();
        }, 1000)
    }

    update() {
        // game over
        if (this.player.y > this.game.config.height) {
            this.timePlayed = 1;
            this.multiplier = 1;
            this.score = 0;
            this.extraScore = 0;
            this.scene.start("GameScene");
        }
        this.player.x = this.gameOptions.playerStartPosition;
        this.player.setGravityY(this.gameOptions.playerGravity * this.multiplier);

        // recycling platforms
        if (this.player.alive) {
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
        }
        this.player.tryJump();
    }

    counter() {
        if (this.reset === false && this.player.alive) {
            setTimeout(() => {
                this.extraScore++;
                if (this.extraScore % 100 === 0) {
                    this.multiplier = this.timePlayed <= 15
                      ? 1
                      : (Math.log2((this.timePlayed - 15) / 100 + 2)  <= 2.5
                        ? Math.log2((this.timePlayed - 15) / 100 + 2)
                        : 2.5);

                    this.timePlayed++;
                }
                this.score = Math.floor(this.multiplier * this.timePlayed * 100) + this.extraScore;
                this.setScore(this.score);
                this.counter();
            }, 10);
        }
    }

    setScore(score) {
        this.scoreText.setText(score);
    }
}
