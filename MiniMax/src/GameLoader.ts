import { OutputManager } from "./OutputManager";
import { GameManager } from "./GameManager";
import { PlayerTurn } from "./Players/PlayerTurn";
import { Player } from "./Players/Player";
import { Human } from "./Players/Human";
import { MyNegaMaxImplementation } from "./Players/MyNegaMaxImplementation";
import { NegaMiniMax } from "./Players/NegaMiniMax";
import { IBoard } from "./Board/Board";
import { TicTacToeBoard } from "./Board/TicTacToeBoard";
import { TicTacToeMiniMax } from "./Players/MiniMax/TicTacToe_MiniMax";

export class GameLoader {
    private outputGame: HTMLDivElement;

    private outputManagerForPlayerOne: OutputManager;
    private outputManagerForPlayerTwo: OutputManager;
    private outputManagerForGame: OutputManager;

    private gameManager: GameManager;
    private gameBoard: IBoard;

    constructor(
        canvasContext: CanvasRenderingContext2D,
        outputPlayerOne: HTMLDivElement,
        outputPlayerTwo: HTMLDivElement,
        outputGame: HTMLDivElement,
        btnNewGame: HTMLDivElement,
        btnCanvasClick: HTMLCanvasElement,
        selectPlayerOne: HTMLSelectElement,
        selectPlayerTwo: HTMLSelectElement
    ) {

        this.outputGame = outputGame;

        this.outputManagerForGame = new OutputManager(this.outputGame);
        this.outputManagerForPlayerOne = new OutputManager(outputPlayerOne);
        this.outputManagerForPlayerTwo = new OutputManager(outputPlayerTwo);

        // const initalPlayerOne: Player = this.getPlayerFromSelect(selectPlayerOne, PlayerTurn.PlayerOne, this.gameManager);
        // const initalPlayerTwo: Player = this.getPlayerFromSelect(selectPlayerTwo, PlayerTurn.PlayerTwo, this.gameManager);

        this.gameBoard = new TicTacToeBoard();
        this.gameManager = new GameManager(
            canvasContext,
            this.outputManagerForGame,
            this.gameBoard,
            this.outputManagerForPlayerOne,
            this.outputManagerForPlayerTwo
        );

        btnNewGame.onclick = () => this.gameManager.newGame();
        btnCanvasClick.onclick = (e: MouseEvent) => this.gameManager.onCanvasClick(e);
        selectPlayerOne.onchange = () => {
            const playerOne = this.getPlayerFromSelect(selectPlayerOne, PlayerTurn.PlayerOne);
            this.gameManager.setPlayerOne(playerOne);
        };
        selectPlayerTwo.onchange = () => {
            const playerTwo = this.getPlayerFromSelect(selectPlayerTwo, PlayerTurn.PlayerTwo);
            this.gameManager.setPlayerTwo(playerTwo);
        };
    }

    public startGame(): void {
        this.gameManager.newGame();
    }

    private getPlayerFromSelect(select: HTMLSelectElement, playerTurn: PlayerTurn): Player {
        let outputManager: OutputManager;
        if (playerTurn === PlayerTurn.PlayerOne)
            outputManager = this.outputManagerForPlayerOne;
        else
            outputManager = this.outputManagerForPlayerTwo;

        const player = this.convertPlayerStringToPlayer(select.value, playerTurn, outputManager);
        return player;
    }

    private convertPlayerStringToPlayer(str: string, ownPlayerTurn: PlayerTurn, outputManager: OutputManager): Player {
        switch (str) {
            case "human":
                return new Human(ownPlayerTurn, outputManager, this.gameManager);
            case "minimax":
                // return new MyNegaMaxImplementation(ownPlayerTurn, outputManager, this.gameManager);
                return new TicTacToeMiniMax(ownPlayerTurn, outputManager, this.gameManager);
            case "NegaMax":
                return new NegaMiniMax(ownPlayerTurn, outputManager, this.gameManager);
            default:
                throw new Error("Unknown Player selected");
        }
    }
}

