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

        // BITMAP FONTS

        // 3D with no shadow
        this.load.bitmapFont(
          'TempestApache3D',
          './assets/fonts/3d-without-shadow/font.png',
          './assets/fonts/3d-without-shadow/font.fnt'
        );

        // 3D with red shadow
        this.load.bitmapFont(
          'TempestApache3DRed',
          './assets/fonts/3d-shadow-red/font.png',
          './assets/fonts/3d-shadow-red/font.fnt'
        );

        // 3D with gold shadow
        this.load.bitmapFont(
          'TempestApache3DGold',
          './assets/fonts/3d-shadow-gold/font.png',
          './assets/fonts/3d-shadow-gold/font.fnt'
        );

        // 3D with blue shadow
        this.load.bitmapFont(
          'TempestApache3DBlue',
          './assets/fonts/3d-shadow-blue/font.png',
          './assets/fonts/3d-shadow-blue/font.fnt'
        );

        // Outline with blue shadow
        this.load.bitmapFont(
          'TempestApacheOutlineBlue',
          './assets/fonts/outline-shadow-blue/font.png',
          './assets/fonts/outline-shadow-blue/font.fnt'
        );

        // Outline with gold shadow
        this.load.bitmapFont(
          'TempestApacheOutlineGold',
          './assets/fonts/outline-shadow-gold/font.png',
          './assets/fonts/outline-shadow-gold/font.fnt'
        );

        // Gradual with blue shadow
        this.load.bitmapFont(
          'TempestApacheGradualBlue',
          './assets/fonts/gradual-shadow-blue/font.png',
          './assets/fonts/gradual-shadow-blue/font.fnt'
        );

        // Regular with black shadow
        this.load.bitmapFont(
          'TempestApacheRegularBlack',
          './assets/fonts/regular-shadow-black/font.png',
          './assets/fonts/regular-shadow-black/font.fnt'
        );

        // Regular with blue shadow
        this.load.bitmapFont(
          'TempestApacheRegularBlue',
          './assets/fonts/regular-shadow-blue/font.png',
          './assets/fonts/regular-shadow-blue/font.fnt'
        );

        /*
        * #FBCA4F - gold
        * #3bc5de - blue
        * #e93354 - red
        * */
    }

    create ()
    {
        console.log('LoadingScene');
        this.game.scene.start('SplashScene');
    }

    onLoadProgress(progress) {
        console.debug(`${Math.round(progress * 100)}%`);
    }
}