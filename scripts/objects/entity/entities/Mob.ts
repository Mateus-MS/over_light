import { GameCoordinate } from "../../../engine/type/Coordinates.js";
import { renderEntity } from "../components/render.js";
import { Entity } from "../Entity.js";

export class Mob extends Entity{
    constructor(position: GameCoordinate){
        super(position, 20, "blue");
    }

    public override update(): void{
        renderEntity(this);
    }
}