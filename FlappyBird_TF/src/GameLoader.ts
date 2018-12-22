import { OutputManager } from "./OutputManager";
import { GameManager } from "./GameManager";

export class GameLoader {
    private outputGame: HTMLDivElement;

    private outputManagerForGame: OutputManager;

    private gameManager: GameManager;

    constructor(
        canvasContext: CanvasRenderingContext2D,
        outputGame: HTMLDivElement,
        btnNewGame: HTMLDivElement,
        btnCanvasClick: HTMLCanvasElement,
        documentForClick: HTMLDocument
    ) {

        this.outputGame = outputGame;

        this.outputManagerForGame = new OutputManager(this.outputGame);

        this.gameManager = new GameManager(
            canvasContext,
            this.outputManagerForGame,
        );

        btnNewGame.onclick = () => this.gameManager.newGame();
        btnCanvasClick.onclick = (e: MouseEvent) => this.gameManager.onCanvasClick(e);
        btnCanvasClick.onkeydown = (e: KeyboardEvent) => this.gameManager.onCanvasKeyPress(e);
        documentForClick.onkeydown = (e: KeyboardEvent) => this.gameManager.onCanvasKeyPress(e);
    }

    public startGame(): void {
        this.gameManager.newGame();
    }

}

