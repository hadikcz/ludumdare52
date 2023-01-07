import Container = Phaser.GameObjects.Container;
import TextStyle = Phaser.GameObjects.TextStyle;
import BuildingInn from 'core/building/BuildingInn';
import { BuildingsEnum } from 'core/building/BuildingsEnum';
import { IBuilding } from 'core/building/IBuilding';
import { ResourceItem } from 'core/resources/ResourceItem';
import { UnitState } from 'core/units/UnitState';
import delay from 'delay';
import { Depths } from 'enums/Depths';
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
    private carryItemImage: Phaser.GameObjects.Image;
    protected path: Vector2[] = [];

    constructor (
        public scene: GameScene,
        x: number,
        y: number
    ) {
        super(scene, x, y, []);

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        // let body = this.body as Phaser.Physics.Arcade.Body;
        // body.setFriction(100, 100);

        this.scene = scene;

        let unitImage = this.scene.add.image(0, 0, 'carrier').setOrigin(0.5, 1);
        this.add(unitImage);

        this.carryItemImage = this.scene.add.image(0, 0, 'flour').setVisible(false);
        this.add(this.carryItemImage);

        this.draw();
        this.setDepth(Depths.CARRIER);
    }

    preUpdate (): void {
        // if (this.body === undefined || this.body.velocity === undefined) {
        //     return;
        // }

        this.tick();
        this.redraw();
    }

    secondTick (): void {
        this.hunger -= 1;

        if (this.hunger <= 0) {
            this.die();
        }
    }

    private async move (): Promise<void> {
        // let body = this.body as Phaser.Physics.Arcade.Body;

        if (this.path.length > 0) {
            // console.log('move ' + this.path.length);
            let currentTarget = this.path[0];
            // if (Phaser.Math.Distance.Between(currentTarget.x, currentTarget.y, this.x, this.y) <= 10) {
            //     this.path.shift();
            // }
            // let move = this.scene.physics.moveTo(this, currentTarget.x, currentTarget.y, 70);
            let reached = this.moveToPlace(currentTarget.x, currentTarget.y, UnitCarrier.VELOCITY);
            if (reached) {
                this.path.shift();
            }

        } else {
            console.log('not move');
            // body.setVelocity(0, 0);

            // console.log('reach target');
            // this.stateAiEnds();
            // this.reachTarget();
        }
    }

    private async findPath (x: number, y: number): Promise<Vector2[]|null> {
        let result = await this.scene.matrixWorld.findPathAsync(this.x, this.y, x, y);
        if (result.success) {
            result.path.splice(0, 2); // first point is me, skip it
            return result.path;
        }
        return null;
    }

    async tick (): Promise<void> {
        if (
            this.unitState === UnitState.DELIVERY
            || this.unitState === UnitState.PICKUP
            || this.unitState === UnitState.MOVING_TO_INN
        ) {
            this.move();
        }

        if (this.unitState === UnitState.WAITING) {
            if (this.hunger < 25) {
                // show hunger
                console.log('Carrier is hungry');
                console.log('Looking for inn');

                let inn = this.scene.buildingHandler.findInnWithFood();
                if (inn) {
                    this.targetBuilding = inn;
                    this.setUnitState(UnitState.MOVING_TO_INN);

                    return;
                }
            }

            let building = this.scene.buildingHandler.findPickupBuildingNearest(this.x, this.y);

            if (building) {
                this.targetBuilding = building;
                this.setUnitState(UnitState.PICKUP);

                return;
            }
        }

        if (this.unitState === UnitState.PICKUP && this.targetBuilding) {
            let target = this.targetBuilding.getDoorSpot();
            let path = await this.findPath(target.x, target.y);
            if (!path) {
                throw new Error('path not found');
            }
            this.path = path;
            let reached = this.didReachedTarget(target.x, target.y);

            if (reached) {
                let cargo = this.targetBuilding.pickupResource();
                this.updateCarryItem(cargo);

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

        const rerouteDeliveryToWarehouse = (): void => {
            let warehouse = this.scene.buildingHandler.findWarehouseWithFreeSpace();
            if (warehouse) {
                console.log('Rerouting cargo to warehouse');
                this.targetBuilding = warehouse;

                return;
            } else {
                console.error('NO free delivery spot FOUND!! Destroing item');

                this.updateCarryItem(null);
                this.targetBuilding = null;
                this.setUnitState(UnitState.WAITING);

                return;
            }
        };

        if ((this.unitState === UnitState.LOOKING_FOR_DELIVERY_TARGET || this.unitState === UnitState.LOOKING_FOR_DELIVERY_TARGET_EXCEPT_WAREHOUSE) && this.carringCargo) {
            let skipWarehouse = this.unitState === UnitState.LOOKING_FOR_DELIVERY_TARGET_EXCEPT_WAREHOUSE;

            this.targetBuilding = this.scene.buildingHandler.findDeliveryBuilding(this.carringCargo, skipWarehouse);
            if (this.targetBuilding) {
                this.setUnitState(UnitState.DELIVERY);
                return;
            } else {
                // console.error('Cargo ' + this.carringCargo + ' failed to find building to delivery. TODO: Warehouse -> delivery there');
                console.info('ERROR A: Cargo ' + this.carringCargo + ' failed to delivery. Rerouting to warehouse');
                rerouteDeliveryToWarehouse();

                return;
            }
        }

        if (this.unitState === UnitState.DELIVERY && this.targetBuilding && this.carringCargo) {
            let target = this.targetBuilding.getDoorSpot();
            let path = await this.findPath(target.x, target.y);
            if (!path) {
                throw new Error('path not found');
            }
            this.path = path;
            let reached = this.didReachedTarget(target.x, target.y);

            if (reached) {
                console.log('reached delivery');
                let result = this.targetBuilding.tryDelivery(this.carringCargo);
                if (result) {
                    console.log('Cargo ' + this.carringCargo + ' delivered');
                    this.updateCarryItem(null);
                    this.targetBuilding = null;
                    this.setUnitState(UnitState.WAITING);

                    return;
                } else {
                    console.info('ERROR B: Cargo ' + this.carringCargo + ' failed to delivery. Rerouting to warehouse');
                    rerouteDeliveryToWarehouse();
                    return;
                }
            }
        }

        if (this.unitState === UnitState.MOVING_TO_INN && this.targetBuilding) {
            let target = this.targetBuilding.getDoorSpot();
            let path = await this.findPath(target.x, target.y);
            if (!path) {
                throw new Error('path not found');
            }
            this.path = path;
            let reached = this.didReachedTarget(target.x, target.y);

            if (reached) {
                console.log('reached inn');
                let inn = this.targetBuilding as BuildingInn;
                if (inn.hasAvailableFood()) {
                    console.log('has availiable food');
                    if (inn.eatFood()) {
                        console.log('eating');
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

        return TransformHelpers.getDistanceBetween(this.x, this.y, x, y) < 5;
    }

    private didReachedTarget (x: number, y: number): boolean {
        // console.log([
        //     this.path.length === 0,
        //     this.path.length
        // ]);
        if (this.path.length <= 1) {
            return true;
        }
        return TransformHelpers.getDistanceBetween(this.x, this.y, x, y) < 5;
    }

    private resetHunger (): void {
        this.hunger = 100;
    }

    private updateCarryItem (resource: ResourceItem|null = null): void {
        this.carringCargo = resource;

        if (!resource) {
            this.carryItemImage.setVisible(false);
            return;
        }

        switch (resource) {
            case ResourceItem.WHEAT:
                this.carryItemImage.setTexture('wheat');
                break;
            case ResourceItem.FLOUR:
                this.carryItemImage.setTexture('flour');
                break;
            case ResourceItem.BREAD:
                this.carryItemImage.setTexture('bread');
                break;
        }

        this.carryItemImage.setVisible(true);
    }
}
