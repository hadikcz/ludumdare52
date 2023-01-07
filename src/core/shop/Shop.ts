import { BuyableEnum } from 'core/shop/BuyableEnum';
import { Subject } from 'rxjs';
import GameScene from 'scenes/GameScene';

export default class Shop {


    public readonly coins$: Subject<number>;
    public coins: number = 0;
    public readonly prices: number[] = [];


    constructor (
        private scene: GameScene
    ) {
        this.coins$ = new Subject<number>();

        this.scene.time.addEvent({
            repeat: Infinity,
            delay: 100,
            callbackScope: this,
            callback: () => {
                this.addCoins(2);
            }
        });

        this.prices[BuyableEnum.CARRIER] = 2;
        this.prices[BuyableEnum.FARM] = 2;
        this.prices[BuyableEnum.MILL] = 2;
        this.prices[BuyableEnum.BAKERY] = 2;
        this.prices[BuyableEnum.INN] = 2;
        this.prices[BuyableEnum.WAREHOUSE] = 2;
    }

    addCoins (coins: number): void {
        this.coins += Math.abs(coins);
        this.coins$.next(this.coins);
    }

    takeCoins (coins: number): boolean {
        if (this.coins < coins) {
            return false;
        }

        this.coins -= Math.abs(coins);
        this.coins$.next(this.coins);

        return true;
    }
}
