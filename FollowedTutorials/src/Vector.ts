export class Vector {
    public x: number;
    public y: number;
    public limit: number = Infinity;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static fromAngle(radians: number): Vector {
        return new Vector(Math.cos(radians), Math.sin(radians));
    }

    public add(otherVector: Vector): void {
        const newX = Math.min(this.x + otherVector.x, this.limit);
        const newY = Math.min(this.y + otherVector.y, this.limit);

        this.x = newX;
        this.y = newY;
    }

    public setLimit(limit: number): void {
        this.limit = limit;
    }

    public distanceTo(otherVector: Vector): number {
        const sideLengthA = this.x - otherVector.x;
        const sideLengthB = this.y - otherVector.y;
        const sideLengthC = Math.sqrt(Math.pow(sideLengthA, 2) + Math.pow(sideLengthB, 2));
        return sideLengthC;
    }

}