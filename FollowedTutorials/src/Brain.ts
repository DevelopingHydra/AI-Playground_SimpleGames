import { Vector } from "./Vector";
import { MathHelper } from "./MathHelper";
import { Settings } from "./Settings";

export class Brain {
    private directions: Vector[] = [];
    private currentStep: number = 0;

    public constructor(size: number) {
        this.initDirections(size);
    }

    private initDirections(size: number): void {
        this.directions = [];
        for (let i = 0; i < size; i++) {
            this.directions.push(MathHelper.getRandomVector());
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
            if (rand < Settings.instance.getMutationRate()) {
                this.directions[i] = MathHelper.getRandomVector();
            }
        }
    }

    public getNumSteps(): number { return this.currentStep; }
}