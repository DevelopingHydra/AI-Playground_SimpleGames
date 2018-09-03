import { AIDot } from "./AIDot";
import { Goal } from "./Goal";
import { Vector } from "../Vector";
import { Settings } from "../Settings";

export class Population {
    private dots: AIDot[] = [];
    private fitnessSum: number = -1;
    private numGeneration: number = 1;
    private bestInhabitant: AIDot | null = null;

    public constructor(startPoint: Vector, goal: Goal) {
        this.resetInhabitants(startPoint, goal);
    }

    private resetInhabitants(startPoint: Vector, goal: Goal): void {
        for (let i = 0; i < Settings.instance.getPopulationSize(); i++) {
            this.dots.push(new AIDot(startPoint.clone(), goal));
        }

        console.log("----------------------------")
        console.log("population: " + this.dots.length)
        console.log("num gerneration: " + this.numGeneration)
        console.log("----------------------------")
    }

    public updateInhabitants(canvasContext: CanvasRenderingContext2D): void {
        this.dots.forEach(dot => {
            if (Settings.instance.shouldKillAllWorseThanBest()
                && this.bestInhabitant
                && dot.getStepsTaken() > this.bestInhabitant.getStepsTaken()) {
                dot.die();
            }
            dot.update(canvasContext)
        });

        if (this.areAllDotsDead()) {
            this.startNextGeneration();
        }
    }

    public calculateFitnesses(): void {
        this.dots.forEach(dot => dot.calculateFitness());
    }

    private calculateFitnessSum(): void {
        this.fitnessSum = 0;
        this.dots.forEach(dot => {
            this.fitnessSum += dot.getFitness();
        });
    }

    public areAllDotsDead(): Boolean {
        for (const dot of this.dots) {
            if (dot.isAlive())
                return false;
        }
        return true;
    }

    public startNextGeneration(): void {
        this.numGeneration++;

        this.calculateFitnesses();
        this.naturalSelection();
        this.mutateInhabitants();

        console.log("----------------------------")
        console.log("population: " + this.dots.length)
        console.log("num gerneration: " + this.numGeneration)
        console.log("----------------------------")
    }

    public mutateInhabitants(): any {
        this.dots.forEach(dot => dot.mutateBrain())
    }

    public naturalSelection(): any {
        const newDots: AIDot[] = [];

        this.calculateFitnessSum();

        for (let i = 0; i < Settings.instance.getPopulationSize() - 1; i++) {
            const parent = this.selectParent();
            newDots.push(parent.makeBaby());
        };

        this.calculateBestInhabitant();
        if (this.bestInhabitant !== null) {
            newDots.push(this.bestInhabitant);
        }

        this.dots = newDots;
    }

    private selectParent(): AIDot {
        const rand = Math.random() * this.fitnessSum;
        let runningSum = 0;
        for (const dot of this.dots) {
            runningSum += dot.getFitness();
            if (runningSum > rand) {
                return dot;
            }
        }
        throw new Error("Unable to find AIDot");
    }

    private calculateBestInhabitant(): void {
        const bestOne = this.dots.reduce((prevDot, currDot) => {
            if (currDot.getFitness() > prevDot.getFitness())
                return currDot;
            else
                return prevDot;
        });

        this.bestInhabitant = bestOne.makeBaby();
        this.bestInhabitant.setBest();
    }

    public getInhibitants(): AIDot[] { return this.dots; }
    public getGeneration(): number { return this.numGeneration; }
}