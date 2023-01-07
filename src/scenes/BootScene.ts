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

        const settings = { frameWidth: 16, frameHeight: 16 };
        // this.load.spritesheet('xxx', 'xxx.png', settings);
    }

    private startGame (): void {
        this.scene.start('GameScene', {});
    }
}
