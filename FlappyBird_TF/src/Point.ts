export class Point {
    public x: number;
    public y: number;

    private limit: number = Infinity;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public add(other: Point) {
        this.x += other.x;
        this.y += other.y;

        this.clipToLimit();
    }

    public mult(factor: number): void {
        this.x *= factor;
        this.y *= factor;

        this.clipToLimit();
    }

    public multNew(factor: number): Point {
        return new Point(this.x * factor, this.y * factor);
    }

    private clipToLimit() {
        if (Math.abs(this.x) > Math.abs(this.limit)) {
            this.x = this.x > 0 ? this.limit : -this.limit;
        }
        if (Math.abs(this.y) > Math.abs(this.limit)) {
            this.y = this.y > 0 ? this.limit : -this.limit;
        }
    }

    public toString(): string {
        return `[${this.x}, ${this.y}]`;
    }

    /* ### */

    public setLimit(limit: number) {
        this.limit = limit;
    }
}