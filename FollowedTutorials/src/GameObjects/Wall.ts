import { GameObject } from "./GameObject";
import { Vector } from "../Vector";

export class Wall extends GameObject {
    private otherCorner: Vector;
    private color: string = "gray";

    public constructor(position: Vector, width: number, height: number) {
        super(position);
        this.otherCorner = new Vector(this.position.x + width, this.position.y + height);
    }

    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.fillStyle = this.color;
        const width = this.otherCorner.x - this.position.x;
        const height = this.otherCorner.y - this.position.y;
        canvasContext.fillRect(this.position.x, this.position.y, width, height);
    }

    public move(): void {
    }

    protected isOutOfBounce(canvasContext: CanvasRenderingContext2D): Boolean {
        return this.otherCorner.x < 0
            || this.otherCorner.y < 0
            || this.position.x > canvasContext.canvas.width
            || this.position.y > canvasContext.canvas.height;
    }

    public isPointWithin(point: Vector): Boolean {
        return point.x > this.position.x && point.x < this.otherCorner.x
            && point.y > this.position.y && point.y < this.otherCorner.y;
    }
}