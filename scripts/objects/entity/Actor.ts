import { GameCoordinate } from "../../engine/type/Coordinates.js";
import { Entity } from "./Entity.js";

export class Actor extends Entity{
    constructor(position: GameCoordinate, size: number, color: string){
        super(position, size, color);
    }

    public move(): void{
        console.log("Moving actor...");
    }
}