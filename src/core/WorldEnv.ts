import GameConfig from 'config/GameConfig';
import NumberHelpers from 'helpers/NumberHelpers';
import GameScene from 'scenes/GameScene';
import Vector2 = Phaser.Math.Vector2;
import Image = Phaser.GameObjects.Image;

export default class WorldEnv {

    public smallBushes: Image[] = [];
    public bushes: Image[] = [];
    public stones: Image[] = [];
    public rocks: Image[] = [];

    constructor (
        private scene: GameScene
    ) {
        this.generateGreenDots();
        this.generateGrass();
        this.generateStonky();
        this.generateSmallbush();
        this.generateBush();
        this.generateRocks();
        // let bg = this.scene.add.image(0, 0, 'background')
        //     .setOrigin(0, 0)
        //     .setDepth(Depths.BG_TEXTURE);
        // bg.setInteractive();
        // bg.on('pointerdown', () => {
        //     if (this.scene.input.activePointer.downElement.localName !== 'canvas') {
        //         return;
        //     }
        //     // this.scene.events.emit(Events.CLOSE_ALL_MODALS);
        // });
    }

    private generateGreenDots (): void {
        for (let i = 0; i < 100; i++) {
            let spawn = this.generateRandomPos();
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/grassDot' + NumberHelpers.randomIntInRange(1, 8));
        }
    }

    private generateStonky (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/stonky' + NumberHelpers.randomIntInRange(1, 2));
        }
    }

    private generateGrass (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/grass' + NumberHelpers.randomIntInRange(1, 2));
        }
    }

    private generateSmallbush (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/smallbush' + NumberHelpers.randomIntInRange(1, 3));
            this.smallBushes.push(img);
        }
    }

    private generateBush (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/bush' + NumberHelpers.randomIntInRange(1, 4));
            this.bushes.push(img);
        }
    }

    private generateRocks (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/rock' + NumberHelpers.randomIntInRange(1, 4));
            this.rocks.push(img);
        }
    }


    private generateRandomPos (): Vector2 {
        return new Vector2(
            NumberHelpers.randomIntInRange(0, GameConfig.World.size.width),
            NumberHelpers.randomIntInRange(0, GameConfig.World.size.height)
        );
    }
}
