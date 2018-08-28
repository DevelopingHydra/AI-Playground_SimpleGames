import { Vector } from "../Vector"
import { GameObject } from "./GameObject"
import { Brain } from "../Brain";
import { Goal } from "./Goal";

export class Dot extends GameObject {
    private velocity: Vector;
    private acceleration: Vector;
    private brain: Brain;

    protected size: number = 5;
    protected color: string = "black";

    private fitness: number = 0;
    private reachedGoal: Boolean = false;

    public constructor() {
        super();

        this.brain = new Brain(400);

        this.position = new Vector(400, 800 - 10);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);

        this.velocity.setLimit(5);
    }


    public render(canvasContext: CanvasRenderingContext2D): void {
        canvasContext.beginPath();
        canvasContext.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI, false);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
        canvasContext.closePath();
    }

    public move(): void {
        if (this.brain.hasNextStep()) {
            this.acceleration = this.brain.getNextDirection();
        } else {
            this.kill();
        }

        if (this.reachesGoal(goal)) {
            this.kill();
            this.reachedGoal = true;
        }

        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }

    protected isOutOfBounce(canvasContext: CanvasRenderingContext2D): Boolean {
        return this.position.x < 0
            || this.position.y < 0
            || this.position.x > canvasContext.canvas.width
            || this.position.y > canvasContext.canvas.height;
    }

    public calculateFitness(goal: Goal): void {
        const distanceToGoal = this.position.distanceTo(goal.getPosition());
        this.fitness = 1 / Math.pow(distanceToGoal, 2);
    }

    private reachesGoal(goal: Goal): Boolean {
        return this.position.distanceTo(goal.getPosition()) < this.size + goal.getSize();
    }

    /* ################################################# */

    public getSize(): number { return this.size; }
}