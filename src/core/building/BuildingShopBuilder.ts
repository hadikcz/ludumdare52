import BuildingHandler from 'core/building/BuildingHandler';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { BuyableEnum } from 'core/shop/BuyableEnum';
import GameScene from 'scenes/GameScene';

export default class BuildingShopBuilder {

    constructor (
        private scene: GameScene,
        private buildingHandler: BuildingHandler
    ) {
    }

    purchaseBuilding (x: number, y: number, building: BuildingsEnum): boolean {
        let buyable = BuildingShopBuilder.translateBuildingToBuyable(building);
        if (!this.scene.shop.canPurchase(buyable)) {
            console.info('Building can not be build because coins');
            return false;
        }

        let placedBuilding = this.buildingHandler.spawnBuilding(x, y, building);

        if (!placedBuilding) {
            console.error('Building spawn failed');
            return false;
        }

        let price = this.scene.shop.prices[buyable];
        this.scene.shop.takeCoins(price);
        return true;
    }

    public static translateBuildingToBuyable (building: BuildingsEnum): BuyableEnum {
        switch (building) {
            case BuildingsEnum.FARM:
                return BuyableEnum.FARM;
            case BuildingsEnum.MILL:
                return BuyableEnum.MILL;
            case BuildingsEnum.BAKERY:
                return BuyableEnum.BAKERY;
            case BuildingsEnum.INN:
                return BuyableEnum.INN;
            case BuildingsEnum.WAREHOUSE:
                return BuyableEnum.WAREHOUSE;
            default:
                throw new Error('Can not translate buiilding ' + building);
        }
    }

    public static translateBuyableToBuilding (buyable: BuyableEnum): BuildingsEnum {
        switch (buyable) {
            case BuyableEnum.FARM:
                return BuildingsEnum.FARM;
            case BuyableEnum.MILL:
                return BuildingsEnum.MILL;
            case BuyableEnum.BAKERY:
                return BuildingsEnum.BAKERY;
            case BuyableEnum.INN:
                return BuildingsEnum.INN;
            case BuyableEnum.WAREHOUSE:
                return BuildingsEnum.WAREHOUSE;
            default:
                throw new Error('Can not translate buiilding ' + buyable);
        }
    }
}
