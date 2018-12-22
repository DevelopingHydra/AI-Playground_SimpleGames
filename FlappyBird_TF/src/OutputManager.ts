export interface OutputManager {
    writeFPS(fps: number): void;
    writeAppendMessage(message: string): void;
}

export class OutputManager implements OutputManager {
    private eContainer: Element;
    private eTurn: Element;
    private eFPS: Element;
    private eTextarea: HTMLTextAreaElement;

    constructor(outputElement: Element) {
        this.eContainer = outputElement;

        this.eTurn = document.createElement("span");
        this.eContainer.appendChild(this.eTurn);

        this.eFPS = document.createElement("span");
        this.eContainer.appendChild(this.eFPS);

        this.eTextarea = document.createElement("textarea");
        this.eContainer.appendChild(this.eTextarea);
    }

    public writeFPS(fps: number): void {
        this.eFPS.innerHTML = "FPS: " + fps;
    }

    public writeAppendMessage(message: string): void {
        this.eTextarea.innerHTML += message + "\n";
        this.scrollTextareaToBottom(this.eTextarea);
    }

    private scrollTextareaToBottom(textarea: HTMLTextAreaElement): void {
        textarea.scrollTop = textarea.scrollHeight;
    }
}