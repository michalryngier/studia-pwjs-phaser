import 'phaser';

export default class LoadingScene extends Phaser.Scene
{
    constructor ()
    {
        super('LoadingScene');
    }
    preload() {
        this.load.image('platform', './assets/images/platform.png');
        this.load.image('player', './assets/images/player.png');
    }

    create ()
    {
        console.log('LoadingScene');
        this.game.scene.start('SplashScene');
    }
}