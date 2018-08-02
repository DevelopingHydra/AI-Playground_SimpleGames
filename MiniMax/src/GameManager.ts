import { PlayerTurn } from "./Players/PlayerTurn";
import { OutputManager } from "./OutputManager";
import { WinState } from "./WinState";
import { Point } from "./Players/Point";
import { Player } from "./Players/Player";
import { Human } from "./Players/Human";
import { TicTacToeDrawingBoard } from "./Board/TicTacToeDrawingBoard";
import { IBoard } from "./Board/Board";
import { Move } from "./Board/Move";

export class GameManager {
    private canvasContext: CanvasRenderingContext2D;
    private drawingBoard: TicTacToeDrawingBoard;
    private outputManager: OutputManager;

    private playerOne: Player;
    private playerTwo: Player;
    private playerOnTurn: Player = this.playerOne;
    private gameRunning: boolean;

    private gameBoard: IBoard;

    constructor(canvasContext: CanvasRenderingContext2D,
        outputManager: OutputManager,
        gameBoard: IBoard,
        outputManagerForPlayerOne: OutputManager,
        outputManagerForPlayerTwo: OutputManager
    ) {
        this.drawingBoard = new TicTacToeDrawingBoard(outputManager, canvasContext, this);

        this.outputManager = outputManager;
        this.canvasContext = canvasContext;

        this.gameBoard = gameBoard;

        this.playerOne = new Human(PlayerTurn.PlayerOne, outputManagerForPlayerOne, this);
        this.playerTwo = new Human(PlayerTurn.PlayerTwo, outputManagerForPlayerTwo, this);

        this.gameRunning = false;
    }

    public newGame(): void {
        this.gameBoard.resetBoard();
        this.drawingBoard.startGame();

        this.playerOnTurn = this.playerOne;
        this.gameRunning = true;

        this.outputManager.writeAppendMessage("Starting game");
        this.outputManager.writeTurn(this.playerOnTurn.getPlayerTurn());

        this.playerOnTurn.onIsOnTurn();
    }

    public stopGame(): void {
        if (this.isGameRunning) {
            this.drawingBoard.stopGame();
            this.gameRunning = false;
        }
    }

    public onCanvasClick(event: MouseEvent): void {
        if (this.isGameRunning) {
            this.playerOnTurn.onClick(event, this.canvasContext);
        }
    }

    public makeTurn(move: Move): boolean {
        if (this.gameRunning) {

            const newMove: Move = new Move(move.getPosition(), this.playerOnTurn.getPlayerTurn());
            const successMakingMove = this.gameBoard.makeMove(newMove);

            if (successMakingMove) {
                const gameResult = this.gameBoard.isGameOver();
                if (gameResult === WinState.NoOneWonYet) {
                    this.switchTurn();
                } else {
                    this.stopGame();
                    if (gameResult === WinState.Draw)
                        this.outputManager.writeAppendMessage("Game Over - DRAW");
                    else if (gameResult === WinState.PlayerOneWon)
                        this.outputManager.writeAppendMessage("Game Over - PLAYER ONE WON");
                    else if (gameResult === WinState.PlayerTwoWon)
                        this.outputManager.writeAppendMessage("Game Over - PLAYER TWO WON");
                }

                return true;
            } else {
                this.outputManager.writeAppendMessage("There is already a player on this field!");
                return false;
            }
        } else {
            this.outputManager.writeAppendMessage("Game not running. Please start a new one");
            return false;
        }
    }

    private switchTurn(): void {
        if (this.playerOnTurn.getPlayerTurn() === PlayerTurn.PlayerOne)
            this.playerOnTurn = this.playerTwo;
        else
            this.playerOnTurn = this.playerOne;

        this.playerOnTurn.onIsOnTurn();
        this.outputManager.writeTurn(this.playerOnTurn.getPlayerTurn());
    }







    /* ###### */

    public isGameRunning(): boolean {
        return this.gameRunning;
    }

    public getCurrentPlayerTurn(): PlayerTurn {
        return this.playerOnTurn.getPlayerTurn();
    }

    public setPlayerOne(playerOne: Player): void {
        this.playerOne = playerOne;
    }

    public setPlayerTwo(playerTwo: Player): void {
        this.playerTwo = playerTwo;
    }

    public getBoard(): IBoard {
        return this.gameBoard.clone();
    }
}