import GameConfig from 'config/GameConfig';
import NumberHelpers from 'helpers/NumberHelpers';
import GameScene from 'scenes/GameScene';
import Vector2 = Phaser.Math.Vector2;
import Image = Phaser.GameObjects.Image;
import { Depths } from 'enums/Depths';
import Group = Phaser.GameObjects.Group;
import ArrayHelpers from 'helpers/ArrayHelpers';
import GameObject = Phaser.GameObjects.GameObject;
import TransformHelpers from 'helpers/TransformHelpers';

export default class WorldEnv {

    public smallBushes: Group;
    public bushes: Group;
    public rocks: Group;
    public ponds: Group;
    private smallRocks: Phaser.GameObjects.Group;

    constructor (
        private scene: GameScene
    ) {

        this.smallBushes = this.scene.add.group();
        this.bushes = this.scene.add.group();
        this.rocks = this.scene.add.group();
        this.smallRocks = this.scene.add.group();
        this.ponds = this.scene.add.group();

        this.generateGreenDots();
        this.generateGrass();
        this.generateStonky();
        this.generateSmallbush();
        this.generateBush();
        this.generateRocks();
        this.generateSmallRocks();
        this.generatePonds();
        // let bg = this.scene.add.image(0, 0, 'background')
        //     .setOrigin(0, 0)
        //     .setDepth(Depths.BG_TEXTURE);
        // bg.setInteractive();
        // bg.on('pointerdown', () => {
        //     if (this.scene.input.activePointer.downElement.localName !== 'canvas') {
        //         return;
        //     }
        //     // this.scene.events.emit(Events.CLOSE_ALL_MODALS);
        // });
    }

    clearFromNearestBuilding (skipPonds = false): void {
        let cleanUp = (array: any) => {
            let limitDistance = 200;
            for (let building of this.scene.buildingHandler.buildings) {
                // smallbushes
                let nearest = ArrayHelpers.findLowest<GameObject>(array, (gameObject) => {
                    return TransformHelpers.getDistanceBetween(building.x, building.y, gameObject.x, gameObject.y);
                });
                if (nearest) {
                    // @ts-ignore
                    let distance = TransformHelpers.getDistanceBetween(nearest.x, nearest.y, building.x, building.y);
                    if (distance < limitDistance) {
                        nearest.destroy();
                    }
                }
            }
        };

        for (let i = 0; i < 10; i++) {
            cleanUp(this.smallBushes.getChildren());
            cleanUp(this.bushes.getChildren());
            cleanUp(this.rocks.getChildren());
            cleanUp(this.smallRocks.getChildren());
            if (!skipPonds) {
                cleanUp(this.ponds.getChildren());
            }
        }
    }

    private generateGreenDots (): void {
        for (let i = 0; i < 100; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/grassDot' + NumberHelpers.randomIntInRange(1, 8)).setDepth(Depths.DECOR_GREEN_DOTS);
        }
    }

    private generateStonky (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/stonky' + NumberHelpers.randomIntInRange(1, 2)).setDepth(Depths.DECOR_STONKY);
        }
    }

    private generateGrass (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            this.scene.add.image(spawn.x, spawn.y, 'game', 'env/grass' + NumberHelpers.randomIntInRange(1, 2)).setDepth(Depths.DECOR_GRASS);
        }
    }

    private generateSmallbush (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/smallbush' + NumberHelpers.randomIntInRange(1, 3)).setDepth(Depths.DECOR_SMALLBUSH);
            this.smallBushes.add(img);
        }
    }

    private generateBush (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/bush' + NumberHelpers.randomIntInRange(1, 4)).setDepth(Depths.DECOR_BUSH);
            this.bushes.add(img);
        }
    }

    private generateRocks (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/rock' + NumberHelpers.randomIntInRange(3, 4)).setDepth(Depths.DECOR_ROCKS);
            this.rocks.add(img);
        }
    }

    private generateSmallRocks (): void {
        for (let i = 0; i < 200; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/rock' + NumberHelpers.randomIntInRange(1, 2)).setDepth(Depths.DECOR_ROCKS);
            this.smallRocks.add(img);
        }
    }

    private generatePonds (): void {
        for (let i = 0; i < 60; i++) {
            let spawn = this.generateRandomPos();
            if (!spawn) continue;
            let img = this.scene.add.image(spawn.x, spawn.y, 'game', 'env/pond' + NumberHelpers.randomIntInRange(1, 2)).setDepth(Depths.DECOR_PONDS);
            this.ponds.add(img);
        }
    }


    private generateRandomPos (): Vector2|null {
        let run = true;
        let spawn;

        let limitDistance = 50;
        let tries = 0;
        do {
            tries++;
            spawn = new Vector2(
                NumberHelpers.randomIntInRange(0, GameConfig.World.size.width),
                NumberHelpers.randomIntInRange(0, GameConfig.World.size.height)
            );
            if (tries > 100) {
                console.log('skipping pos');
                return spawn;
            }

            // smallbushes
            let nearest = ArrayHelpers.findLowest<GameObject>(this.smallBushes.getChildren(), (gameObject) => {
                return TransformHelpers.getDistanceBetween(spawn.x, spawn.y, gameObject.x, gameObject.y);
            });
            if (nearest) {
                // @ts-ignore
                let distance = TransformHelpers.getDistanceBetween(nearest.x, nearest.y, spawn.x, spawn.y);
                if (distance > limitDistance) {
                    run = false;
                }
            }


            // bushes
            nearest = ArrayHelpers.findLowest<GameObject>(this.bushes.getChildren(), (gameObject) => {
                return TransformHelpers.getDistanceBetween(spawn.x, spawn.y, gameObject.x, gameObject.y);
            });
            if (nearest) {
                // @ts-ignore
                let distance = TransformHelpers.getDistanceBetween(nearest.x, nearest.y, spawn.x, spawn.y);
                if (distance > limitDistance) {
                    run = false;
                }
            }
            // rocks
            nearest = ArrayHelpers.findLowest<GameObject>(this.rocks.getChildren(), (gameObject) => {
                return TransformHelpers.getDistanceBetween(spawn.x, spawn.y, gameObject.x, gameObject.y);
            });
            if (nearest) {
                // @ts-ignore
                let distance = TransformHelpers.getDistanceBetween(nearest.x, nearest.y, spawn.x, spawn.y);
                if (distance > limitDistance) {
                    run = false;
                }
            }
            // small rocks
            nearest = ArrayHelpers.findLowest<GameObject>(this.smallRocks.getChildren(), (gameObject) => {
                return TransformHelpers.getDistanceBetween(spawn.x, spawn.y, gameObject.x, gameObject.y);
            });
            if (nearest) {
                // @ts-ignore
                let distance = TransformHelpers.getDistanceBetween(nearest.x, nearest.y, spawn.x, spawn.y);
                if (distance > limitDistance) {
                    run = false;
                }
            }
            // ponds
            nearest = ArrayHelpers.findLowest<GameObject>(this.ponds.getChildren(), (gameObject) => {
                return TransformHelpers.getDistanceBetween(spawn.x, spawn.y, gameObject.x, gameObject.y);
            });
            if (nearest) {
                // @ts-ignore
                let distance = TransformHelpers.getDistanceBetween(nearest.x, nearest.y, spawn.x, spawn.y);
                if (distance > limitDistance) {
                    run = false;
                }
            }

        } while (run);

        return spawn;
    }
}
