import { GameLoader } from "./GameLoader";

const canvas = document.querySelector<HTMLCanvasElement>("canvas");
const infoElement = document.querySelector<HTMLDivElement>("#info");

const outputPlayerOne = <HTMLDivElement>document.getElementById("output-playerOne");
const outputPlayerTwo = <HTMLDivElement>document.getElementById("output-playerTwo");

const btnNewGame = <HTMLDivElement>document.getElementById("newGame");
const btnCanvasClick = <HTMLCanvasElement>document.getElementById("gameCanvas");

const selectPlayerOne = <HTMLSelectElement>document.getElementById("onSelectPlayerOne");
const selectPlayerTwo = <HTMLSelectElement>document.getElementById("onSelectPlayerTwo");

if (canvas !== null && infoElement !== null && outputPlayerOne !== null && outputPlayerTwo !== null) {
    if (btnCanvasClick !== null && btnNewGame !== null && selectPlayerOne !== null) {
        const canvasContext = canvas.getContext("2d");

        if (canvasContext !== null) {
            const gameLoader = new GameLoader(
                canvasContext,
                outputPlayerOne,
                outputPlayerTwo,
                infoElement,
                btnNewGame,
                btnCanvasClick,
                selectPlayerOne,
                selectPlayerTwo
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
