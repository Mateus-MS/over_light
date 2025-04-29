import { Engine } from "../../engine/Engine.js";
import { Coordinates, GameCoordinate } from "../../engine/type/Coordinates.js";
import { Draw } from "../../utils/Draw.js";
import { Mouse } from "../../utils/Mouse.js";
import { Vector } from "../../utils/Vector.js";

/**
 * Entity class represent objects that can be drawed on the screen.
 */
export class Entity{
    public position: GameCoordinate;
    public size: number;
    public color: string;

    public velocity: Vector = new Vector(0, 0);
    public acceleration: Vector = new Vector(0, 0);
    public maxSpeed: number = 5;

    constructor(position: GameCoordinate, size: number, color: string){
        this.position = position;
        this.size = size;
        this.color = color;

        // Store the entity in the engine's entity list
        Engine.getInstance().ENTITIES.push(this);
    }

    public update?(): void;
}