import { Vector } from "../Vector"
import { Brain } from "../Brain";
import { Goal } from "./Goal";
import { Ball } from "./Ball";
import { Settings } from "../Settings";

export class AIDot extends Ball {
    private velocity: Vector;
    private acceleration: Vector;
    private startingPosition: Vector;

    private brain: Brain;
    private fitness: number = 0;
    private reachedGoal: Boolean = false;
    private goal: Goal;
    private isBest: boolean = false;

    public constructor(position: Vector, goal: Goal) {
        super(position);

        this.startingPosition = position.clone();

        this.brain = new Brain(Settings.instance.getBrainSteps());

        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);

        this.velocity.setLimit(5);

        this.goal = goal;
    }

    public move(): void {
        if (this.brain.hasNextStep()) {
            this.acceleration = this.brain.getNextDirection();
        } else {
            this.die();
        }

        if (this.reachesGoal()) {
            this.die();
            this.reachedGoal = true;
        }

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    public calculateFitness(): void {
        if (this.reachedGoal) {
            this.fitness = 1 / 16 + 1000 / Math.pow(this.getStepsTaken(), 2);
        } else {
            const distanceToGoal = this.position.distanceTo(this.goal.getPosition());
            this.fitness = 1 / Math.pow(distanceToGoal, 2);
        }
    }

    private reachesGoal(): Boolean {
        return this.position.distanceTo(this.goal.getPosition()) < this.size + this.goal.getSize();
    }

    public makeBaby(): AIDot {
        const newDot = new AIDot(this.startingPosition.clone(), this.goal);
        newDot.brain = this.brain.clone();
        return newDot;
    }

    public mutateBrain(): void {
        if (!this.isBest)
            this.brain.mutate();
    }

    /* ########################################## */

    public getFitness(): number { return this.fitness; }
    public setBest(): void {
        this.isBest = true;
        this.color = "blue";
        this.size = this.size * 2;
    }
    public getStepsTaken(): number {
        return this.brain.getNumSteps();
    }
}