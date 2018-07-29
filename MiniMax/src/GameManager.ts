import { PlayerTurn } from "./Players/PlayerTurn";
import { OutputManager } from "./OutputManager";
import { Board } from "./Board";
import { WinState } from "./WinState";
import { NegaMiniMax } from "./Players/NegaMiniMax";
import { Point } from "./Players/Point";
import { deepClone } from "./Players/util";
import { Player } from "./Players/Player";
import { Human } from "./Players/Human";

export class GameManager {
    private canvasContext: CanvasRenderingContext2D;
    private board: Board;
    private outputManager: OutputManager;

    private playerOne: Player = new Human(this, PlayerTurn.PlayerOne);
    private playerTwo: Player = new Human(this, PlayerTurn.PlayerTwo);
    private playerOnTurn: Player = this.playerOne;
    private fields: number[][] = [];
    private gameRunning: boolean;

    constructor(outputManager: OutputManager, canvasContext: CanvasRenderingContext2D) {
        this.board = new Board(outputManager, canvasContext, this);
        this.outputManager = outputManager;
        this.canvasContext = canvasContext;
        this.gameRunning = false;
    }

    public newGame(): void {
        this.initFields();
        this.playerOnTurn = this.playerOne;
        this.board.startGame();
        this.outputManager.writeAppendMessage("Starting game");
        this.gameRunning = true;
        this.playerOnTurn.onIsOnTurn();
    }

    public stopGame(): void {
        if (this.isGameRunning) {
            this.board.stopGame();
            this.gameRunning = false;
        }
    }

    public onCanvasClick(event: MouseEvent): void {
        if (this.isGameRunning) {
            this.playerOnTurn.onClick(event, this.canvasContext);
        }
    }

    public makeTurn(point: Point): boolean {
        if (this.gameRunning) {
            if (this.isFieldEmpty(point)) {
                this.fields[point.x][point.y] = this.playerOnTurn.getPlayerTurn();
                console.info("making move: " + point);

                const gameResult = this.isGameOver(this.fields);
                if (gameResult !== WinState.NoOneWonYet) {
                    this.stopGame();
                    if (gameResult === WinState.Draw)
                        this.outputManager.writeAppendMessage("Game Over - DRAW");
                    else if (gameResult === WinState.PlayerOneWon)
                        this.outputManager.writeAppendMessage("Game Over - PLAYER ONE WON");
                    else if (gameResult === WinState.PlayerTwoWon)
                        this.outputManager.writeAppendMessage("Game Over - PLAYER TWO WON");
                } else {
                    this.switchTurn();
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

    public isGameOver(fieldToCheck: number[][]): WinState {
        // horizontal
        for (let i = 0; i < fieldToCheck.length; i++) {
            let allFieldsPlayerOne = true;
            let allFieldsPlayerTwo = true;
            for (let j = 0; j < fieldToCheck[i].length; j++) {
                if (fieldToCheck[i][j] !== PlayerTurn.PlayerOne)
                    allFieldsPlayerOne = false;
                if (fieldToCheck[i][j] !== PlayerTurn.PlayerTwo)
                    allFieldsPlayerTwo = false;
            }
            if (allFieldsPlayerOne)
                return WinState.PlayerOneWon;
            if (allFieldsPlayerTwo)
                return WinState.PlayerTwoWon;
        }

        // vertical
        for (let j = 0; j < fieldToCheck.length; j++) {
            let allFieldsPlayerOne = true;
            let allFieldsPlayerTwo = true;
            for (let i = 0; i < fieldToCheck[j].length; i++) {
                if (fieldToCheck[i][j] !== PlayerTurn.PlayerOne)
                    allFieldsPlayerOne = false;
                if (fieldToCheck[i][j] !== PlayerTurn.PlayerTwo)
                    allFieldsPlayerTwo = false;
            }
            if (allFieldsPlayerOne)
                return WinState.PlayerOneWon;
            if (allFieldsPlayerTwo)
                return WinState.PlayerTwoWon;
        }

        // diagonal
        if (fieldToCheck[0][0] === fieldToCheck[1][1] && fieldToCheck[1][1] === fieldToCheck[2][2]) {
            if (fieldToCheck[1][1] === PlayerTurn.PlayerOne)
                return WinState.PlayerOneWon;
            else if (fieldToCheck[1][1] === PlayerTurn.PlayerTwo)
                return WinState.PlayerTwoWon;
        }

        if (fieldToCheck[2][0] === fieldToCheck[1][1] && fieldToCheck[1][1] === fieldToCheck[0][2]) {
            if (fieldToCheck[1][1] === PlayerTurn.PlayerOne)
                return WinState.PlayerOneWon;
            else if (fieldToCheck[1][1] === PlayerTurn.PlayerTwo)
                return WinState.PlayerTwoWon;
        }

        // check for draw
        let isEveryFieldUsedUp = true;
        for (let j = 0; j < fieldToCheck.length; j++) {
            for (let i = 0; i < fieldToCheck[j].length; i++) {
                if (fieldToCheck[i][j] === -1) {
                    isEveryFieldUsedUp = false;
                    break;
                }
            }
        }
        if (isEveryFieldUsedUp)
            return WinState.Draw;

        // noone won yet
        return WinState.NoOneWonYet;
    }

    private initFields(): void {
        this.fields = [];
        for (let i = 0; i < 3; i++) {
            this.fields[i] = [];
            for (let j = 0; j < 3; j++) {
                this.fields[i][j] = -1;
            }
        }

        // todo remove, for testing
        // this.fields = [[-1, -1, 2], [-1, -1, -1], [-1, -1, -1]];
    }

    private isFieldEmpty(point: Point): boolean {
        return this.fields[point.x][point.y] === -1;
    }

    /* ###### */

    public getFields(): number[][] {
        return deepClone(this.fields);
    }

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
}