import { Point } from "./Point";
import { PlayerTurn } from "./PlayerTurn";

// export function getPossibleTurnsToPlayOnField(field: number[][], currentTurn: PlayerTurn): Point[] {
//     let points: Point[] = [];

//     for (let i = 0; i < field.length; i++) {
//         for (let j = 0; j < field[i].length; j++) {
//             if (field[i][j] === -1) {
//                 points.push(new Point(i, j));
//             }
//         }
//     }

//     return points;
// }

export function getOtherPlayer(currentPlayer: PlayerTurn): PlayerTurn {
    if (currentPlayer === PlayerTurn.PlayerOne)
        return PlayerTurn.PlayerTwo;
    else
        return PlayerTurn.PlayerOne;
}

// export function getFieldWithTurnPlayedOnIt(field: number[][], playerTurnWhichPlayes: PlayerTurn, pointToPlay: Point): number[][] {
//     const newField = deepClone(field);
//     newField[pointToPlay.x][pointToPlay.y] = playerTurnWhichPlayes;
//     return newField;
// }

// export function getFieldWithTurnUndone(field: number[][], turnToUndo: Point): number[][] {
//     const newField = deepClone(field);
//     newField[turnToUndo.x][turnToUndo.y] = -1;
//     return newField;
// }

export function deepCloneJSON(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
}

// export function deepClone(obj:object):object{
//     return Object.create(obj);
// }