import { Point } from "./Point";
import { Pipe } from "./Pipe";
import { GameObject } from "./GameObject";

export class Bird implements GameObject {
    private position: Point = new Point(0, 0);
    private velocity_y: number = 0;
    private acceleration_y: number = 0;

    private size: number = 5;
    private color: string = "#ccc";
    private maxVelocity: number = 100;

    private canvasContext: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;
    }

    public reset(startingPosition: Point) {
        this.position = startingPosition;
        this.velocity_y = 0;
        this.acceleration_y = 0;
    }

    public applyForce(force: Point) {
        this.acceleration_y += force.y;
    }

    updateMovement(timePassed: number): void {
        this.position.y += this.velocity_y * timePassed;
        this.velocity_y += this.acceleration_y * timePassed;

        // console.log(timePassed)
        // console.log(this.velocity)
        // console.log(this.acceleration)

        this.acceleration_y = 0;

        if (Math.abs(this.velocity_y) > Math.abs(this.maxVelocity)) {
            this.velocity_y =
                this.velocity_y > 0 ? this.maxVelocity : -this.maxVelocity;
        }
    }
    draw(): void {
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.lineWidth = 5;

        this.canvasContext.beginPath();
        this.canvasContext.arc(this.position.x, this.position.y,
            this.size, 0, 2 * Math.PI, false);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    }

    public hitsWall(): boolean {
        return this.position.y < 0
            || this.position.y > this.canvasContext.canvas.height;
    }

    public hitsPipe(pipe: Pipe): boolean {
        if (this.position.x + this.size > pipe.x) {
            if (this.position.y < pipe.top || this.position.y > pipe.bottom) {
                return true;
            }
        }
        return false;
    }

    /* ### */

    public getPosition() { return this.position; }

}