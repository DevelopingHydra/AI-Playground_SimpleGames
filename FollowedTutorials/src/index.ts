import { GameManager } from "./GameManager";

const canvas = document.querySelector<HTMLCanvasElement>("canvas");

const fpsOutputElement = document.querySelector<HTMLDivElement>("#fps");
const generationOutputElement = document.querySelector<HTMLDivElement>("#generation");

const levelSelect = document.querySelector<HTMLSelectElement>("#control-level");
const btnStop = document.querySelector<HTMLDivElement>("#control-stop");
const btnStart = document.querySelector<HTMLDivElement>("#control-start");
const fpsSlider = document.querySelector<HTMLInputElement>("#control-fpsSlider");


if (
    canvas !== null
    && fpsOutputElement !== null
    && generationOutputElement !== null
    && levelSelect !== null
    && btnStop !== null
    && btnStart !== null
    && fpsSlider !== null
) {
    const canvasContext = canvas.getContext("2d");
    if (canvasContext !== null) {
        const gm = new GameManager(canvasContext, fpsOutputElement, generationOutputElement);

        gm.loadLevel(parseInt(levelSelect.value));

        btnStop.onclick = () => gm.stopGame();
        btnStart.onclick = () => gm.startGame();

        fpsSlider.oninput = (e) => {
            const target = <HTMLInputElement>e.target;
            gm.setFPS(parseInt(target.value));
        }

        levelSelect.onchange = (e) => {
            const target = <HTMLSelectElement>e.target;
            gm.loadLevel(parseInt(target.value));
        }
    }
} else {
    console.error("Some elements were not found on this site!")
}
