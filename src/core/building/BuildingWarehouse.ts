import AbstractBuilding from 'core/building/AbstractBuilding';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import GameScene from 'scenes/GameScene';

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
            'storehouse',
            200,
            BuildingsEnum.WAREHOUSE,
            null,
            ResourceItem.ANY
        );

        this.inputStorage.push(ResourceItem.WHEAT);
        this.inputStorage.push(ResourceItem.WHEAT);
        this.inputStorage.push(ResourceItem.WHEAT);
        this.inputStorage.push(ResourceItem.WHEAT);
    }

    async cycle (): Promise<void> {}

    hasPickupItem (resource?: ResourceItem): boolean {
        return this.inputStorage.length !== 0 && this.getOutputItemType() !== null;
    }

    public pickupResource (): ResourceItem|null {
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
