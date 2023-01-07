import Container = Phaser.GameObjects.Container;
import TextStyle = Phaser.GameObjects.TextStyle;
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import { UnitState } from 'core/units/UnitState';
import TransformHelpers from 'helpers/TransformHelpers';
import GameScene from 'scenes/GameScene';

export default class UnitCarrier extends Container {

    private static readonly VELOCITY = 5;
    private stateText!: Phaser.GameObjects.Text;
    private unitState: UnitState = UnitState.WAITING;
    private carringCargo: ResourceItem|null = null;
    private hunger: number = 100;

    private targetBuilding: IBuilding|null = null;

    constructor (
        public scene: GameScene,
        x: number,
        y: number
    ) {
        super(scene, x, y, []);

        this.scene.add.existing(this);

        this.scene = scene;

        let unitImage = this.scene.add.image(0, 0, 'carrier');
        this.add(unitImage);

        this.draw();
    }

    preUpdate (): void {
        this.tick();
        this.redraw();
    }

    secondTick (): void {
        this.hunger -= 1;

        if (this.hunger < 25) {
            // show hunger
            console.log('Carrier is hungry');
        }

        if (this.hunger <= 0) {
            this.die();
        }
    }

    tick (): void {
        if (this.unitState === UnitState.WAITING) {
            let building = this.scene.buildingHandler.findPickUpBuilding();

            if (building) {
                this.targetBuilding = building;
                this.setUnitState(UnitState.PICKUP);
            }
        }

        if (this.unitState === UnitState.PICKUP && this.targetBuilding) {
            let moveTo = TransformHelpers.moveTo(
                this.x,
                this.y,
                this.targetBuilding.x,
                this.targetBuilding.y,
                UnitCarrier.VELOCITY
            );
            this.setPosition(moveTo.x, moveTo.y);

            if (TransformHelpers.getDistanceBetween(this.x, this.y, this.targetBuilding.x, this.targetBuilding.y) < 10) {
                // on pos
                this.carringCargo = this.targetBuilding.pickupResource();
                console.log(this.carringCargo);
                if (this.carringCargo) {
                    this.setUnitState(UnitState.LOOKING_FOR_DELIVERY_TARGET);
                    this.targetBuilding = null;
                } else {
                    this.setUnitState(UnitState.WAITING);
                }
            }
        }

        if (this.unitState === UnitState.LOOKING_FOR_DELIVERY_TARGET && this.carringCargo) {
            this.targetBuilding = this.scene.buildingHandler.findDeliveryBuilding(this.carringCargo);
            if (this.targetBuilding) {
                this.setUnitState(UnitState.DELIVERY);
            } else {
                console.error('Cargo ' + this.carringCargo + ' failed to find building to delivery. TODO: Warehouse -> delivery there');
            }
        }

        if (this.unitState === UnitState.DELIVERY && this.targetBuilding && this.carringCargo) {
            let moveTo = TransformHelpers.moveTo(
                this.x,
                this.y,
                this.targetBuilding.x,
                this.targetBuilding.y,
                UnitCarrier.VELOCITY
            );
            this.setPosition(moveTo.x, moveTo.y);

            if (TransformHelpers.getDistanceBetween(this.x, this.y, this.targetBuilding.x, this.targetBuilding.y) < 10) {
                // on pos
                let result = this.targetBuilding.tryDelivery(this.carringCargo);
                if (result) {
                    console.log('Cargo ' + this.carringCargo + ' delivered');
                    this.carringCargo = null;
                    this.targetBuilding = null;
                    this.setUnitState(UnitState.WAITING);
                } else {
                    console.error('Cargo ' + this.carringCargo + ' failed to delivery. TODO: Warehouse -> delivery there');
                }
            }
        }
    }

    draw (): void {
        let style = { fontFamily: 'arial', fontSize: '20px', backgroundColor: '#FFFFFF' } as TextStyle;

        this.stateText = this.scene.add.text(0, 60, 'STATE: N/A', { ...style, color: '#000000', fontSize: '12px' }).setOrigin(0.5, 0);
        this.add(this.stateText);
    }

    redraw (): void {
        this.stateText.setText('STATE: ' + this.unitState);
    }

    private setUnitState (state: UnitState): void {
        this.unitState = state;
    }

    private die (): void {
        console.log('DIED');
        this.targetBuilding = null;
        this.scene.effectManager.launchFlyText(this.x, this.y, 'DIED');
        this.destroy(true);
    }
}
