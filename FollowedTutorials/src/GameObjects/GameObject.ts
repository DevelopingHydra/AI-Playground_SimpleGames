import { Vector } from "../Vector";
import { RenderableObject } from "./RenderableObject";

export abstract class GameObject implements RenderableObject {
    protected alive: Boolean = true;
    protected position: Vector = new Vector(0, 0);

    public abstract render(canvasContext: CanvasRenderingContext2D): void;
    public abstract move(): void;
    protected abstract isOutOfBounce(canvasContext: CanvasRenderingContext2D): Boolean;

    public update(canvasContext: CanvasRenderingContext2D): void {
        if (this.alive) {
            if (this.isOutOfBounce(canvasContext)) {
                this.kill();
            }

            this.move();
            this.render(canvasContext);
        }
    }

    public kill(): void {
        this.alive = false;
        console.log("GO died")
    }

    public getPosition(): Vector { return this.position; }
    public isAlive(): Boolean { return this.alive; }
}