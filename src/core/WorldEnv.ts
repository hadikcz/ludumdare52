import GameConfig from 'config/GameConfig';
import NumberHelpers from 'helpers/NumberHelpers';
import GameScene from 'scenes/GameScene';
import Vector2 = Phaser.Math.Vector2;
import Image = Phaser.GameObjects.Image;
import { Depths } from 'enums/Depths';

export default class WorldEnv {

    public smallBushes: Image[] = [];
    public bushes: Image[] = [];
    public rocks: Image[] = [];
    public ponds: Image[] = [];

    constructor (
        private scene: GameScene
    ) {
        this.generateGreenDots();
        this.generateGrass();
        this.generateStonky();
        this.generateSmallbush();
        this.generateBush();
        this.generateRocks();
        this.generatePonds();
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
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/grassDot' + NumberHelpers.randomIntInRange(1, 8)).setDepth(Depths.DECOR_GREEN_DOTS);
        }
    }

    private generateStonky (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/stonky' + NumberHelpers.randomIntInRange(1, 2)).setDepth(Depths.DECOR_STONKY);
        }
    }

    private generateGrass (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/grass' + NumberHelpers.randomIntInRange(1, 2)).setDepth(Depths.DECOR_GRASS);
        }
    }

    private generateSmallbush (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/smallbush' + NumberHelpers.randomIntInRange(1, 3)).setDepth(Depths.DECOR_SMALLBUSH);
            this.smallBushes.push(img);
        }
    }

    private generateBush (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/bush' + NumberHelpers.randomIntInRange(1, 4)).setDepth(Depths.DECOR_BUSH);
            this.bushes.push(img);
        }
    }

    private generateRocks (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/rock' + NumberHelpers.randomIntInRange(1, 4)).setDepth(Depths.DECOR_ROCKS);
            this.rocks.push(img);
        }
    }

    private generatePonds (): void {
        for (let i = 0; i < 40; i++) {
            let spawn = this.generateRandomPos();
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/pond' + NumberHelpers.randomIntInRange(1, 2)).setDepth(Depths.DECOR_PONDS);
            this.ponds.push(img);
        }
    }


    private generateRandomPos (): Vector2 {
        return new Vector2(
            NumberHelpers.randomIntInRange(0, GameConfig.World.size.width),
            NumberHelpers.randomIntInRange(0, GameConfig.World.size.height)
        );
    }
}
