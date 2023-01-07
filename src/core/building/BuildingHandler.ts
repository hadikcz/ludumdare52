import AbstractBuilding from 'core/building/AbstractBuilding';
import BuildingBakery from 'core/building/BuildingBakery';
import BuildingFarm from 'core/building/BuildingFarm';
import BuildingInn from 'core/building/BuildingInn';
import BuildingMill from 'core/building/BuildingMill';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import GameScene from 'scenes/GameScene';

export default class BuildingHandler {

    public static readonly DEFAULT_STORAGE = 5;
    public buildings: AbstractBuilding[] = [];

    public findBuilding;
    public findBuildingTo;
    constructor (
        private scene: GameScene
    ) {
        this.init();

        this.scene.time.addEvent({
            repeat: Infinity,
            delay: 1000,
            callbackScope: this,
            callback: () => {
                this.cycle();
            }
        });
    }

    public cycle (): void {
        this.buildings.forEach((buildings) => {
            buildings.cycle();
        });
    }

    findPickUpBuilding (): IBuilding|null {
        for (const building of this.buildings) {
            if (building.hasPickupItem()) {
                let deliveryItemType = building.getOutputItemType();
                if (deliveryItemType && this.findDeliveryBuilding(deliveryItemType)) {
                    return building;
                }
            }
        }

        return null;
    }

    findDeliveryBuilding (resource: ResourceItem): IBuilding|null {
        for (const building of this.buildings) {
            if (building.canDelivery(resource)) {
                return building;
            }
        }

        return null;
    }

    private init (): void {
        this.spawnBuilding(450, 450, BuildingsEnum.FARM);
        this.spawnBuilding(800, 300, BuildingsEnum.MILL);
        this.spawnBuilding(800, 550, BuildingsEnum.BAKERY);
        this.spawnBuilding(550, 200, BuildingsEnum.INN);
    }

    private spawnBuilding (
        x: number,
        y: number,
        buildingType: BuildingsEnum,
    ): IBuilding|null {
        let building;

        switch (buildingType) {
            case BuildingsEnum.FARM:
                building = new BuildingFarm(this.scene, x, y);
                break;
            case BuildingsEnum.MILL:
                building = new BuildingMill(this.scene, x, y);
                break;
            case BuildingsEnum.BAKERY:
                building = new BuildingBakery(this.scene, x, y);
                break;
            case BuildingsEnum.INN:
                building = new BuildingInn(this.scene, x, y);
                break;
        }

        if (!building) {
            return null;
        }

        this.buildings.push(building);

        return building;
    }
}


