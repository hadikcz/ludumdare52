import AbstractBuilding from 'core/building/AbstractBuilding';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import { GetResourceSellPrice } from 'core/shop/Shop';
import GameScene from 'scenes/GameScene';
import { Vec2 } from 'types/Vec2';

export default class BuildingWarehouse extends AbstractBuilding implements IBuilding {

    constructor (
        scene: GameScene,
        x: number,
        y: number
    ) {
        super(
            scene,
            x,
            y,
            'warehouse',
            100,
            BuildingsEnum.WAREHOUSE,
            null,
            ResourceItem.ANY
        );

        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        //
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.WHEAT);
        // this.inputStorage.push(ResourceItem.FLOUR);
        // this.inputStorage.push(ResourceItem.BREAD);
        // this.inputStorage.push(ResourceItem.BREAD);
        // this.inputStorage.push(ResourceItem.BREAD);
        // this.inputStorage.push(ResourceItem.BREAD);
        // this.scene.events.emit(Events.UI_WAREHOUSE_OPEN, this);
    }

    getDoorSpot (): Vec2 {
        return {
            x: this.x - 35,
            y: this.y + 90
        };
    }

    async cycle (): Promise<void> {}

    hasPickupItem (resource?: ResourceItem): boolean {
        if (this.isPaused()) return false;
        return this.inputStorage.length !== 0 && this.getOutputItemType() !== null;
    }

    getAgregatedResources (): any[] {
        let resources: any[] = [];


        for (let resource of this.inputStorage) {
            if (resources[resource] === undefined) {
                resources[resource] = 0;
            }

            resources[resource]++;
        }

        return resources;
    }

    public sell (resource: ResourceItem): void {
        for (let resourceInStorage of this.inputStorage) {
            if (resource === resourceInStorage) {
                let index = this.inputStorage.indexOf(resourceInStorage);
                this.inputStorage.splice(index, 1);
                this.inputStorage$.next(null);

                let coins = GetResourceSellPrice(resource);
                this.scene.shop.addCoins(coins);
            }
        }
    }

    public pickupResource (): ResourceItem|null {
        if (this.isPaused()) return null;
        // that resource which some building need right now
        let outputItemType = this.getOutputItemType();

        if (!outputItemType) return null;
        for (let i = 0; i < this.inputStorage.length; i++) {
            let resourceInStorage = this.inputStorage[i];

            if (resourceInStorage === outputItemType) {
                this.inputStorage.splice(i, 1);

                return outputItemType;
            }
        }

        return null;
    }

    public canDelivery (): boolean {
        if (this.isPaused()) return false;
        return this.inputStorage.length < this.storageSize;
    }

    public tryDelivery (resource: ResourceItem): boolean {
        if (!this.canDelivery()) {
            false;
        }

        this.inputStorage.push(resource);

        return true;
    }

    public getOutputItemType (): ResourceItem|null {
        if (this.isPaused()) return null;
        // that items which some building need right now
        for (let resource of this.inputStorage) {
            if (this.scene.buildingHandler.findDeliveryBuilding(resource, true)) {
                return resource;
            }
        }

        return null;
    }

    protected canSpawnResource (): boolean {
        return false;
    }
}
