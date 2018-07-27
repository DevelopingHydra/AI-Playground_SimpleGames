import { OutputManager } from "./OutputManager";
import { GameManager } from "./GameManager";

const canvas = document.querySelector<HTMLCanvasElement>("canvas");
const infoElement = document.querySelector<HTMLElement>("#info");

if (canvas !== null && infoElement !== null) {
    const canvasContext = canvas.getContext("2d");

    if (canvasContext !== null) {
        const outputManager: OutputManager = new OutputManager(infoElement);
        const gameManager: GameManager = new GameManager(outputManager, canvasContext);

        const btnNewGame = <HTMLDivElement>document.getElementById("newGame");
        const btnCanvasClick = <HTMLCanvasElement>document.getElementById("gameCanvas");
        const cbShouldAIMakeNextMove = <HTMLInputElement>document.getElementById("cbShouldAIMakeMove");

        if (btnCanvasClick !== null && btnNewGame !== null && cbShouldAIMakeNextMove !== null) {
            btnNewGame.onclick = () => gameManager.newGame();
            btnCanvasClick.onclick = (e: MouseEvent) => gameManager.onCanvasClick(e);
            cbShouldAIMakeNextMove.onclick = (e: MouseEvent) => {
                if (e !== null && e.target !== null) {
                    const cb = <HTMLInputElement>e.target;
                    gameManager.setShouldAIMakeNextMove(cb.checked);
                }
            };
            gameManager.setShouldAIMakeNextMove(cbShouldAIMakeNextMove.checked);

            // todo remove
            btnNewGame.click();
        } else {
            console.error("Unable to attach listeners to the buttons");
        }
    } else {
        console.error("Unable to get the Context from the canvas");
    }
} else {
    console.error("Unable to find the canvas and output element");
}
