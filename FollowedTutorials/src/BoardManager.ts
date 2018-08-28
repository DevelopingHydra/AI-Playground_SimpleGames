import { GameObject } from "./GameObjects/GameObject";
import { RenderableObject } from "./GameObjects/RenderableObject";


export class BoardManager {
    private canvasContext: CanvasRenderingContext2D;
    private fpsOutputElement: HTMLDivElement;

    private gameObjects: RenderableObject[] = [];
    private isGameRunning: Boolean = false;

    private frameMeasureTime: number = 0;
    private frameCount: number = 0;
    private lastUpdate: number = 0;
    private desiredFPS: number = 20; // number of FPS this should be running at
    private fpsInterval: number = 0;
    private currentFPS: number = 0;

    constructor(canvasContext: CanvasRenderingContext2D, fpsOutput: HTMLDivElement) {
        this.canvasContext = canvasContext;
        this.fpsOutputElement = fpsOutput;
    }

    public startGame(): void {
        this.isGameRunning = true;

        window.requestAnimationFrame(() => this.animationLoop(this));

        this.fpsInterval = 1000 / this.desiredFPS;
        this.frameMeasureTime = Date.now();
        this.lastUpdate = this.frameMeasureTime;
    }

    public stopGame(): void {
        this.gameLoop(); // last draw
        this.gameObjects = [];
        this.isGameRunning = false;
    }

    public animationLoop(that: BoardManager): void {
        if (that.isGameRunning) {
            window.requestAnimationFrame(() => that.animationLoop(that));

            const elapsedTime = Date.now() - that.lastUpdate;
            if (elapsedTime > that.fpsInterval) {
                that.lastUpdate = Date.now() - (elapsedTime % that.fpsInterval);
                that.gameLoop();

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

    private gameLoop(): void {
        this.canvasContext.clearRect(0, 0,
            this.canvasContext.canvas.width,
            this.canvasContext.canvas.height);

        this.gameObjects.forEach(obj => obj.update(this.canvasContext));
    }

    public addGameObject(gameObject: RenderableObject): void {
        this.gameObjects.push(gameObject);
    }
}