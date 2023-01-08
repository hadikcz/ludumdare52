import Vector2 = Phaser.Math.Vector2;
import SmoothedKeyControl = Phaser.Cameras.Controls.SmoothedKeyControl;
import GameScene from 'scenes/GameScene';

export default class ScrollCamera extends Phaser.Cameras.Scene2D.Camera {

    public scene: GameScene;
    private startPointerPosition!: Vector2 | null;
    private controls: SmoothedKeyControl;
    private movementEnable: boolean = true;
    private blockedMouse = false;

    // @ts-ignore
    constructor (scene: GameScene, x: number, y: number, width?: number, height?: number, shouldReplace: boolean = true) {
        width = width || scene.game.config.width as number;
        height = height || scene.game.config.height as number;
        super(x, y, width, height);

        this.scene = scene;

        if (shouldReplace) {
            this.scene.cameras.main.destroy();
            this.scene.cameras.remove(this.scene.cameras.main, true);
            this.scene.cameras.addExisting(this, true);
            this.scene.cameras.main = this;
        }

        let cursors = this.scene.input.keyboard.createCursorKeys();
        let controlConfig = {
            camera: this,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.2,
            drag: 0.004,
            maxSpeed: 1.0
        };
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    }

    protected update (time: number, delta: number): void {


        super.update(time, delta);
        this.controls.update(delta);

        if (this.scene.builder.isBuildMode() && !this.blockedMouse) {
            this.blockedMouse = true;

        }
        if (!this.scene.builder.isBuildMode() && this.blockedMouse) {
            setTimeout(() => {
                this.blockedMouse = false;
            }, 500);
        }

        if (this.blockedMouse) {
            return;
        }
        if (!this.movementEnable) return;
        let pointer = this.scene.input.activePointer;
        if (this.scene.input.activePointer.isDown) {
            if (this.startPointerPosition) {
                this.scrollX += this.startPointerPosition.x - pointer.x;
                this.scrollY += this.startPointerPosition.y - pointer.y;
            }
            this.startPointerPosition = pointer.position.clone();
        } else {
            this.startPointerPosition = null;
        }
    }
}
