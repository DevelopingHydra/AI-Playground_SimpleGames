import { GameObject } from "./GameObject";
import { Vector } from "../Vector";

export abstract class Ball extends GameObject {
    protected size: number = 5;
    protected color: string = "black";

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.beginPath();
        canvasContext.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.closePath();
    }

    protected isOutOfBounce(canvasContext: CanvasRenderingContext2D): Boolean {
        return this.position.x - this.size < 0
            || this.position.y - this.size < 0
            || this.position.x + this.size > canvasContext.canvas.width
            || this.position.y + this.size > canvasContext.canvas.height;
    }

    public isPointWithin(point: Vector): Boolean {
        return Math.pow(point.x - this.position.x, 2) + Math.pow(point.y - this.position.y, 2) < Math.pow(this.size, 2);
    }

    public getSize(): number { return this.size; }
}