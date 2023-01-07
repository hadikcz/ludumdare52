import AbstractBuilding from 'core/building/AbstractBuilding';
import BuildingBakery from 'core/building/BuildingBakery';
import BuildingFarm from 'core/building/BuildingFarm';
import BuildingInn from 'core/building/BuildingInn';
import BuildingMill from 'core/building/BuildingMill';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import BuildingWarehouse from 'core/building/BuildingWarehouse';
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
            let deliveryItemType = building.getOutputItemType();
            if (building.hasPickupItem()) {
                if (deliveryItemType && this.findDeliveryBuilding(deliveryItemType)) {
                    return building;
                }
            }
        }

        return null;
    }

    findDeliveryBuilding (resource: ResourceItem, skipWarehouse: boolean = false): IBuilding|null {
        for (const building of this.buildings) {
            if (skipWarehouse && building.getType() === BuildingsEnum.WAREHOUSE) {
                continue;
            }

            if (building.canDelivery(resource)) {
                return building;
            }
        }

        return null;
    }

    findWarehouseWithFreeSpace (): IBuilding|null {
        for (const building of this.buildings) {
            if (building.getType() !== BuildingsEnum.WAREHOUSE) {
                continue;
            }

            if (building.canDelivery(ResourceItem.ANY)) {
                return building;
            }
        }

        return null;
    }

    findInnWithFood (): BuildingInn|null {
        let inn = this.findAnyInn();

        if (inn && inn.hasAvailableFood()) {
            return inn;
        }

        return null;
    }

    private findAnyInn (): BuildingInn|null {
        for (const building of this.buildings) {
            if (building.getType() === BuildingsEnum.INN) {
                return building as unknown as BuildingInn;
            }
        }
        return null;
    }

    private init (): void {
        // this.spawnBuilding(450, 450, BuildingsEnum.FARM);
        // this.spawnBuilding(350, 650, BuildingsEnum.FARM);
        this.spawnBuilding(800, 300, BuildingsEnum.MILL);
        // this.spawnBuilding(800, 550, BuildingsEnum.BAKERY);
        // this.spawnBuilding(550, 200, BuildingsEnum.INN);
        this.spawnBuilding(50, 100, BuildingsEnum.WAREHOUSE);
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
            case BuildingsEnum.WAREHOUSE:
                building = new BuildingWarehouse(this.scene, x, y);
                break;
        }

        if (!building) {
            return null;
        }

        this.buildings.push(building);

        return building;
    }
}


