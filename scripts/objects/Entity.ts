import { Engine } from "../engine/Engine.js";
import { Vector } from "../utils/Vector.js";

export class Entity{
    public position: Vector;
    public size: number;
    public color: string;

    constructor(position: Vector, size: number, color: string){
        this.position = position;
        this.size = size;
        this.color = color;

        // Store the entity in the engine's entity list
        Engine.getInstance().ENTITIES.push(this);
    }

    render(){
        Engine.getInstance().DRAW.Circle(this.position, this.size, this.color);
    }
}