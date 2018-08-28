import { BoardManager } from "./BoardManager";
import { Dot } from "./GameObjects/Dot";
import { Population } from "./GameObjects/Population";
import { Goal } from "./GameObjects/Goal";
import { Vector } from "./Vector";

const canvas = document.querySelector<HTMLCanvasElement>("canvas");
const fpsOutputElement = document.querySelector<HTMLDivElement>("#fps");

if (canvas !== null && fpsOutputElement !== null) {
    const canvasContext = canvas.getContext("2d");
    if (canvasContext !== null) {
        const boardManager = new BoardManager(canvasContext, fpsOutputElement);
        boardManager.startGame();

        const testDot = new Population(100);
        const goal = new Goal(new Vector(400, 10));
        boardManager.addGameObject(testDot);
        boardManager.addGameObject(goal)
    }
}