import { PlayerTurn } from "./PlayerTurn";
import { OutputManager } from "./OutputManager";
import { Board } from "./Board";
import { WinState } from "./WinState";
import { AI } from "./AI";
import { Point } from "./Point";

export class GameManager {
    private canvasContext: CanvasRenderingContext2D;
    private board: Board;
    private outputManager: OutputManager;
    private AI: AI;

    private playerOnTurn: PlayerTurn = PlayerTurn.PlayerOne;
    private fields: number[][] = [];
    private gameRunning: boolean;
    private shouldAIMakeNextMove: boolean = true;

    constructor(outputManager: OutputManager, canvasContext: CanvasRenderingContext2D) {
        this.board = new Board(outputManager, canvasContext, this);
        this.outputManager = outputManager;
        this.canvasContext = canvasContext;
        this.gameRunning = false;

        this.AI = new AI(this);
    }

    public newGame(): void {
        this.initFields();
        this.board.startGame();
        this.outputManager.writeAppendMessage("Starting game");
        this.gameRunning = true;
    }

    public stopGame(): void {
        this.board.stopGame();
        this.gameRunning = false;
    }

    public onCanvasClick(event: MouseEvent): void {
        const targetPoint: Point = this.calcFieldFromPosition(event);

        this.makeTurn(targetPoint);
    }

    public setShouldAIMakeNextMove(value: boolean) {
        this.shouldAIMakeNextMove = value;
    }

    public makeTurn(point: Point): boolean {
        if (this.gameRunning) {
            if (this.isFieldEmpty(point)) {
                this.fields[point.x][point.y] = this.playerOnTurn;

                const gameResult = this.isGameOver();
                if (gameResult !== WinState.NoOneWonYet) {
                    this.stopGame();
                    if (gameResult === WinState.Draw)
                        this.outputManager.writeAppendMessage("Game Over - DRAW");
                    else if (gameResult === WinState.PlayerOneWon)
                        this.outputManager.writeAppendMessage("Game Over - PLAYER ONE WON");
                    else if (gameResult === WinState.PlayerTwoWon)
                        this.outputManager.writeAppendMessage("Game Over - PLAYER TWO WON");
                } else {
                    this.switchPlayer();

                    if (this.playerOnTurn === PlayerTurn.PlayerTwo && this.shouldAIMakeNextMove) {
                        this.AI.makeTurn();
                    }
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

    private switchPlayer(): void {
        if (this.playerOnTurn === PlayerTurn.PlayerOne)
            this.playerOnTurn = PlayerTurn.PlayerTwo
        else
            this.playerOnTurn = PlayerTurn.PlayerOne;

        this.outputManager.writeTurn(this.playerOnTurn);
    }

    public isGameOver(): WinState {
        // horizontal
        for (let i = 0; i < this.fields.length; i++) {
            let allFieldsPlayerOne = true;
            let allFieldsPlayerTwo = true;
            for (let j = 0; j < this.fields[i].length; j++) {
                if (this.fields[i][j] !== PlayerTurn.PlayerOne)
                    allFieldsPlayerOne = false;
                if (this.fields[i][j] !== PlayerTurn.PlayerTwo)
                    allFieldsPlayerTwo = false;
            }
            if (allFieldsPlayerOne)
                return WinState.PlayerOneWon;
            if (allFieldsPlayerTwo)
                return WinState.PlayerTwoWon;
        }

        // vertical
        for (let j = 0; j < this.fields.length; j++) {
            let allFieldsPlayerOne = true;
            let allFieldsPlayerTwo = true;
            for (let i = 0; i < this.fields[j].length; i++) {
                if (this.fields[i][j] !== PlayerTurn.PlayerOne)
                    allFieldsPlayerOne = false;
                if (this.fields[i][j] !== PlayerTurn.PlayerTwo)
                    allFieldsPlayerTwo = false;
            }
            if (allFieldsPlayerOne)
                return WinState.PlayerOneWon;
            if (allFieldsPlayerTwo)
                return WinState.PlayerTwoWon;
        }

        // diagonal
        if (this.fields[0][0] === this.fields[1][1] && this.fields[1][1] === this.fields[2][2]) {
            if (this.fields[1][1] === PlayerTurn.PlayerOne)
                return WinState.PlayerOneWon;
            else if (this.fields[1][1] === PlayerTurn.PlayerTwo)
                return WinState.PlayerTwoWon;
        }

        if (this.fields[2][0] === this.fields[1][1] && this.fields[1][1] === this.fields[0][2]) {
            if (this.fields[1][1] === PlayerTurn.PlayerOne)
                return WinState.PlayerOneWon;
            else if (this.fields[1][1] === PlayerTurn.PlayerTwo)
                return WinState.PlayerTwoWon;
        }

        // check for draw
        let isEveryFieldUsedUp = true;
        for (let j = 0; j < this.fields.length; j++) {
            for (let i = 0; i < this.fields[j].length; i++) {
                if (this.fields[i][j] === -1) {
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

    private calcFieldFromPosition(event: MouseEvent): Point {
        const canvasRect = this.canvasContext.canvas.getBoundingClientRect();

        const realX = event.clientX - canvasRect.left;
        const realY = event.clientY - canvasRect.top;

        let x = Math.floor(realX / this.canvasContext.canvas.width * 3);
        let y = Math.floor(realY / this.canvasContext.canvas.height * 3);

        if (x > 2) x = 2;
        if (y > 2) y = 2;
        if (x < 0) x = 0;
        if (y < 0) y = 0;

        return new Point(x, y);
    }

    private initFields(): void {
        this.fields = [];
        for (let i = 0; i < 3; i++) {
            this.fields[i] = [];
            for (let j = 0; j < 3; j++) {
                this.fields[i][j] = -1;
            }
        }
    }

    private isFieldEmpty(point: Point): boolean {
        return this.fields[point.x][point.y] === -1;
    }

    /* ###### */

    public getFields(): number[][] {
        return this.fields;
    }

    public isGameRunning(): boolean {
        return this.gameRunning;
    }

    public getCurrentPlayerTurn(): PlayerTurn {
        return this.playerOnTurn;
    }
}