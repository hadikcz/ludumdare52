import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { ResourceItem } from 'core/resources/ResourceItem';
import { Subject } from 'rxjs';
import { Vec2 } from 'types/Vec2';

export interface IBuilding {
    cycle(): void;
    hasPickupItem(): boolean;
    pickupResource(): ResourceItem|null;
    canDelivery(resource: ResourceItem): boolean;
    tryDelivery(resource): boolean;
    getOutputItemType(): ResourceItem|null;
    getInputItemType(): ResourceItem|null
    getType(): BuildingsEnum;
    getDoorSpot(): Vec2;
    getName(): string;
    getStorageSize(): number;
    getSizeInputStorage(): number;
    getSizeOutputStorage(): number;
    inputStorage$: Subject<ResourceItem|null>
    outputStorage$: Subject<ResourceItem|null>
    x: number;
    y: number;
}
