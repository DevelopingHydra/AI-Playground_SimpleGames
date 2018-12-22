export interface GameObject {
    updateMovement(timePassed: number): void;
    draw(): void;
}