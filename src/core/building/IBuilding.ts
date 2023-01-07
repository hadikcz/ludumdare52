import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { ResourceItem } from 'core/resources/ResourceItem';
import { Vec2 } from 'types/Vec2';

export interface IBuilding {
    cycle(): void;
    hasPickupItem(): boolean;
    pickupResource(): ResourceItem|null;
    canDelivery(resource: ResourceItem): boolean;
    tryDelivery(resource): boolean;
    getOutputItemType(): ResourceItem|null;
    getType(): BuildingsEnum;
    getDoorSpot(): Vec2;
    x: number;
    y: number;
}
