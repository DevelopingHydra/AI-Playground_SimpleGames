export class Settings {
    public static readonly instance: Settings = new Settings();

    private mutationRate: number = 0.05;
    private populationSize: number = 2;
    private fps: number = 0;
    private brainSteps: number = 300;
    private killAllWorseThanBest: boolean = false;

    /* ################################################ */
    public setMutationRate(newRate: number): void { this.mutationRate = newRate };
    public getMutationRate(): number { return this.mutationRate }

    public setPopulationSize(newSize: number): void { this.populationSize = newSize }
    public getPopulationSize(): number { return this.populationSize }

    public setFPS(fps: number): void { this.fps = fps }
    public getFPS(): number { return this.fps }

    public setBrainSteps(newSteps: number): void { this.brainSteps = newSteps }
    public getBrainSteps(): number { return this.brainSteps }

    public doKillAllWorseThanBest(doIt: boolean): void { this.killAllWorseThanBest = doIt }
    public shouldKillAllWorseThanBest(): boolean { return this.killAllWorseThanBest }
}