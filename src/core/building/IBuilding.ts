import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { ResourceItem } from 'core/resources/ResourceItem';
import { Subject } from 'rxjs';
import { Vec2 } from 'types/Vec2';
import EventEmitter = Phaser.Events.EventEmitter;

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
    tryDestroy(): void;
    isPaused(): boolean;
    pause(): void;
    resume(): void;
    pauseToggle(): void;
    inputStorage$: Subject<ResourceItem|null>
    paused$: Subject<boolean>
    outputStorage$: Subject<ResourceItem|null>
    x: number;
    y: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    on?: (event: string | symbol, fn: Function, context?: any) => this;
}
