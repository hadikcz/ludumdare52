import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { Depths } from 'enums/Depths';
import { Events } from 'enums/Events';
import { Subject } from 'rxjs';
import GameScene from 'scenes/GameScene';

export default class Builder {

    private buildMode: BuildingsEnum|null = null;
    public buildModeRunning$: Subject<boolean>;
    private previewImage: Phaser.GameObjects.Image;
    private canPlace: boolean = false;

    constructor (
        public scene: GameScene
    ) {
        this.buildModeRunning$ = new Subject<boolean>();
        this.buildModeRunning$.next(this.isBuildMode());

        this.previewImage = this.scene.add.image(-1000, -1000, 'warehouse')
            .setDepth(Depths.BUILD_ICON).setVisible(false);

        this.scene.input.on('pointerdown', (pointer, obj) => {
            console.log('click');
            if (this.scene.input.activePointer.downElement.localName !== 'canvas') {
                console.log('click2');
                return;
            }
            console.log('click3');
            if (!this.isBuildMode()) return;
            console.log('click4');
            this.finishBuilding(pointer.worldX, pointer.worldY);
        });

        this.scene.events.on(Events.CANCEL_BUILDING, () => {
            this.cancelBuilding();
        });
    }

    update (): void {
        if (this.buildMode !== null) {
            this.canPlace = this.canPlaceIntersectionCheck();
            this.previewImage.setPosition(this.scene.input.activePointer.worldX, this.scene.input.activePointer.worldY).setVisible(true);

            if (this.canPlace) {
                this.previewImage.setTint(0x00FF00);
            } else {
                this.previewImage.setTint(0xFF0000);
            }
        } else {
            this.canPlace = false;
        }
    }

    isBuildMode (): boolean {
        return !!this.buildMode;
    }

    startBuild (building: BuildingsEnum): void {
        if (this.isBuildMode()) return;

        // const requiredPrice = this.getBuildingPrice(building);
        // if (this.scene.money < requiredPrice) {
        //     return;
        // }

        // this.scene.ui.showBuildMode(building.toString());
        let frame = this.getFrameFromBuilding(building);
        if (!frame) {
            throw new Error('Building image not found ' + building);
        }
        this.previewImage.setTexture(frame);
        console.log('start build');
        this.buildMode = building;
        this.buildModeRunning$.next(this.isBuildMode());
    }

    private finishBuilding (x: number, y: number): void {
        if (!this.isBuildMode()) return;
        if (!this.canPlace) return;
        if (!this.buildMode) {
            console.error('finish buidling failed');
            return;
        }

        this.scene.buildingHandler.buildingShopBuilder.purchaseBuilding(x, y, this.buildMode);

        this.cancelBuilding();
    }

    private cancelBuilding (): void {
        this.buildMode = null;
        this.buildModeRunning$.next(this.isBuildMode());
        this.previewImage.setPosition(-100, -100).setVisible(false);
    }

    private canPlaceIntersectionCheck (): boolean {
        return true;
        // let bounds = this.previewImage.getBounds();
        //
        // if (!this.scene.matrixWorld.isTileAvailable(bounds.left, bounds.top)) {
        //     return false;
        // }
        // if (!this.scene.matrixWorld.isTileAvailable(bounds.right, bounds.top)) {
        //     return false;
        // }
        // if (!this.scene.matrixWorld.isTileAvailable(bounds.left, bounds.bottom)) {
        //     return false;
        // }
        // if (!this.scene.matrixWorld.isTileAvailable(bounds.right, bounds.bottom)) {
        //     return false;
        // }
        //
        // // @ts-ignore
        // for (let object: IBuildingBounds of this.scene.feederManager.feeders.getChildren()) {
        //     if (Phaser.Geom.Intersects.RectangleToRectangle(
        //         this.previewImage.getBounds(),
        //         // @ts-ignore
        //         object.getImageBounds()
        //     )) {
        //         return false;
        //     }
        // }
        // return true; // @TODO
    }

    private getFrameFromBuilding (building: BuildingsEnum): string|null {
        switch (building) {
            case BuildingsEnum.FARM:
                return 'farm';
            case BuildingsEnum.MILL:
                return 'mill';
            case BuildingsEnum.BAKERY:
                return 'bakery';
            case BuildingsEnum.INN:
                return 'inn';
            case BuildingsEnum.WAREHOUSE:
                return 'warehouse';
            default:
                return null;
        }
    }
}