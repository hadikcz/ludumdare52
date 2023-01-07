import BuildingHandler from 'core/building/BuildingHandler';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import BuildingShopBuilder from 'core/building/BuildingShopBuilder';
import { BuildingStateEnum } from 'core/building/BuildingStateEnum';
import { ResourceItem } from 'core/resources/ResourceItem';
import { Depths } from 'enums/Depths';
import { Events } from 'enums/Events';
import { Subject } from 'rxjs';
import GameScene from 'scenes/GameScene';
import { Vec2 } from 'types/Vec2';
import Container = Phaser.GameObjects.Container;
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;

export default abstract class AbstractBuilding extends Container {

    public inputStorage$: Subject<ResourceItem|null>;
    public outputStorage$: Subject<ResourceItem|null>;
    protected inputStorage: ResourceItem[] = [];
    protected outputStorage: ResourceItem[] = [];
    protected buildingState: BuildingStateEnum = BuildingStateEnum.WAITING;
    private delayBetweenSpawn: number = 5000;
    private lastSpawn: number = 0;
    private outputStorageText!: Phaser.GameObjects.Text;
    private inputStorageText!: Phaser.GameObjects.Text;
    private stateText!: Phaser.GameObjects.Text;
    private image: Phaser.GameObjects.Image;

    constructor (
        public scene: GameScene,
        x: number,
        y: number,
        imageTexture: string,
        protected storageSize: number = BuildingHandler.DEFAULT_STORAGE,
        private buildingType: BuildingsEnum,
        protected outputItemType: ResourceItem|null = null,
        protected inputItemType: ResourceItem|null = null
    ) {
        super(scene, x, y, []);

        this.scene.add.existing(this);

        this.inputStorage$ = new Subject<ResourceItem|null>();
        this.outputStorage$ = new Subject<ResourceItem|null>();

        this.image = this.scene.add.image(0, 0, imageTexture);
        this.add(this.image);

        this.draw();

        this.setDepth(Depths.BUILDINGS);

        this.image.setInteractive({ useHandCursor: true });
        this.image.on('pointerdown', () => {
            if (this.scene.input.activePointer.downElement.localName !== 'canvas') {
                return;
            }

            if (this.getType() === BuildingsEnum.WAREHOUSE) {
                this.scene.events.emit(Events.UI_WAREHOUSE_OPEN, this);
            } else {
                this.scene.events.emit(Events.UI_BUILDING_OPEN, this);
            }
        });
    }

    preUpdate (): void {
        this.redraw();
    }

    getType (): BuildingsEnum {
        return this.buildingType;
    }

    public async cycle (): Promise<void> {
        this.setBuildingState(BuildingStateEnum.WAITING);
        if (this.outputItemType && this.canSpawnResource()) {
            this.lastSpawn = Date.now();
            this.setBuildingState(BuildingStateEnum.PROCESSING);
            this.outputStorage.push(this.outputItemType);
            this.outputStorage$.next(this.outputItemType);
        }
    }

    getName (): string {
        let buyable = BuildingShopBuilder.translateBuildingToBuyable(this.getType());
        return this.scene.shop.names[buyable];
    }

    getStorageSize (): number {
        return this.storageSize;
    }

    getSizeInputStorage (): number {
        return this.inputStorage.length;
    }

    getSizeOutputStorage (): number {
        return this.outputStorage.length;
    }

    public hasPickupItem (): boolean {
        return this.outputStorage.length > 0;
    }

    public getOutputItemType (): ResourceItem|null {
        return this.outputItemType;
    }

    public getInputItemType (): ResourceItem|null {
        return this.inputItemType;
    }

    public pickupResource (): ResourceItem|null {
        if (!this.hasPickupItem()) return null;

        let item = this.outputStorage.pop() || null;
        this.outputStorage$.next(item);
        return item;
    }

    public canDelivery (resource: ResourceItem): boolean {
        return this.inputItemType === resource &&this.inputStorage.length < this.storageSize;
    }

    public tryDelivery (resource: ResourceItem): boolean {
        if (!this.canDelivery(resource)) {
            return false;
        }
        this.inputStorage.push(resource);
        this.inputStorage$.next(resource);

        return true;
    }

    getImageBounds (): Phaser.Geom.Rectangle {
        return this.image.getBounds();
    }

    getDoorSpot (): Vec2 {
        const bounds = this.getBounds();
        return {
            x: bounds.centerX,
            y: bounds.bottom - 16
        };
    }

    protected canSpawnResource (): boolean {
        return Date.now() - this.lastSpawn > this.delayBetweenSpawn
            && this.outputStorage.length < this.storageSize;
    }

    protected refreshLastSpawn (): void {
        this.lastSpawn = Date.now();
    }

    protected setBuildingState (state: BuildingStateEnum): void {
        this.buildingState = state;
    }

    private draw (): void {
        let style = { fontFamily: 'arial', fontSize: '20px', backgroundColor: '#FFFFFF' } as TextStyle;

        this.stateText = this.scene.add.text(0, 60, 'STATE: N/A', { ...style, color: '#000000', fontSize: '12px' }).setOrigin(0.5, 0);
        this.add(this.stateText);

        if (this.outputItemType) {
            this.outputStorageText = this.scene.add.text(50, -50, 'OUT: 0/' + this.storageSize, { ...style,color: '#00FF00' });
            this.add(this.outputStorageText);
        }
        if (this.inputItemType) {
            this.inputStorageText = this.scene.add.text(-50, -50, 'OUT: 0/' + this.storageSize, { ...style, color: '#FF0000' });
            this.add(this.inputStorageText);
        }
    }

    private redraw (): void {
        if (this.outputStorageText) {
            this.outputStorageText.setText('OUT: ' + this.outputStorage.length + '/' + this.storageSize);
        }
        if (this.inputStorageText) {
            this.inputStorageText.setText('IN: ' + this.inputStorage.length + '/' + this.storageSize);
        }

        this.stateText.setText('STATE: ' + this.buildingState);
    }
}
