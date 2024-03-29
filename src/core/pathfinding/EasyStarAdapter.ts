import easystarjs from 'easystarjs';
import Vector2 = Phaser.Math.Vector2;
import MatrixWorld from 'core/pathfinding/MatrixWorld';

export default class EasyStarAdapter {


    public static readonly BLOCK_TILE = 0;
    public static readonly WALKABLE_TILE = 1;
    public static readonly PATH_TILE = 2;
    private static readonly ACCEPTABLE_TILES: number[] = [0, 1, 2];
    private easyStar;

    constructor () {
        this.easyStar = new easystarjs.js();
        this.easyStar.setAcceptableTiles(EasyStarAdapter.ACCEPTABLE_TILES);
        this.easyStar.enableSync();
        this.easyStar.enableDiagonals();
        // this.easyStar.enableCornerCutting();

        this.easyStar.setTileCost(EasyStarAdapter.BLOCK_TILE, 50000000000000000000000000);
        this.easyStar.setTileCost(EasyStarAdapter.WALKABLE_TILE, 999999999999999);
        this.easyStar.setTileCost(EasyStarAdapter.PATH_TILE, 0);
    }

    setGrid (data: integer[][]): void {
        this.easyStar.setGrid(data);
    }

    findPath (x1: number, y1: number, x2: number, y2: number, callback: FindPathCallback, callbackContext): void {
        let from = EasyStarAdapter.transformWorldToGridPosition(x1, y1, true);
        let to = EasyStarAdapter.transformWorldToGridPosition(x2, y2, true);
        this.easyStar.findPath(from.x, from.y, to.x, to.y, (path: Vector2[]) => {
            if (path) {
                let convertedPath = EasyStarAdapter.convertGridToWorldPoints(path);
                callback.call(callbackContext, true, convertedPath);
            } else {
                callback.call(callbackContext, false, []);
            }
        });
        this.easyStar.calculate();
    }

    private static convertGridToWorldPoints (points: Vector2[]): Vector2[] {
        let convertedPoints: Vector2[] = [];
        points.forEach((point) => {
            convertedPoints.push(EasyStarAdapter.transformGridToWorldPosition(point.x, point.y));
        });
        return convertedPoints;
    }

    private static transformGridToWorldPosition (x, y): Vector2 {
        return {
            x: x * MatrixWorld.TILE_SIZE,
            y: y * MatrixWorld.TILE_SIZE
        } as Vector2;
    }

    private static transformWorldToGridPosition (x: number, y: number, checkBounds: boolean = false): Vector2 {
        if (checkBounds) {
            if (x < 0) {
                x = MatrixWorld.TILE_SIZE * 2 - MatrixWorld.ORIGIN_POINT.x;
            } else if (x > MatrixWorld.getWorldSize[0]) {
                x = MatrixWorld.getWorldSize[0] - MatrixWorld.TILE_SIZE * 2 - MatrixWorld.ORIGIN_POINT.x;
            }
            if (y < 0) {
                y = MatrixWorld.TILE_SIZE * 2 - MatrixWorld.ORIGIN_POINT.y;
            } else if (y > MatrixWorld.getWorldSize[1]) {
                y = MatrixWorld.getWorldSize[1] - MatrixWorld.TILE_SIZE * 2 - MatrixWorld.ORIGIN_POINT.y;
            }
        }

        return {
            x: Math.floor(x / MatrixWorld.TILE_SIZE),
            y: Math.floor(y / MatrixWorld.TILE_SIZE)
        } as Vector2;
    }

}
