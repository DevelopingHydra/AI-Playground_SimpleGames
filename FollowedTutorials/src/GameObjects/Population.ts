import { Dot } from "./Dot";
import { RenderableObject } from "./RenderableObject";
import { Vector } from "../Vector";
import { Goal } from "./Goal";

export class Population implements RenderableObject {
    private dots: Dot[] = [];

    public constructor(size: number) {
        for (let i = 0; i < size; i++) {
            this.dots.push(new Dot());
        }
    }

    public update(canvasContext: CanvasRenderingContext2D): void {
        this.dots.forEach(dot => dot.update(canvasContext));
    }

    public calculateFitness(goal: Goal): void {
        this.dots.forEach(dot => dot.calculateFitness(goal));
    }

    public areAllDotsDead(): Boolean {
        this.dots.forEach(dot => {
            if (dot.isAlive())
                return false;
        })
        return true;
    }
}