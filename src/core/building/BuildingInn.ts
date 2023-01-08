import AbstractBuilding from 'core/building/AbstractBuilding';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import GameScene from 'scenes/GameScene';
import { Vec2 } from 'types/Vec2';

export default class BuildingInn extends AbstractBuilding implements IBuilding {

    constructor (
        scene: GameScene,
        x: number,
        y: number
    ) {
        super(
            scene,
            x,
            y,
            'inn',
            8,
            BuildingsEnum.INN,
            null,
            ResourceItem.BREAD,
        );

        this.inputStorage = [
            ResourceItem.BREAD,
            ResourceItem.BREAD,
        ];


        this.createResources({
            input: {
                image: 'inn_bread',
                x: 60,
                y: 15
            },
        });
    }

    getDoorSpot (): Vec2 {
        return {
            x: this.x -35,
            y: this.y + 60
        };
    }

    async cycle (): Promise<void> {
        return;

    }

    hasAvailableFood (): boolean {
        return this.inputStorage.length > 0;
    }

    eatFood (): ResourceItem|null {
        return this.inputStorage.pop() || null;
    }

    protected canSpawnResource (): boolean {
        return false;
    }
}
