import { IBoard } from "./Board";
import { Move } from "./Move";
import { Point } from "../Players/Point";
import { PlayerTurn } from "../Players/PlayerTurn";
import { WinState } from "../WinState";
import { deepCloneJSON } from "../Players/util";

export class TicTacToeBoard implements IBoard {
    private fields: number[][] = [];

    private noPlayerValue = -1;

    constructor() {
        this.initFields();
    }

    public makeMove(move: Move): boolean {
        const point: Point = move.getPosition();
        if (this.isFieldEmpty(point)) {
            this.fields[point.x][point.y] = move.getTurn();
            // console.info("making move: " + point);
            return true;
        } else {
            return false;
        }
    }

    public undoMove(move: Move): boolean {
        const point: Point = move.getPosition();
        this.fields[point.x][point.y] = this.noPlayerValue;
        return true;
    }

    public resetBoard(): void {
        this.initFields();
    }

    public isFieldEmpty(point: Point): boolean {
        return this.fields[point.x][point.y] === this.noPlayerValue;
    }

    public getPossibleTurnsToPlayOnField(currentTurn: PlayerTurn): Move[] {
        let moves: Move[] = [];

        for (let i = 0; i < this.fields.length; i++) {
            for (let j = 0; j < this.fields[i].length; j++) {
                if (this.fields[i][j] === this.noPlayerValue) {
                    const point = new Point(i, j);
                    const move = new Move(point, currentTurn);
                    moves.push(move);
                }
            }
        }

        return moves;
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
                if (this.fields[i][j] === this.noPlayerValue) {
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
                this.fields[i][j] = this.noPlayerValue;
            }
        }

        // todo test
        this.fields = [[1, 2, -1], [-1, 1, 2], [-1, -1, -1]];
    }

    public clone(): IBoard {
        const clonedBoard = <IBoard>Object.create(this);
        clonedBoard.setFields(this.getFields());
        return clonedBoard;
    }

    /* ########### */

    public getFields(): number[][] {
        return deepCloneJSON(this.fields);
    }

    public setFields(fields: number[][]): void {
        this.fields = deepCloneJSON(fields);
    }
}