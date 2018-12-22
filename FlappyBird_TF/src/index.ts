import { GameLoader } from "./GameLoader";

const canvas = document.querySelector<HTMLCanvasElement>("canvas");
const infoElement = document.querySelector<HTMLDivElement>("#info");

const btnNewGame = <HTMLDivElement>document.getElementById("newGame");
const btnCanvasClick = <HTMLCanvasElement>document.getElementById("gameCanvas");

const documentForClick = <HTMLDocument>document;


if (canvas !== null && infoElement !== null) {
    if (btnCanvasClick !== null && btnNewGame !== null&&documentForClick!==null) {
        const canvasContext = canvas.getContext("2d");

        if (canvasContext !== null) {
            const gameLoader = new GameLoader(
                canvasContext,
                infoElement,
                btnNewGame,
                btnCanvasClick,
                documentForClick
            );
            gameLoader.startGame();
        } else {
            console.error("Unable to get the Context from the canvas");
        }
    } else {
        console.error("Unable to attach listeners to the buttons");
    }
} else {
    console.error("Unable to find the canvas and output elements");
}
