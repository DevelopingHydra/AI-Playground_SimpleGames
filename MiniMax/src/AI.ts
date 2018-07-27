import { GameManager } from "./GameManager";
import { PlayerTurn } from "./PlayerTurn";
import { WinState } from "./WinState";
import { Point } from "./Point";

export class AI {
    private gameManager: GameManager;

    // private ownPlayerTurn: PlayerTurn = PlayerTurn.PlayerTwo;

    public constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    public makeTurn() {
        const ownPlayerTurn = this.gameManager.getCurrentPlayerTurn();
        const currentField = this.gameManager.getFields();
        const turn = this.evaluateBestTurn(currentField, ownPlayerTurn);
        this.gameManager.makeTurn(turn.x, turn.y);
    }

    private evaluateBestTurn(field: number[][], currentTurn: PlayerTurn): Point {
        return new Point(0, 0);
    }

    private calcBoardValue(currentTurn: PlayerTurn): number {
        const gameState = this.gameManager.isGameOver();
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

    private getPossibleTurns(field: number[][], currentTurn: PlayerTurn): Point[] {
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
}