import { BuildingsEnum } from 'core/building/BuildingsEnum';
import MatrixWorld from 'core/pathfinding/MatrixWorld';
import { BuyableEnum } from 'core/shop/BuyableEnum';
import { Depths } from 'enums/Depths';
import { Events } from 'enums/Events';
import GameScene from 'scenes/GameScene';

export default class PathwayTilemap {

    public static readonly TILE_SIZE = 32;
    public layer: Phaser.Tilemaps.TilemapLayer;

    constructor (
        private scene: GameScene
    ) {

        const tileSize = PathwayTilemap.TILE_SIZE;
        const count = Math.round((MatrixWorld.TILES_COUNT * MatrixWorld.TILE_SIZE) / tileSize);
        let tileMap = this.scene.make.tilemap({
            tileWidth: tileSize,
            tileHeight: tileSize,
            width: count,
            height: count,
            insertNull: true
        });


        let tiles = tileMap.addTilesetImage('pathwayTileset');
        this.layer = tileMap.createBlankLayer('map', tiles, 0, 0).setDepth(Depths.PATHWAY);

        // this.layer.forEachTile((tile) => {
        //     tile.index = 0;
        // });
        this.layer.on('update', () =>{
            console.log('iupdate');
        });
    }

    update (): void {
        let worldPoint = this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as Phaser.Math.Vector2;

        let pointerTileX = this.layer.worldToTileX(worldPoint.x);
        let pointerTileY = this.layer.worldToTileY(worldPoint.y);

        if (this.scene.input.activePointer.isDown && this.scene.builder.isBuildMode()) {
            let tile = this.layer.getTileAtWorldXY(worldPoint.x, worldPoint.y);
            if (this.scene.builder.buildMode === BuildingsEnum.PATHWAY) {
                if (!tile || tile.index !== 0) {
                    if (this.scene.shop.canPurchase(BuyableEnum.PATHWAY)) {
                        let price = this.scene.shop.prices[BuyableEnum.PATHWAY];
                        this.layer.fill(0, pointerTileX, pointerTileY, 1, 1);
                        this.scene.events.emit(Events.PATHWAY_PLACED);
                        this.scene.shop.takeCoins(price);
                        this.scene.matrixWorld.updateGrid();
                    }
                }
            }

            if (this.scene.builder.buildMode === BuildingsEnum.PATHWAY_DESTROY) {
                let tile = this.layer.getTileAtWorldXY(worldPoint.x, worldPoint.y);
                if (tile) {
                    tile.index = -1;
                    this.scene.matrixWorld.updateGrid();
                }
            }
        }
    }

    forceSpawn (x: number, y: number): void {
        let pointerTileX = this.layer.worldToTileX(x);
        let pointerTileY = this.layer.worldToTileY(y);

        this.layer.fill(0, pointerTileX, pointerTileY, 1, 1);
    }
}
