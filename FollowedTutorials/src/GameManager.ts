import { BoardManager } from "./BoardManager";
import { Population } from "./GameObjects/Population";
import { Vector } from "./Vector";
import { Goal } from "./GameObjects/Goal";
import { RenderableObject } from "./GameObjects/RenderableObject";
import { Wall } from "./GameObjects/Wall";
import { GameObject } from "./GameObjects/GameObject";

export class GameManager {
    private canvasContext: CanvasRenderingContext2D;
    private generationOutput: HTMLDivElement;

    private boardManager: BoardManager;

    private gameRunning: Boolean = false;
    private gameObjects: GameObject[] = [];

    private population: Population | null = null;

    public constructor(canvasContext: CanvasRenderingContext2D,
        fpsOutput: HTMLDivElement, generationOutput: HTMLDivElement) {
        this.canvasContext = canvasContext;
        this.generationOutput = generationOutput;

        this.boardManager = new BoardManager(fpsOutput, this);

    }

    public loadLevel(level: number): void {
        this.resetWorld();

        if (level === 1) {
            const startPoint = new Vector(400, 800 - 50);
            const endPoint = new Vector(400, 50);
            const goal = new Goal(endPoint);
            this.population = new Population(500, startPoint, goal);
            this.addGameObject(goal);

        } else if (level === 2) {
            const startPoint = new Vector(400, 800 - 50);
            const endPoint = new Vector(400, 50);
            const goal = new Goal(endPoint);
            this.population = new Population(500, startPoint, goal);
            this.addGameObject(goal);

            // obstacles
            const wall = new Wall(new Vector(200, 100), 300, 100);
            this.addGameObject(wall);
        } else if (level === 3) {
            const startPoint = new Vector(400, 800 - 50);
            const endPoint = new Vector(400, 50);
            const goal = new Goal(endPoint);
            this.population = new Population(500, startPoint, goal);
            this.addGameObject(goal);

            // obstacles
            const wall = new Wall(new Vector(0, 100), 600, 100);
            this.addGameObject(wall);

            const wall2 = new Wall(new Vector(200, 400), 800, 100);
            this.addGameObject(wall2);
        }
        else {
            console.error("Unkown level");
        }
    }

    public resetWorld(): void {
        this.gameObjects = [];
        this.population = null;
    }

    public startGame(): void {
        this.gameRunning = true;
        this.boardManager.startGame();
    }

    public stopGame(): void {
        this.gameRunning = false;
        this.boardManager.stopGame();
    }

    public gameLoop(): void {
        this.canvasContext.clearRect(0, 0,
            this.canvasContext.canvas.width,
            this.canvasContext.canvas.height);

        if (this.population !== null) {
            this.generationOutput.innerHTML = this.population.getGeneration() + "";

            this.gameObjects.forEach(obj => obj.update(this.canvasContext));
            this.population.updateInhabitants(this.canvasContext);

            // check if dots collide with other objects
            this.population.getInhibitants().forEach(inhibitant => {
                this.gameObjects.forEach(gameObject => {
                    if (gameObject.isPointWithin(inhibitant.getPosition())) {
                        gameObject.kill(inhibitant);
                    }
                })
            })
        }
    }

    /* ####################################################### */

    public addGameObject(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }

    public isGameRunning(): Boolean { return this.gameRunning; }
    public setFPS(fps: number): void { this.boardManager.setFPS(fps); }
}