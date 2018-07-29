import { PlayerTurn } from "./Players/PlayerTurn";

export interface OutputManager {
    writeFPS(fps: number): void;
    writeTurn(turn: PlayerTurn): void;
    writeAppendMessage(message: string): void;
}

export class OutputManager implements OutputManager {
    private eContainer: Element;
    private eTurn: Element;
    private eFPS: Element;
    private eTextarea: Element;

    constructor(outputElement: Element) {
        this.eContainer = outputElement;

        this.eTurn = document.createElement("span");
        this.eContainer.appendChild(this.eTurn);

        this.eFPS = document.createElement("span");
        this.eContainer.appendChild(this.eFPS);

        this.eTextarea = document.createElement("textarea");
        this.eContainer.appendChild(this.eTextarea);
    }


    writeFPS(fps: number): void {
        this.eFPS.innerHTML = "FPS: " + fps;
    }
    writeTurn(turn: PlayerTurn): void {
        if (turn === PlayerTurn.PlayerOne) {
            this.eTurn.innerHTML = "X"
        } else {
            this.eTurn.innerHTML = "O";
        }
    }
    writeAppendMessage(message: string): void {
        this.eTextarea.innerHTML += message + "\n";
        this.eTextarea.scrollTop = this.eTextarea.scrollHeight;
    }
}