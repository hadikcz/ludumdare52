import BuildingBakery from 'core/building/BuildingBakery';
import BuildingFarm from 'core/building/BuildingFarm';
import BuildingInn from 'core/building/BuildingInn';
import BuildingMill from 'core/building/BuildingMill';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import BuildingShopBuilder from 'core/building/BuildingShopBuilder';
import BuildingWarehouse from 'core/building/BuildingWarehouse';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import ArrayHelpers from 'helpers/ArrayHelpers';
import TransformHelpers from 'helpers/TransformHelpers';
import GameScene from 'scenes/GameScene';

export default class BuildingHandler {

    public static readonly DEFAULT_STORAGE = 5;
    public buildings: IBuilding[] = [];

    public findBuilding;
    public findBuildingTo;
    public buildingShopBuilder: BuildingShopBuilder;
    private smokeInterval!: NodeJS.Timer;

    constructor (
        private scene: GameScene
    ) {
        this.init();

        this.buildingShopBuilder = new BuildingShopBuilder(this.scene, this);

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

    getTotalAgregatedResources (): number[] {
        let resources: number[] = [];

        for (let building of this.buildings) {
            if (building.getType() !== BuildingsEnum.WAREHOUSE) {
                continue;
            }

            let warehouse = building as BuildingWarehouse;
            let res = warehouse.getAgregatedResources();

            for (let resource in res) {
                let amount = res[resource];

                if (resources[resource] === undefined) {
                    resources[resource] = 0;
                }
                resources[resource] += amount;
            }
        }

        return resources;
    }

    private init (): void {
        // this.spawnBuilding(350, 650, BuildingsEnum.FARM);
        // this.spawnBuilding(550, 200, BuildingsEnum.INN);
        // this.spawnBuilding(750, 100, BuildingsEnum.INN);
        // this.spawnBuilding(50, 100, BuildingsEnum.WAREHOUSE);
        // this.spawnBuilding(50, 600, BuildingsEnum.WAREHOUSE);

        // this.spawnBuilding(1520, 1200, BuildingsEnum.FARM);
        // this.spawnBuilding(1400, 1600, BuildingsEnum.MILL);
        // this.spawnBuilding(1200, 1600, BuildingsEnum.BAKERY);



        // real game init
        let warehouse = this.spawnBuilding(1520, 1500, BuildingsEnum.WAREHOUSE);
        if (warehouse) {
            warehouse.inputStorage.push(ResourceItem.BREAD);
            // warehouse.inputStorage.push(ResourceItem.BREAD);
            // warehouse.inputStorage.push(ResourceItem.BREAD);
            // warehouse.inputStorage.push(ResourceItem.BREAD);
            // warehouse.inputStorage.push(ResourceItem.BREAD);
        }

        this.spawnBuilding(1760, 1530, BuildingsEnum.FARM);

        let vectors = [
            { x: 1500, y: 1500 }, // start
            { x: 1500, y: 1520 },
            { x: 1500, y: 1530 },
            { x: 1500, y: 1540 },
            { x: 1500, y: 1550 },
            { x: 1500, y: 1560 },
            { x: 1500, y: 1570 },
            { x: 1500, y: 1580 },
            { x: 1500, y: 1590 },

            { x: 1500, y: 1600 }, // start
            { x: 1530, y: 1600 },
            { x: 1560, y: 1600 },
            { x: 1590, y: 1600 },
            { x: 1610, y: 1600 },
            { x: 1640, y: 1600 },
            { x: 1660, y: 1600 },
            { x: 1680, y: 1600 },
            { x: 1700, y: 1600 },


            { x: 1700, y: 1600 },//start
            { x: 1700, y: 1590 },
            { x: 1700, y: 1580 },
            { x: 1700, y: 1570 },
            { x: 1700, y: 1550 },
            { x: 1700, y: 1530 },



            { x: 1700, y: 1530 },
        ];

        for (let vector of vectors) {
            this.scene.pathwayTilemap.forceSpawn(vector.x, vector.y);
        }

        // this.scene.matrixWorld.updateGrid();
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

    findPickupBuildingNearest (x: number, y: number): IBuilding|null {
        let potentialTargets:IBuilding[] = [];
        for (const building of this.buildings) {
            let deliveryItemType = building.getOutputItemType();
            if (building.hasPickupItem() && building.canPickupBecauseQueue()) {
                if (deliveryItemType && this.findDeliveryBuilding(deliveryItemType)) {
                    potentialTargets.push(building);
                }
            }
        }

        if (potentialTargets.length === 0) return null;

        return ArrayHelpers.findLowest<IBuilding>(potentialTargets, (building: IBuilding): number => {
            return TransformHelpers.getDistanceBetween(x, y, building.x, building.y);
        });
    }

    findDeliveryBuilding (resource: ResourceItem, skipWarehouse: boolean = false): IBuilding|null {
        let warehouses: IBuilding[] = [];

        for (const building of this.buildings) {
            if (skipWarehouse && building.getType() === BuildingsEnum.WAREHOUSE) {
                continue;
            }

            if (building.canDelivery(resource)) {
                if (building.getType() === BuildingsEnum.WAREHOUSE) {
                    warehouses.push(building);
                    continue;
                }

                return building;
            }
        }

        if (warehouses.length === 0) {
            return null;
        }

        return ArrayHelpers.shuffle<IBuilding>(warehouses)[0];
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

    findAnyWarehouse (): IBuilding {
        for (const building of this.buildings) {
            if (building.getType() === BuildingsEnum.WAREHOUSE) {
                return building;
            }
        }

        throw new Error('Warehouse not found');
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

    spawnBuilding (
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

        building.on('destroy', () => {
            let i = this.buildings.indexOf(building);
            if (i !== -1) {
                this.buildings.splice(i, 1);
            }
        });

        this.buildings.push(building);

        try {
            this.scene.matrixWorld.updateGrid();
        } catch (e) {

        }


        // @ts-ignore
        // let target = building.getDoorSpot();
        // this.scene.add.circle(target.x, target.y, 6, 0xFF0000).setDepth(Depths.UI);
        return building;
    }
}


