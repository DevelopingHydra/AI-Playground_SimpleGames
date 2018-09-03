import { Vector } from "./Vector";

export class MathHelper {
    public static getRandomAngle(): number {
        return Math.random() * Math.PI * 2;
    }

    public static getRandomVector(): Vector {
        return Vector.fromAngle(this.getRandomAngle());
    }
}