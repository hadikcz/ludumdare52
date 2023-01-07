import UnitCarrier from 'core/units/UnitCarrier';
import GameScene from 'scenes/GameScene';

export default class UnitHandler {

    private carriers: UnitCarrier[] = [];

    constructor (
        private scene: GameScene
    ) {
        this.init();
    }

    init (): void {
        this.spawnCarrier(100, 100);

        this.scene.time.addEvent({
            delay: 1000,
            repeat: Infinity,
            callbackScope: this,
            callback: () => {this.tick();}
        });
    }

    spawnCarrier (x: number, y: number): UnitCarrier {
        let unit = new UnitCarrier(this.scene, x, y);

        unit.on('destroy', () => {
            console.log('DIED handled');
            let i = this.carriers.indexOf(unit);
            this.carriers.splice(i, 1);
        });

        this.carriers.push(unit);

        return unit;
    }

    private tick (): void {
        for (let unit of this.carriers) {
            unit.secondTick();
        }
    }
}
