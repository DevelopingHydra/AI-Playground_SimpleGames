import { Move } from "./Move";
import { Point } from "../Point";
import { WinState } from "../../WinState";
import { PlayerTurn } from "../PlayerTurn";

export interface IBoard {
    makeMove(move: Move): boolean;
    undoMove(move: Move): boolean;
    resetBoard(): void;
    isFieldEmpty(point: Point): boolean;
    isGameOver(): WinState;
    resetBoard(): void;

    getPossibleTurnsToPlayOnField(currentTurn: PlayerTurn): Move[];

    getFields(): number[][];
    setFields(fields: number[][]): void;

    clone(): IBoard;
}