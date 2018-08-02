import { Player } from "./Player";
import { Point } from "./Point";
import { Move } from "../Board/Move";

export class Human extends Player {

    // private amOnTurn: boolean = false;

    public onClick(event: MouseEvent, canvasContext: CanvasRenderingContext2D): void {
        // if (this.amOnTurn) {
        const clickedField = this.calcFieldFromPosition(event, canvasContext);
        const move = new Move(clickedField, this.ownPlayerTurn);
        this.gameManager.makeTurn(move);
        // }
    }

    public onMouseMove(event: MouseEvent, canvasContext: CanvasRenderingContext2D): void {
        // do nothing
    }

    public onIsOnTurn(): void {
        // this.amOnTurn = true;
    }


    private calcFieldFromPosition(event: MouseEvent, canvasContext: CanvasRenderingContext2D): Point {
        const canvasRect = canvasContext.canvas.getBoundingClientRect();

        const realX = event.clientX - canvasRect.left;
        const realY = event.clientY - canvasRect.top;

        let x = Math.floor(realX / canvasContext.canvas.width * 3);
        let y = Math.floor(realY / canvasContext.canvas.height * 3);

        if (x > 2) x = 2;
        if (y > 2) y = 2;
        if (x < 0) x = 0;
        if (y < 0) y = 0;

        return new Point(x, y);
    }

}