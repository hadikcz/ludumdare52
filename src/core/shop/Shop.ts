import BuildingShopBuilder from 'core/building/BuildingShopBuilder';
import { BuyableEnum } from 'core/shop/BuyableEnum';
import { Events } from 'enums/Events';
import { Subject } from 'rxjs';
import GameScene from 'scenes/GameScene';

export default class Shop {


    public readonly coins$: Subject<number>;
    public coins: number = 30;
    public readonly prices: number[] = [];


    constructor (
        private scene: GameScene
    ) {
        this.coins$ = new Subject<number>();
        this.scene.events.on(Events.UI_SHOP_TRY_PURCHASE, this.uiTryPurchase.bind(this));

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

    canPurchase (buyable: BuyableEnum): boolean {
        let price = this.prices[buyable];

        return this.coins >= price;
    }


    private uiTryPurchase (buyable: BuyableEnum) {
        if (!this.canPurchase(buyable)) {
            console.log('Can not purchase ' + buyable + ' becuase not enoght coiuns');
            return;
        }
        if (buyable === BuyableEnum.CARRIER) {
            this.scene.unitHandler.purchaseCarrier();
            console.log('TODO purchase of carrier');

            return;
        }

        let building = BuildingShopBuilder.translateBuyableToBuilding(buyable);

        // @TODO: CHECK if can pruchase it (coins);
        this.scene.builder.startBuild(building);
    }
}
