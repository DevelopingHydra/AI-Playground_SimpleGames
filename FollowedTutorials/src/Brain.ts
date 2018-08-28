import { Vector } from "./Vector";

export class Brain {
    private directions: Vector[] = [];
    private currentStep: number = 0;

    public constructor(size: number) {
        this.initDirections(size);
    }

    private initDirections(size: number): void {
        this.directions = [];
        for (let i = 0; i < size; i++) {
            const randomAngle = Math.random() * Math.PI * 2;
            this.directions.push(Vector.fromAngle(randomAngle));
        }
    }

    hasNextStep(): Boolean {
        return this.directions.length > this.currentStep;
    }

    getNextDirection(): Vector {
        const nextDirection = this.directions[this.currentStep];
        this.currentStep++;
        return nextDirection;
    }
}