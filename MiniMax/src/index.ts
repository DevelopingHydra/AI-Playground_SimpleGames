import { OutputManager } from "./OutputManager";
import { GameManager } from "./GameManager";
import { Player } from "./Players/Player";

const canvas = document.querySelector<HTMLCanvasElement>("canvas");
const infoElement = document.querySelector<HTMLElement>("#info");

if (canvas !== null && infoElement !== null) {
    const canvasContext = canvas.getContext("2d");

    if (canvasContext !== null) {
        const outputManager: OutputManager = new OutputManager(infoElement);
        const gameManager: GameManager = new GameManager(outputManager, canvasContext);

        const btnNewGame = <HTMLDivElement>document.getElementById("newGame");
        const btnCanvasClick = <HTMLCanvasElement>document.getElementById("gameCanvas");
        const selectPlayerOne = <HTMLSelectElement>document.getElementById("onSelectPlayerOne");
        const selectPlayerTwo = <HTMLSelectElement>document.getElementById("onSelectPlayerTwo");

        if (btnCanvasClick !== null && btnNewGame !== null && selectPlayerOne !== null) {
            btnNewGame.onclick = () => gameManager.newGame();
            btnCanvasClick.onclick = (e: MouseEvent) => gameManager.onCanvasClick(e);
            selectPlayerOne.onchange = (e: Event) => {
                if (e !== null && e.target !== null) {
                    
                }
            };
            gameManager.setShouldAIMakeNextMove(selectPlayerOne.checked);

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

function convertPlayerStringToPlayer(str:string):Player{
    switch(str){
        case 
    }
}