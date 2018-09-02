import { GameManager } from "./GameManager";


export class BoardManager {
    private fpsOutputElement: HTMLDivElement;

    private gameManager: GameManager;

    private frameMeasureTime: number = 0;
    private frameCount: number = 0;
    private lastUpdate: number = 0;
    private desiredFPS: number = 20; // number of FPS this should be running at
    private fpsInterval: number = 0;
    private currentFPS: number = 0;

    constructor(fpsOutput: HTMLDivElement, gameManager: GameManager) {
        this.fpsOutputElement = fpsOutput;
        this.gameManager = gameManager;
    }

    public startGame(): void {
        window.requestAnimationFrame(() => this.animationLoop(this));

        this.setFPS(this.desiredFPS);
        this.frameMeasureTime = Date.now();
        this.lastUpdate = this.frameMeasureTime;

        this.writeFPS(this.currentFPS);
    }

    public stopGame(): void {
    }

    public animationLoop(that: BoardManager): void {
        if (that.gameManager.isGameRunning()) {
            window.requestAnimationFrame(() => that.animationLoop(that));

            const elapsedTime = Date.now() - that.lastUpdate;
            if (elapsedTime > that.fpsInterval) {
                that.lastUpdate = Date.now() - (elapsedTime % that.fpsInterval);
                that.gameManager.gameLoop();

                // if one second passed update variables for FPS calculation
                if (Date.now() > that.frameMeasureTime + 1000) {
                    that.currentFPS = Math.round(1000 / ((Date.now() - that.frameMeasureTime) / that.frameCount) * 100) / 100;

                    that.writeFPS(that.currentFPS);

                    that.frameMeasureTime = Date.now();
                    that.frameCount = 0;
                }
                that.frameCount++;
            }
        }
    }

    writeFPS(currentFPS: number): void {
        this.fpsOutputElement.innerHTML = currentFPS + " FPS";
    }

    /* ################################# */
    public setFPS(fps: number): void {
        this.desiredFPS = fps;
        this.fpsInterval = 1000 / this.desiredFPS;
    }

}