import { BuyableEnum } from 'core/shop/BuyableEnum';
import UnitCarrier from 'core/units/UnitCarrier';
import { Subject } from 'rxjs';
import GameScene from 'scenes/GameScene';

export default class UnitHandler {

    private carriers: UnitCarrier[] = [];
    public units$: Subject<number>;

    constructor (
        private scene: GameScene
    ) {
        this.units$ = new Subject<number>();
        this.init();

    }

    init (): void {
        let spawn = this.scene.buildingHandler.findAnyWarehouse();
        this.spawnCarrier(spawn.x, spawn.y);

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

            this.units$.next(this.carriers.length);
        });

        this.carriers.push(unit);

        return unit;
    }

    purchaseCarrier (): void {
        let price = this.scene.shop.prices[BuyableEnum.CARRIER];
        this.scene.shop.takeCoins(price);

        let spawn = this.scene.buildingHandler.findAnyWarehouse();

        this.spawnCarrier(spawn.x, spawn.y);
        this.units$.next(this.carriers.length);
    }

    getUnitCount (): number {
        return this.carriers.length;
    }

    private tick (): void {
        for (let unit of this.carriers) {
            unit.secondTick();
        }
    }
}
