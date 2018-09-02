import { Vector } from "./Vector";

export class Brain {
    private directions: Vector[] = [];
    private currentStep: number = 0;

    private mutationRate: number = 0.05;

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

    public hasNextStep(): Boolean {
        return this.directions.length > this.currentStep;
    }

    public getNextDirection(): Vector {
        const nextDirection = this.directions[this.currentStep];
        this.currentStep++;
        return nextDirection;
    }

    public clone(): Brain {
        const newBrain = new Brain(this.directions.length);
        for (let i = 0; i < this.directions.length; i++) {
            newBrain.directions[i] = this.directions[i].clone();
        }
        return newBrain;
    }

    public mutate(): void {
        for (let i = 0; i < this.directions.length; i++) {
            const rand = Math.random();
            if (rand < this.mutationRate) {
                const randomAngle = Math.random() * Math.PI * 2;
                this.directions[i] = Vector.fromAngle(randomAngle);
            }
        }
    }

    public getNumSteps(): number { return this.currentStep; }
}