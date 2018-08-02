import { Player } from "./Player";
import { PlayerTurn } from "./PlayerTurn";
import { Point } from "./Point";
import { WinState } from "../WinState";
import { IBoard } from "../Board/Board";
import { Move } from "../Board/Move";
import { getOtherPlayer } from "./util";

export class MyNegaMaxImplementation extends Player {

    public onIsOnTurn(): void {
        console.log("Finding best turn");

        const ownPlayerTurn = this.gameManager.getCurrentPlayerTurn();
        const currentField: IBoard = this.gameManager.getBoard();
        const turn = this.evaluateBestTurn(currentField, ownPlayerTurn, 0, 7);

        if (turn === null) {
            throw new Error("Unable to find best move!");
        } else {
            this.gameManager.makeTurn(turn);
        }
    }

    private evaluateBestTurn(board: IBoard, currentPlayer: PlayerTurn, currRecursionDepth: number, maxRecursionDepth: number): Move | null {
        const currentBoard = board.clone();
        const possibleMoves = currentBoard.getPossibleTurnsToPlayOnField(currentPlayer);
        const otherPlayer = getOtherPlayer(currentPlayer);

        let currentHighestBoardValue: number = -1;
        let currentBestMove: Move | null = null;
        for (let i = 0; i < possibleMoves.length; i++) {
            const currentMove = possibleMoves[i];

            // play the possible Turn
            const newBoard = currentBoard.clone();
            newBoard.makeMove(currentMove);
            // const newField = currentBoard.getFieldWithTurnPlayedOnIt(currentPlayer, currentMove);
            const boardState = newBoard.isGameOver();

            let currentBoardValue = -1;

            if (boardState === WinState.NoOneWonYet) {
                // now let the other player find the best move
                if (currRecursionDepth < maxRecursionDepth) {
                    const newestBoard = newBoard.clone();
                    const otherPlayersBestMove: Move | null = this.evaluateBestTurn(newestBoard, otherPlayer, currRecursionDepth + 1, maxRecursionDepth);
                    if (otherPlayersBestMove !== null) {
                        newestBoard.makeMove(otherPlayersBestMove);

                        // check if we have found a new best turn
                        currentBoardValue = this.calcBoardValue(newestBoard, currentPlayer);
                    }
                }

            } else {
                // console.log("Current move would end the game ...")
                // console.log("State is:")
                // console.log(field);
                // console.log(newField)
                // console.log(possibleTurn);
                // console.log(currentPlayer);
                // console.log("---")

                currentBoardValue = this.calcBoardValue(newBoard, currentPlayer);
            }

            if (currentBoardValue > currentHighestBoardValue) {
                currentHighestBoardValue = currentBoardValue;
                currentBestMove = currentMove;
            }
        }

        if (currentBestMove === null && possibleMoves.length > 0) {
            // there is no best move
            // we always lose
            // make any move
            currentBestMove = possibleMoves[0];
            // console.log("Every move results in a lost game :(");
        }

        // console.log("Best move to field:");
        // console.log(field);
        // console.log(currentBestTurn);
        // console.log(currentPlayer)
        // console.log("")

        return currentBestMove;
    }

    private calcBoardValue(board: IBoard, currentTurn: PlayerTurn): number {
        const gameState = board.isGameOver();
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

}