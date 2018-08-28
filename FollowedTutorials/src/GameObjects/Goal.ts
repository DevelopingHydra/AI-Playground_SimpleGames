import { GameObject } from "./GameObject";
import { Vector } from "../Vector";
import { Dot } from "./Dot";

export class Goal extends Dot {
    public constructor(position: Vector) {
        super();
        this.position = position;

        this.size = 10;
        this.color = "red";
    }


}