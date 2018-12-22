import { randomRange } from "./util";
import { GameObject } from "./GameObject";

export class Pipe implements GameObject {
    public x: number;
    public top: number;
    public bottom: number;

    public width: number = 10;
    private color: string = "#000";

    private canvasContext: CanvasRenderingContext2D;

    constructor(x: number,
        canvasContext: CanvasRenderingContext2D
    ) {
        this.canvasContext = canvasContext;

        this.x = x;
        this.top = randomRange(50,
            this.canvasContext.canvas.height / 2 - 50);
        this.bottom = randomRange(this.top + 20,
            canvasContext.canvas.height / 2);
    }

    updateMovement(timePassed: number): void {
        this.x -= 100 * timePassed;
    }

    draw(): void {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillRect(this.x, 0,
            this.width, this.top);
        this.canvasContext.fillRect(this.x, this.bottom,
            this.width, this.canvasContext.canvas.height);
        this.canvasContext.stroke();
        this.canvasContext.closePath();
    }
}