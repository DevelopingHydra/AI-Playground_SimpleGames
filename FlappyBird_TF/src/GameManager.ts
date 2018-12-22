import { OutputManager } from "./OutputManager";
import { CanvasDrawer } from "./CanvasDrawer";
import { Bird } from "./Bird";
import { Point } from "./Point";
import { Pipe } from "./Pipe";
import { GameObject } from "./GameObject";

export class GameManager implements GameObject {
    private canvasContext: CanvasRenderingContext2D;
    private outputManager: OutputManager;

    public isGameRunning: boolean = false;
    private canvasDrawer: CanvasDrawer;

    private bird: Bird;
    private gravity: Point = new Point(0, 150);
    private jumpForce: Point = new Point(0, -10000);
    private birdStartingX: number = 20;
    private pipes: Array<Pipe> = [];

    constructor(
        canvasContext: CanvasRenderingContext2D,
        outputManager: OutputManager
    ) {
        this.outputManager = outputManager;
        this.canvasContext = canvasContext;

        this.canvasDrawer = new CanvasDrawer(this.outputManager,
            this.canvasContext, this);

        this.bird = new Bird(this.canvasContext);
    }

    /* ### */

    public newGame(): void {
        this.isGameRunning = true;
        this.canvasDrawer.startGame();

        this.outputManager.writeAppendMessage("Starting game");

        // set bird starting position
        const startingPosition = new Point(this.birdStartingX,
            this.canvasContext.canvas.height / 2);
        this.bird.reset(startingPosition);

        // reset pipes
        this.pipes = [];
    }

    public stopGame(): void {
        if (this.isGameRunning) {
            this.isGameRunning = false;
            this.canvasDrawer.stopGame();
        }
    }

    public onCanvasClick(event: MouseEvent): void {
        if (this.isGameRunning) {
            this.jump();
        }
    }

    public onCanvasKeyPress(e: KeyboardEvent): any {
        if (e.key == " ") {
            this.jump();
        } else if (e.key == "n") {
            this.stopGame();
            this.newGame();
        }
    }

    /* ### */

    private jump() {
        console.log("jump")
        this.bird.applyForce(this.jumpForce);
    }

    updateMovement(timePassed: number): void {
        this.bird.applyForce(this.gravity);
        this.bird.updateMovement(timePassed);

        for (const pipe of this.pipes)
            pipe.updateMovement(timePassed);

        this.checkCollisions();

        this.generateNewPipe();
        this.removeOldPipes();

        console.log(this.pipes)
    }

    draw(): void {
        this.bird.draw();

        for (const pipe of this.pipes) {
            pipe.draw();
        }
    }

    private checkCollisions() {
        // upper and lower death
        if (this.bird.hitsWall()) {
            this.gameOver();
        }

        // death through pipes
        for (const pipe of this.pipes) {
            if (this.bird.hitsPipe(pipe)) {
                this.gameOver();
            }
        }
    }

    private generateNewPipe() {
        const lastPipe = this.pipes[this.pipes.length - 1];
        const xDistanceToNewPipe = 150;
        if (lastPipe === undefined
            || lastPipe.x + xDistanceToNewPipe < this.canvasContext.canvas.width) {
            const newPipe = new Pipe(this.canvasContext.canvas.width, this.canvasContext);
            this.pipes.push(newPipe);
        }
    }

    public removeOldPipes() {
        for (const pipe of this.pipes) {
            if (pipe.x + pipe.width < this.bird.getPosition().x) {
                this.pipes.splice(0, 1);
            }
        }
    }

    private gameOver() {
        console.log("game over");
        this.stopGame();
    }

}