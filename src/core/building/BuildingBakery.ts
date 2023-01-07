import AbstractBuilding from 'core/building/AbstractBuilding';
import BuildingHandler from 'core/building/BuildingHandler';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { BuildingStateEnum } from 'core/building/BuildingStateEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import delay from 'delay';
import GameScene from 'scenes/GameScene';
import { Vec2 } from 'types/Vec2';

export default class BuildingBakery extends AbstractBuilding implements IBuilding {

    constructor (
        scene: GameScene,
        x: number,
        y: number
    ) {
        super(
            scene,
            x,
            y,
            'bakery',
            BuildingHandler.DEFAULT_STORAGE,
            BuildingsEnum.BAKERY,
            ResourceItem.BREAD,
            ResourceItem.FLOUR,
        );
    }

    getDoorSpot (): Vec2 {
        return {
            x: this.x + 30,
            y: this.y + 60
        };
    }

    async cycle (): Promise<void> {
        if (this.inputItemType && this.outputItemType && this.canSpawnResource()) {
            this.refreshLastSpawn();

            this.inputStorage.pop();

            this.setBuildingState(BuildingStateEnum.PROCESSING);
            // processing
            await delay(5000);
            this.outputStorage.push(this.outputItemType);
            this.setBuildingState(BuildingStateEnum.WAITING);
        }
    }

    protected canSpawnResource (): boolean {
        return super.canSpawnResource()
            && this.inputStorage.length > 0;
    }
}
