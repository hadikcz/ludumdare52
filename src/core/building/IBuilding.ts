import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { ResourceItem } from 'core/resources/ResourceItem';

export interface IBuilding {
    cycle(): void;
    hasPickupItem(): boolean;
    pickupResource(): ResourceItem|null;
    canDelivery(resource: ResourceItem): boolean;
    tryDelivery(resource): boolean;
    getOutputItemType(): ResourceItem|null;
    getType(): BuildingsEnum;
    x: number;
    y: number;
}
