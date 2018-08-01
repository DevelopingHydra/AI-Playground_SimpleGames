import { GameManager } from "../GameManager";
import { PlayerTurn } from "./PlayerTurn";
import { Point } from "./Point";
import { OutputManager } from "../OutputManager";
import { IBoard } from "./Board/Board";

export abstract class Player {
    protected ownPlayerTurn: PlayerTurn;
    protected outputManager: OutputManager;
    protected gameManager: GameManager;

    constructor(ownPlayerTurn: PlayerTurn, outputManager: OutputManager, gameManager: GameManager) {
        this.ownPlayerTurn = ownPlayerTurn;
        this.outputManager = outputManager;
        this.gameManager = gameManager;
    }

    public abstract onIsOnTurn(): void;

    public onClick(event: MouseEvent, canvasContext: CanvasRenderingContext2D): void { }

    public onMouseMove(event: MouseEvent, canvasContext: CanvasRenderingContext2D): void { }

    /* ###### */
    public getPlayerTurn(): PlayerTurn {
        return this.ownPlayerTurn;
    }
}