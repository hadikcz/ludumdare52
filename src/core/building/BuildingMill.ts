import AbstractBuilding from 'core/building/AbstractBuilding';
import BuildingHandler from 'core/building/BuildingHandler';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { BuildingStateEnum } from 'core/building/BuildingStateEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import delay from 'delay';
import GameScene from 'scenes/GameScene';
import { Vec2 } from 'types/Vec2';

export default class BuildingMill extends AbstractBuilding implements IBuilding {
    private wheel: Phaser.GameObjects.Image;

    constructor (
        scene: GameScene,
        x: number,
        y: number
    ) {
        super(
            scene,
            x,
            y,
            'mill_base',
            BuildingHandler.DEFAULT_STORAGE,
            BuildingsEnum.MILL,
            ResourceItem.FLOUR,
            ResourceItem.WHEAT
        );


        let yOf = 40;
        this.createResources({
            input: {
                image: 'mill_wheat',
                x: 45,
                y: yOf
            },
            output: {
                image: 'mill_flour',
                x: -45,
                y: yOf
            }
        });

        this.wheel = this.scene.add.image(0, 0, 'game', 'buildings/mill_wheel');
        this.add(this.wheel);
    }

    preUpdate () {
        super.preUpdate();

        if (this.buildingState === BuildingStateEnum.PROCESSING) {
            this.wheel.rotation -= 0.05;
        }
    }

    getDoorSpot (): Vec2 {
        return {
            x: this.x + 30,
            y: this.y + 60
        };
    }

    async cycle (): Promise<void> {
        if (this.isPaused()) return;

        if (this.inputItemType && this.outputItemType && this.canSpawnResource()) {
            this.refreshLastSpawn();

            this.inputStorage.pop();
            this.inputStorage$.next(null);

            this.setBuildingState(BuildingStateEnum.PROCESSING);
            // processing
            await delay(5000);
            this.outputStorage.push(this.outputItemType);
            this.outputStorage$.next(this.outputItemType);
            this.setBuildingState(BuildingStateEnum.WAITING);
        }
    }

    protected canSpawnResource (): boolean {
        if (this.isPaused()) return false;

        return super.canSpawnResource()
            && this.inputStorage.length > 0;
    }
}
