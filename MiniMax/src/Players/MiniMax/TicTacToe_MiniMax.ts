import { MiniMaxAI } from "./MiniMaxAI";
import { IBoard } from "../../Board/Board";
import { WinState } from "../../WinState";
import { PlayerTurn } from "../PlayerTurn";

export class TicTacToeMiniMax extends MiniMaxAI {
    protected evalBoardValue(currentTurn: PlayerTurn, board: IBoard): number {
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