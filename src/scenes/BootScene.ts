import 'phaser';

declare let window: any;

export default class BootScene extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene', plugins: ['Loader'] });
    }

    preload (): void {
        window.bootScene = this;
        this.sys.scale.refresh();

        const progress = this.add.graphics();
        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height as number / 2, this.sys.game.config.width as number * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.startGame();
        }, this);

        // LOAD assets HERE
        this.load.setPath('assets/images');
        this.load.image('pathway', 'pathwayTileset.png');


        this.load.setPath('assets/images');
        // this.load.atlas('game', 'game.png', 'game.json');
        this.load.atlas('game', 'game_atlas.png', 'game_atlas.json');


        this.load.setPath('assets/images');
        let settings = { frameWidth: 16, frameHeight: 16 };
        this.load.spritesheet('tiles8', 'tiles8.png', settings);
        this.load.spritesheet('tiles16', 'tiles16.png', settings);

        settings = { frameWidth: 36, frameHeight: 36 };
        this.load.spritesheet('character1', 'character1.png', settings);
        this.load.spritesheet('character2', 'character2.png', settings);

        this.load.setPath('assets/images');
        const settings2 = { frameWidth: 32, frameHeight: 32 };
        this.load.spritesheet('pathwayTileset', 'pathwayTileset.png', settings2);


    }

    private startGame (): void {
        this.scene.start('GameScene', {});
    }
}
