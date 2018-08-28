import { Player } from "../Player";
import { PlayerTurn } from "../PlayerTurn";
import { OutputManager } from "../../OutputManager";
import { GameManager } from "../../GameManager";
import { IBoard } from "../../Board/Board";
import { Move } from "../../Board/Move";
import { getOtherPlayer } from "../util";

export abstract class MiniMaxAI extends Player {
    private savedMove: Move | null = null;
    private desiredDepth = 15;

    public onIsOnTurn(): void {
        this.savedMove = null;

        console.log("finding best move");
        const value: number = this.max(this.ownPlayerTurn, this.desiredDepth);
        console.log("found move with value of: " + value);

        if (this.savedMove === null) {
            // no more moves possible
            console.log("no moves possible");
        } else {
            this.gameManager.makeTurn(this.savedMove);
        }
    }

    private  getBestMove():Move{
        
    }

    private max(playerTurn: PlayerTurn, depth: number): number {
        const board = this.gameManager.getBoard();
        const possibleMoves: Move[] = board.getPossibleTurnsToPlayOnField(playerTurn);

        if (depth === 0 || possibleMoves.length === 0) {
            return this.evalBoardValue(playerTurn, board);
        }

        let maxValue: number = -Infinity;
        for (const move of possibleMoves) {
            board.makeMove(move);
            const value: number = this.min(getOtherPlayer(playerTurn), depth - 1);
            board.undoMove(move);
            if (value > maxValue) {
                maxValue = value;
                if (depth == this.desiredDepth) {
                    this.savedMove = move;
                }
            }
        }

        return maxValue;
    }

    private min(playerTurn: PlayerTurn, depth: number): number {
        const board = this.gameManager.getBoard();
        const possibleMoves: Move[] = board.getPossibleTurnsToPlayOnField(playerTurn);

        if (depth === 0 || possibleMoves.length === 0) {
            return this.evalBoardValue(playerTurn, board);
        }

        let minValue: number = Infinity;
        for (const move of possibleMoves) {
            board.makeMove(move);
            const value: number = this.max(getOtherPlayer(playerTurn), depth - 1);
            board.undoMove(move);
            if (value > minValue) {
                minValue = value;
                // if (depth == 3) {
                //     this.savedMove = move;
                // }
            }
        }

        return minValue;
    }

    protected abstract evalBoardValue(currentTurn: PlayerTurn, board: IBoard): number;
}