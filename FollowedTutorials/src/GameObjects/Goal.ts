import { GameObject } from "./GameObject";
import { Vector } from "../Vector";
import { AIDot } from "./AIDot";
import { Ball } from "./Ball";

export class Goal extends Ball {
    public constructor(position: Vector) {
        super(position);
        this.position = position;

        this.size = 10;
        this.color = "red";
    }


    public move(): void {
    }
}