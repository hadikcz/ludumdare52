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


        this.createResources({
            input: {
                image: 'bakery_flour',
                x: 90,
                y: 60
            },
            output: {
                image: 'bakery_bread',
                x: 8,
                y: 78
            }
        });
    }

    getDoorSpot (): Vec2 {
        return {
            x: this.x + 10,
            y: this.y + 100
        };
    }

    preUpdate () {
        super.preUpdate();

        if (this.buildingState === BuildingStateEnum.PROCESSING) {
            this.image.setFrame('buildings/bakery_flame');
        } else {
            this.image.setFrame('buildings/bakery');
        }
    }

    async cycle (): Promise<void> {
        if (this.inputItemType && this.outputItemType && this.canSpawnResource()) {
            this.refreshLastSpawn();

            this.inputStorage.pop();
            this.inputStorage$.next(null);

            this.setBuildingState(BuildingStateEnum.PROCESSING);
            // processing
            await delay(10000);
            this.outputStorage.push(this.outputItemType);
            this.outputStorage$.next(this.outputItemType);
            this.setBuildingState(BuildingStateEnum.WAITING);
        }
    }

    protected canSpawnResource (): boolean {
        return super.canSpawnResource()
            && this.inputStorage.length > 0;
    }
}
