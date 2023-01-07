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
        this.load.setPath('assets/images/develop');
        this.load.image('bakery', 'bakery.png');
        this.load.image('farm', 'farm.png');
        this.load.image('inn', 'inn.png');
        this.load.image('mill', 'mill.png');
        this.load.image('warehouse', 'storehouse.png');
        this.load.image('carrier', 'carrier.png');
        this.load.image('wheat', 'wheat.png');
        this.load.image('flour', 'flour.png');
        this.load.image('bread', 'bread.png');
        this.load.image('pathway', 'pathway.png');


        this.load.setPath('assets/images');
        const settings = { frameWidth: 16, frameHeight: 16 };
        this.load.spritesheet('tiles8', 'tiles8.png', settings);
        this.load.spritesheet('tiles16', 'tiles16.png', settings);

        this.load.setPath('assets/images/develop');
        const settings2 = { frameWidth: 32, frameHeight: 32 };
        this.load.spritesheet('pathwayTileset', 'pathwayTileset.png', settings2);
    }

    private startGame (): void {
        this.scene.start('GameScene', {});
    }
}
