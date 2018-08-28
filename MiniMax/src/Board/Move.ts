import { Point } from "../Players/Point";
import { PlayerTurn } from "../Players/PlayerTurn";

export class Move {
    private position: Point;
    private turn: PlayerTurn;

    constructor(position: Point, turn: PlayerTurn) {
        this.position = position;
        this.turn = turn;
    }

    public getPosition(): Point {
        return this.position;
    }

    public getTurn(): PlayerTurn {
        return this.turn;
    }
}