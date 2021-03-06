import { OutputManager } from "./OutputManager";
import { GameManager } from "./GameManager";

export class CanvasDrawer {
    private outputManager: OutputManager;
    private gameManager: GameManager;

    private canvasContext: CanvasRenderingContext2D;

    private frameMeasureTime: number = 0;
    private frameCount: number = 0;
    private lastUpdate: number = 0;
    private desiredMovementUpdateInFrames: number = 20; // number of FPS this should be running at
    private desiredDrawIntervalInFrames: number = 20;
    private timeSinceLastDraw: number = Date.now();
    private fpsInterval: number = 0;
    private currentFPS: number = 0;

    constructor(outputManager: OutputManager, canvasContext: CanvasRenderingContext2D, gameManager: GameManager) {
        this.canvasContext = canvasContext;
        this.outputManager = outputManager;
        this.gameManager = gameManager;
    }

    public startGame(): void {
        window.requestAnimationFrame(() => this.animationLoop(this));

        this.fpsInterval = 1000 / this.desiredMovementUpdateInFrames;
        this.frameMeasureTime = Date.now();
        this.lastUpdate = this.frameMeasureTime;
    }

    public stopGame(): void {
        this.clearCanvas();
        this.gameManager.draw(); // last draw
    }

    public animationLoop(that: CanvasDrawer): void {
        if (that.gameManager.isGameRunning) {
            window.requestAnimationFrame(() => that.animationLoop(that));


            const elapsedTime = Date.now() - that.lastUpdate;


            if (Date.now() - that.timeSinceLastDraw > 1000 / that.desiredDrawIntervalInFrames) {
                that.clearCanvas();
                that.gameManager.draw();
                that.timeSinceLastDraw = Date.now();
                // console.log("draw: " + elapsedTime)
            }
            that.timeSinceLastDraw++;

            if (elapsedTime > that.fpsInterval) {
                that.lastUpdate = Date.now() - (elapsedTime % that.fpsInterval);

                that.gameManager.updateMovement(elapsedTime / 1000);
                // console.log("move: " + elapsedTime)

                // if one second passed update variables for FPS calculation
                if (that.frameMeasureTime - Date.now() > 1000) {
                    that.currentFPS = Math.round(1000 / ((Date.now() - that.frameMeasureTime) / that.frameCount) * 100) / 100;

                    that.outputManager.writeFPS(that.currentFPS);

                    that.frameMeasureTime = Date.now();
                    that.frameCount = 0;
                }
                that.frameCount++;
            }
        }
    }

    // private gameLoop(timePassed: number): void {
    //     this.clearCanvas();
    //     this.paintBackground();

    //     // now draw all the other stuf
    //     this.gameManager.updateMovement(timePassed);
    // }

    private clearCanvas(): void {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    }
    private paintBackground(): void {
        // this.setupStroke();

        // const sideLengthWidth = this.canvasContext.canvas.width / 3;
        // const sideLengthHeight = this.canvasContext.canvas.height / 3;

        // this.canvasContext.beginPath();
        // this.canvasContext.moveTo(sideLengthWidth, 0);
        // this.canvasContext.lineTo(sideLengthWidth, this.canvasContext.canvas.height);
        // this.canvasContext.stroke();
        // this.canvasContext.closePath();

        // this.canvasContext.beginPath();
        // this.canvasContext.moveTo(sideLengthWidth * 2, 0);
        // this.canvasContext.lineTo(sideLengthWidth * 2, this.canvasContext.canvas.height);
        // this.canvasContext.stroke();
        // this.canvasContext.closePath();

        // this.canvasContext.beginPath();
        // this.canvasContext.moveTo(0, sideLengthHeight);
        // this.canvasContext.lineTo(this.canvasContext.canvas.width, sideLengthHeight);
        // this.canvasContext.stroke();
        // this.canvasContext.closePath();

        // this.canvasContext.beginPath();
        // this.canvasContext.moveTo(0, sideLengthHeight * 2);
        // this.canvasContext.lineTo(this.canvasContext.canvas.width, sideLengthHeight * 2);
        // this.canvasContext.stroke();
        // this.canvasContext.closePath();
    }

    // private paintFields(): void {
    //     const fields = this.gameManager.getBoard().getFields();

    //     for (let i = 0; i < fields.length; i++) {
    //         for (let j = 0; j < fields[i].length; j++) {
    //             if (fields[i][j] !== -1) {
    //                 if (fields[i][j] === PlayerTurn.PlayerOne) {
    //                     this.drawCrossAt(i, j);
    //                 } else if (fields[i][j] === PlayerTurn.PlayerTwo) {
    //                     this.drawCircleAt(i, j);
    //                 }
    //             }
    //         }
    //     }
    // }

    // private drawCrossAt(x: number, y: number): void {
    //     const sideLengthWidth = this.canvasContext.canvas.width / 3;
    //     const sideLengthHeight = this.canvasContext.canvas.height / 3;
    //     const leftX = x * sideLengthWidth;
    //     const rightX = leftX + sideLengthWidth;
    //     const topY = y * sideLengthHeight;
    //     const bottomY = topY + sideLengthHeight;

    //     this.setupStroke();

    //     this.canvasContext.beginPath();
    //     this.canvasContext.moveTo(leftX, topY);
    //     this.canvasContext.lineTo(rightX, bottomY);
    //     this.canvasContext.stroke();
    //     this.canvasContext.closePath();

    //     this.canvasContext.beginPath();
    //     this.canvasContext.moveTo(leftX, bottomY);
    //     this.canvasContext.lineTo(rightX, topY);
    //     this.canvasContext.stroke();
    //     this.canvasContext.closePath();
    // }

    // private drawCircleAt(x: number, y: number): void {
    //     const sideLengthWidth = this.canvasContext.canvas.width / 3;
    //     const sideLengthHeight = this.canvasContext.canvas.height / 3;
    //     const leftX = x * sideLengthWidth;
    //     const rightX = leftX + sideLengthWidth;
    //     const topY = y * sideLengthHeight;
    //     const bottomY = topY + sideLengthHeight;

    //     const centerX = (rightX - leftX) / 2 + leftX;
    //     const centerY = (bottomY - topY) / 2 + topY;
    //     const radius = Math.min(rightX - leftX, bottomY - topY) / 2;

    //     this.setupStroke();

    //     this.canvasContext.beginPath();
    //     this.canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    //     this.canvasContext.stroke();
    //     this.canvasContext.closePath();
    // }

    private setupStroke(): void {
        this.canvasContext.fillStyle = "#000";
        this.canvasContext.lineWidth = Math.max(this.canvasContext.canvas.width, this.canvasContext.canvas.height) / 100;
    }
}