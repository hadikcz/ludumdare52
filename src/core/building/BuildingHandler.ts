import AbstractBuilding from 'core/building/AbstractBuilding';
import BuildingFarm from 'core/building/BuildingFarm';
import BuildingMill from 'core/building/BuildingMill';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import GameScene from 'scenes/GameScene';

export default class BuildingHandler {

    public static readonly DEFAULT_STORAGE = 5;
    public buildings: AbstractBuilding[] = [];

    constructor (
        private scene: GameScene
    ) {
        this.init();

        this.scene.time.addEvent({
            repeat: Infinity,
            delay: 1000,
            callbackScope: this,
            callback: () => {
                this.cycle();
            }
        });
    }

    public cycle (): void {
        this.buildings.forEach((buildings) => {
            buildings.cycle();
        });
    }

    private init (): void {
        this.spawnBuilding(450, 450, BuildingsEnum.FARM);
        this.spawnBuilding(800, 300, BuildingsEnum.MILL);
    }

    private spawnBuilding (
        x: number,
        y: number,
        buildingType: BuildingsEnum,
    ): IBuilding|null {
        let building;

        switch (buildingType) {
            case BuildingsEnum.FARM:
                building = new BuildingFarm(this.scene, x, y);
                break;
            case BuildingsEnum.MILL:
                building = new BuildingMill(this.scene, x, y);
                break;
        }

        if (!building) {
            return null;
        }

        this.buildings.push(building);

        return building;
    }
}


