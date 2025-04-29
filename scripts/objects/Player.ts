import { GameCoordinate } from "../engine/type/Coordinates.js";
import { Renderable } from "./entity/components/render.js";
import { Entity } from "./entity/Entity.js";

@Renderable(true)
export class Player extends Entity {
    constructor(position: GameCoordinate){
        super(position, 20, "red");
    }
}