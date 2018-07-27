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
        const turn = this.evaluateBestTurn(currentField, ownPlayerTurn);
        this.gameManager.makeTurn(turn);
    }

    private evaluateBestTurn(field: number[][], currentPlayer: PlayerTurn): Point {
        const possiblePoints = this.getPossibleTurnsToPlayOnField(deepClone(field), currentPlayer);
        const otherPlayer = this.getOtherPlayer(currentPlayer);

        let currentHighestBoardValue: number = -1;
        let currentBestTurn: Point = new Point(-1, -1);
        for (let i = 0; i < possiblePoints.length; i++) {
            const possibleTurn = possiblePoints[i];
            // play the possible Turn
            const newField = this.getFieldWithTurnPlayedOnIt(deepClone(field), currentPlayer, possibleTurn);
            let currentBoardValue = this.calcBoardValue(newField, currentPlayer);
            if (currentBoardValue > currentHighestBoardValue) {
                currentHighestBoardValue = currentBoardValue;
                currentBestTurn = possibleTurn;
                break;
            }
            // now let the other player find the best move
            const otherPlayersBestMove: Point = this.evaluateBestTurn(deepClone(newField), otherPlayer);
            const newestField = this.getFieldWithTurnPlayedOnIt(deepClone(newField), otherPlayer, otherPlayersBestMove);
            // check if we have found a new best turn
            currentBoardValue = this.calcBoardValue(deepClone(newestField), currentPlayer);
            if (currentBoardValue > currentHighestBoardValue) {
                currentHighestBoardValue = currentBoardValue;
                currentBestTurn = possibleTurn;
            }
        }



        return currentBestTurn;
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