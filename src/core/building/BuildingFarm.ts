import AbstractBuilding from 'core/building/AbstractBuilding';
import BuildingHandler from 'core/building/BuildingHandler';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import GameScene from 'scenes/GameScene';

export default class BuildingFarm extends AbstractBuilding implements IBuilding {

    constructor (
        scene: GameScene,
        x: number,
        y: number
    ) {
        super(
            scene,
            x,
            y,
            'farm',
            BuildingHandler.DEFAULT_STORAGE,
            BuildingsEnum.FARM,
            ResourceItem.WHEAT
        );
    }
}
