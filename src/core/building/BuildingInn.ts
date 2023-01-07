import AbstractBuilding from 'core/building/AbstractBuilding';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import GameScene from 'scenes/GameScene';

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
            20,
            BuildingsEnum.INN,
            null,
            ResourceItem.BREAD,
        );
    }

    async cycle (): Promise<void> {
        return;

    }

    protected canSpawnResource (): boolean {
        return false;
    }
}
