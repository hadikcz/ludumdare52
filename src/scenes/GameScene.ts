import Builder from 'core/building/builder/Builder';
import BuildingHandler from 'core/building/BuildingHandler';
import PathwayTilemap from 'core/building/pathway/PathwayTilemap';
import MatrixWorld from 'core/pathfinding/MatrixWorld';
import ScrollCamera from 'core/ScrollCamera';
import Shop from 'core/shop/Shop';
import UnitHandler from 'core/units/UnitHandler';
import WorldEnv from 'core/WorldEnv';
import dat, { GUI } from 'dat.gui';
import EffectManager from 'effects/EffectManager';
import $ from 'jquery';
import Phaser from 'phaser';
import UI from 'ui/UI';

declare let window: any;
declare let __DEV__: any;


export default class GameScene extends Phaser.Scene {

    public static readonly DEBUG_ENTITY_UI = false;
    public effectManager!: EffectManager;
    public ui!: UI;
    private debugGui!: GUI;
    private worldEnv!: WorldEnv;
    private testObject!: Phaser.GameObjects.Image;
    private controls!: Phaser.Cameras.Controls.SmoothedKeyControl;
    public buildingHandler!: BuildingHandler;
    public unitHandler!: UnitHandler;
    public shop!: Shop;
    public builder!: Builder;
    public matrixWorld!: MatrixWorld;
    public pathwayTilemap!: PathwayTilemap;
    private scrollCamera!: ScrollCamera;

    constructor () {
        super({ key: 'GameScene' });
    }

    create (): void {
        window.scene = this;

        this.initDebugUI();
        this.input.setTopOnly(true);

        this.pathwayTilemap = new PathwayTilemap(this);
        this.worldEnv = new WorldEnv(this);

        this.matrixWorld = new MatrixWorld(this, this.debugGui);

        this.cameras.main.setZoom(1);
        this.cameras.main.setBackgroundColor('#c0d470');

        // this.cameras.main.centerOn(GameConfig.PhaserBasicSettings.gameSize.width / 4, GameConfig.PhaserBasicSettings.gameSize.height / 4);


        this.effectManager = new EffectManager(this);

        this.builder = new Builder(this);
        this.buildingHandler = new BuildingHandler(this);
        this.unitHandler = new UnitHandler(this);
        this.shop = new Shop(this);


        this.scrollCamera = new ScrollCamera(this, 0, 0);
        this.scrollCamera.setBackgroundColor('#c0d470');

        this.scrollCamera.startFollow({ x: this.unitHandler.carriers[0].x, y: this.unitHandler.carriers[0].y });
        this.scrollCamera.stopFollow();
        this.ui = new UI(this);

        this.matrixWorld.updateGrid();

        this.worldEnv.clearFromNearestBuilding();
    }

    update (time, delta): void {
        this.builder.update();
        this.matrixWorld.update();
        this.pathwayTilemap.update();
    }

    private initDebugUI (): void {
        this.debugGui = new dat.GUI({ autoPlace: false });
        $('#datGui').append(this.debugGui.domElement);
        // $('#datGui').hide();

        let camera = this.debugGui.addFolder('Camera');
        camera.add(this.cameras.main, 'zoom').step(1).listen();
        camera.add(this.input.activePointer, 'worldX').step(1).listen();
        camera.add(this.input.activePointer, 'worldY').step(1).listen();
        camera.open();

        this.debugGui.close();
    }

    private startCameraControls (): void {
        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    }
}
