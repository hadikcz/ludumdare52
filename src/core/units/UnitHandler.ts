import UnitCarrier from 'core/units/UnitCarrier';
import GameScene from 'scenes/GameScene';

export default class UnitHandler {
    private carriers!: Phaser.GameObjects.Group;

    constructor (
        private scene: GameScene
    ) {
        this.init();
    }

    init (): void {
        this.carriers = this.scene.add.group();

        this.spawnCarrier(100, 100);
    }

    spawnCarrier (x: number, y: number): UnitCarrier {
        let unit = new UnitCarrier(this.scene, x, y);

        this.carriers.add(unit);

        return unit;
    }
}
