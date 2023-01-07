import Container = Phaser.GameObjects.Container;
import TextStyle = Phaser.GameObjects.TextStyle;
import BuildingInn from 'core/building/BuildingInn';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import { UnitState } from 'core/units/UnitState';
import delay from 'delay';
import TransformHelpers from 'helpers/TransformHelpers';
import GameScene from 'scenes/GameScene';

export default class UnitCarrier extends Container {

    private static readonly EATING_TIME = 5000;
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

        if (this.hunger <= 0) {
            this.die();
        }
    }

    async tick (): Promise<void> {
        if (this.unitState === UnitState.WAITING) {
            if (this.hunger < 25) {
                // show hunger
                console.log('Carrier is hungry');
                console.log('Looking for inn');

                let inn = this.scene.buildingHandler.findInnWithFood();
                if (inn) {
                    this.targetBuilding = inn;
                    this.setUnitState(UnitState.MOVING_TO_INN);
                }
            }

            let building = this.scene.buildingHandler.findPickUpBuilding();

            if (building) {
                this.targetBuilding = building;
                this.setUnitState(UnitState.PICKUP);
            }
        }

        if (this.unitState === UnitState.PICKUP && this.targetBuilding) {
            let reached = this.moveToPlace(this.targetBuilding.x, this.targetBuilding.y, UnitCarrier.VELOCITY);

            if (reached) {
                this.carringCargo = this.targetBuilding.pickupResource();
                console.log(this.carringCargo);
                if (this.carringCargo) {
                    if (this.targetBuilding.getType() ===BuildingsEnum.WAREHOUSE) {
                        this.setUnitState(UnitState.LOOKING_FOR_DELIVERY_TARGET_EXCEPT_WAREHOUSE);
                    } else {
                        this.setUnitState(UnitState.LOOKING_FOR_DELIVERY_TARGET);
                    }
                    this.targetBuilding = null;
                } else {
                    this.setUnitState(UnitState.WAITING);

                    return;
                }
            }
        }

        if ((this.unitState === UnitState.LOOKING_FOR_DELIVERY_TARGET || this.unitState === UnitState.LOOKING_FOR_DELIVERY_TARGET_EXCEPT_WAREHOUSE) && this.carringCargo) {
            let skipWarehouse = this.unitState === UnitState.LOOKING_FOR_DELIVERY_TARGET_EXCEPT_WAREHOUSE;

            this.targetBuilding = this.scene.buildingHandler.findDeliveryBuilding(this.carringCargo, skipWarehouse);
            if (this.targetBuilding) {
                this.setUnitState(UnitState.DELIVERY);
            } else {
                console.error('Cargo ' + this.carringCargo + ' failed to find building to delivery. TODO: Warehouse -> delivery there');
            }
        }

        if (this.unitState === UnitState.DELIVERY && this.targetBuilding && this.carringCargo) {
            let reached = this.moveToPlace(this.targetBuilding.x, this.targetBuilding.y, UnitCarrier.VELOCITY);

            if (reached) {
                let result = this.targetBuilding.tryDelivery(this.carringCargo);
                if (result) {
                    console.log('Cargo ' + this.carringCargo + ' delivered');
                    this.carringCargo = null;
                    this.targetBuilding = null;
                    this.setUnitState(UnitState.WAITING);

                    return;
                } else {
                    console.error('Cargo ' + this.carringCargo + ' failed to delivery. TODO: Warehouse -> delivery there');
                }
            }
        }

        if (this.unitState === UnitState.MOVING_TO_INN && this.targetBuilding) {
            let reached = this.moveToPlace(this.targetBuilding.x, this.targetBuilding.y, UnitCarrier.VELOCITY);

            if (reached) {
                let inn = this.targetBuilding as BuildingInn;
                if (inn.hasAvailableFood()) {
                    if (inn.eatFood()) {
                        this.setUnitState(UnitState.EATING);
                        await delay(UnitCarrier.EATING_TIME);
                        this.resetHunger();
                        this.setUnitState(UnitState.WAITING);

                        return;
                    }
                } else {
                    console.info('Unit reached INN but not food left');
                    this.setUnitState(UnitState.WAITING);

                    return;
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
        console.info('UNIT set state: ' + state);
        this.unitState = state;
    }

    private die (): void {
        console.log('DIED');
        this.targetBuilding = null;
        this.scene.effectManager.launchFlyText(this.x, this.y, 'DIED');
        this.destroy(true);
    }

    private moveToPlace (x: number, y: number, velocity: number): boolean {
        let moveTo = TransformHelpers.moveTo(
            this.x,
            this.y,
            x,
            y,
            velocity
        );
        this.setPosition(moveTo.x, moveTo.y);

        return TransformHelpers.getDistanceBetween(this.x, this.y, x, y) < 10;
    }

    private resetHunger (): void {
        this.hunger = 100;
    }
}
