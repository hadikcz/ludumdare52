import MatrixWorld from 'core/pathfinding/MatrixWorld';
import { Depths } from 'enums/Depths';
import { Events } from 'enums/Events';
import GameScene from 'scenes/GameScene';

export default class PathwayTilemap {
    public layer: Phaser.Tilemaps.TilemapLayer;

    constructor (
        private scene: GameScene
    ) {

        const tileSize = 32;
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

        if (this.scene.input.activePointer.isDown) {
            let tile = this.layer.getTileAtWorldXY(worldPoint.x, worldPoint.y);
            if (!tile || tile.index !== 0) {
                this.layer.fill(0, pointerTileX, pointerTileY, 1, 1);

                this.scene.events.emit(Events.PATHWAY_PLACED);

                this.scene.matrixWorld.updateGrid();
            }
        }
    }
}
