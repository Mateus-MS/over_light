import { GameCoordinate } from "../../../engine/type/Coordinates.js";
import { Actor } from "../Actor.js";

export class Mob extends Actor{
    constructor(position: GameCoordinate){
        super(position, 20, "blue");
    }
}