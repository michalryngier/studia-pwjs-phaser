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
            spawnRange: [100, 350],
            platformSizeRange: [50, 250],
            playerGravity: 900,
            jumpForce: 400,
            playerStartPosition: 400,
            jumps: 2
        }
    }

    create() {
        // console.log('GameScene');
        this.cameras.main.setBackgroundColor('#444444');

        // group with all active platforms.
        this.platformGroup = new PlatformGroup(this);

        // pool
        this.platformPool = new PlatformPool(this);

        // number of consecutive jumps made by the player
        this.playerJumps = 0;

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
    }

    update() {
        // game over
        if (this.player.y > this.game.config.height) {
            this.scene.start("GameScene");
        }
        this.player.x = this.gameOptions.playerStartPosition;

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
        this.player.tryJump();
    }
}
