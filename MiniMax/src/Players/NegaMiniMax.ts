import { GameManager } from "../GameManager";
import { PlayerTurn } from "./PlayerTurn";
import { WinState } from "../WinState";
import { Point } from "./Point";
import {  getOtherPlayer } from "./util";
import { Player } from "./Player";
import { Move } from "../Board/Move";
import { IBoard } from "../Board/Board";

export class NegaMiniMax extends Player {

    public onIsOnTurn(): void {
        // const ownPlayerTurn = this.gameManager.getCurrentPlayerTurn();
        // const currentField = this.gameManager.getFields();
        // console.log("Finding best turn");
        // const turn = this.evalBestTurnWithNegaMiniMax(currentField, ownPlayerTurn, 4);
        // this.gameManager.makeTurn(turn);

        const field = this.gameManager.getBoard();
        const currentPlayer = this.gameManager.getCurrentPlayerTurn();

        let score = -1;
        let bestMove: Move = new Move(new Point(-1, -2), currentPlayer);

        const availableMoves: Move[] = field.getPossibleTurnsToPlayOnField(currentPlayer);
        for (let i = 0; i < availableMoves.length; i++) {
            const currentMove = availableMoves[i];
            const newField = field.clone();
            newField.makeMove(currentMove);
            const newScore = this.negamax(newField, currentPlayer);
            if (newScore >= score) {
                score = newScore;
                bestMove = currentMove;
            }
        }

        console.log("best move:")
        console.log(bestMove)
        this.gameManager.makeTurn(bestMove);
    }

    private negamax(field: IBoard, currentPlayer: PlayerTurn): number {
        const gameState = field.isGameOver();
        if (gameState === WinState.PlayerOneWon || gameState === WinState.PlayerTwoWon)
            return 1;
        else if (gameState === WinState.Draw)
            return 0;

        let worst = 1;

        const otherPlayer = getOtherPlayer(currentPlayer);
        const possibleMoves = field.getPossibleTurnsToPlayOnField(otherPlayer);
        for (let i = 0; i < possibleMoves.length; i++) {
            const currentPossibleMove = possibleMoves[i];
            const newField = field.clone();
            newField.makeMove(currentPossibleMove);
            let value = -this.negamax(newField, otherPlayer);
            if (value < worst) {
                worst = value;
            }
        }

        return worst;
    }




    // private savedMove: Point = new Point(-1, -1);
    // private evalBestTurnWithNegaMiniMax(field: number[][], currPlayer: PlayerTurn, depth: number) {
    //     this.negaMiniMax(currPlayer, field, 10, 7);
    //     return this.savedMove;
    // }
    // private negaMiniMax(currentPlayer: PlayerTurn, field: number[][], depth: number, desiredDepth: number): number {
    //     const possibleMoves = getPossibleTurnsToPlayOnField(field, currentPlayer);

    //     if (depth === 0 || possibleMoves.length === 0) {
    //         return this.calcBoardValue(field, currentPlayer);
    //     }

    //     let maxValue = -Infinity;
    //     for (let i = 0; i < possibleMoves.length; i++) {
    //         const currMove = possibleMoves[i];

    //         const newField = getFieldWithTurnPlayedOnIt(field, currentPlayer, currMove);
    //         const otherPlayer = getOtherPlayer(currentPlayer);
    //         const value = -this.negaMiniMax(otherPlayer, deepClone(newField), depth - 1, desiredDepth);
    //         if (value > maxValue) {
    //             maxValue = value;
    //             if (depth === desiredDepth) {
    //                 this.savedMove = currMove;
    //             }
    //         }
    //     }
    //     return maxValue;
    // }

    // private calcBoardValue(field: number[][], currentTurn: PlayerTurn): number {
    //     const gameState = this.gameManager.isGameOver(field);
    //     if (gameState === WinState.Draw || gameState === WinState.NoOneWonYet) {
    //         return 0;
    //     } else if (gameState === WinState.PlayerOneWon && currentTurn === PlayerTurn.PlayerOne) {
    //         return 1;
    //     } else if (gameState === WinState.PlayerTwoWon && currentTurn === PlayerTurn.PlayerTwo) {
    //         return 1;
    //     } else {
    //         return -1; // lost
    //     }
    // }

}