import { GameManager } from "./GameManager";
import { PlayerTurn } from "./PlayerTurn";
import { WinState } from "./WinState";
import { Point } from "./Point";
import { deepClone } from "./util";

export class AI {
    private gameManager: GameManager;

    public constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    public makeTurn() {
        const ownPlayerTurn = this.gameManager.getCurrentPlayerTurn();
        const currentField = this.gameManager.getFields();
        console.log("Finding best turn");
        // const turn = this.evaluateBestTurn(currentField, ownPlayerTurn, 0);
        const turn = this.evalBestTurnWithNegaMiniMax(currentField, ownPlayerTurn, 4);
        this.gameManager.makeTurn(turn);
    }

    private evaluateBestTurn(field: number[][], currentPlayer: PlayerTurn, recursionDepth: number): Point {
        console.log(recursionDepth);

        const possiblePoints = this.getPossibleTurnsToPlayOnField(deepClone(field), currentPlayer);
        const otherPlayer = this.getOtherPlayer(currentPlayer);

        let currentHighestBoardValue: number = -1;
        let currentBestTurn: Point = new Point(-1, -1);
        for (let i = 0; i < possiblePoints.length; i++) {
            const possibleTurn = possiblePoints[i];

            // play the possible Turn
            const newField = this.getFieldWithTurnPlayedOnIt(deepClone(field), currentPlayer, possibleTurn);
            const boardState = this.gameManager.isGameOver(newField);

            let currentBoardValue = -1;

            if (boardState === WinState.NoOneWonYet) {
                // now let the other player find the best move
                const otherPlayersBestMove: Point = this.evaluateBestTurn(deepClone(newField), otherPlayer, recursionDepth + 1);
                const newestField = this.getFieldWithTurnPlayedOnIt(deepClone(newField), otherPlayer, otherPlayersBestMove);

                // check if we have found a new best turn
                currentBoardValue = this.calcBoardValue(deepClone(newestField), currentPlayer);

            } else {
                // console.log("Current move would end the game ...")
                // console.log("State is:")
                // console.log(field);
                // console.log(newField)
                // console.log(possibleTurn);
                // console.log(currentPlayer);
                // console.log("---")

                currentBoardValue = this.calcBoardValue(newField, currentPlayer);
            }

            if (currentBoardValue > currentHighestBoardValue) {
                currentHighestBoardValue = currentBoardValue;
                currentBestTurn = possibleTurn;
            }
        }

        if (currentBestTurn.x === -1 && currentBestTurn.y === -1) {
            // there is no best move
            // we always lose
            // make any move
            currentBestTurn = possiblePoints[0];
            // console.log("Every move results in a lost game :(");
        }

        // console.log("Best move to field:");
        // console.log(field);
        // console.log(currentBestTurn);
        // console.log(currentPlayer)
        // console.log("")

        return currentBestTurn;
    }

    private savedMove: Point = new Point(-1, -1);
    private evalBestTurnWithNegaMiniMax(field: number[][], currPlayer: PlayerTurn, depth: number) {
        this.negaMiniMax(currPlayer, field,10,7);
        return this.savedMove;
    }
    private negaMiniMax(currentPlayer: PlayerTurn, field: number[][], depth: number, desiredDepth: number): number {
        const possibleMoves = this.getPossibleTurnsToPlayOnField(field, currentPlayer);

        if (depth === 0 || possibleMoves.length === 0) {
            return this.calcBoardValue(field, currentPlayer);
        }

        let maxValue = -Infinity;
        for (let i = 0; i < possibleMoves.length; i++) {
            const currMove = possibleMoves[i];

            const newField = this.getFieldWithTurnPlayedOnIt(field, currentPlayer, currMove);
            const otherPlayer = this.getOtherPlayer(currentPlayer);
            const value = -this.negaMiniMax(otherPlayer, deepClone(newField), depth - 1, desiredDepth);
            if (value > maxValue) {
                maxValue = value;
                // if (depth === desiredDepth) {
                    this.savedMove = currMove;
                // }
            }
        }
        return maxValue;
    }

    private calcBoardValue(field: number[][], currentTurn: PlayerTurn): number {
        const gameState = this.gameManager.isGameOver(field);
        if (gameState === WinState.Draw || gameState === WinState.NoOneWonYet) {
            return 0;
        } else if (gameState === WinState.PlayerOneWon && currentTurn === PlayerTurn.PlayerOne) {
            return 1;
        } else if (gameState === WinState.PlayerTwoWon && currentTurn === PlayerTurn.PlayerTwo) {
            return 1;
        } else {
            return -1; // lost
        }
    }

    private getPossibleTurnsToPlayOnField(field: number[][], currentTurn: PlayerTurn): Point[] {
        let points: Point[] = [];

        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                if (field[i][j] === -1) {
                    points.push(new Point(i, j));
                }
            }
        }

        return points;
    }

    private getOtherPlayer(currentPlayer: PlayerTurn): PlayerTurn {
        if (currentPlayer === PlayerTurn.PlayerOne)
            return PlayerTurn.PlayerTwo;
        else
            return PlayerTurn.PlayerOne;
    }

    private getFieldWithTurnPlayedOnIt(field: number[][], playerTurnWhichPlayes: PlayerTurn, pointToPlay: Point): number[][] {
        field[pointToPlay.x][pointToPlay.y] = playerTurnWhichPlayes;
        return deepClone(field);
    }
}