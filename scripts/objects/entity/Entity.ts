import { Engine } from "../../engine/Engine.js";
import { GameCoordinate } from "../../engine/type/Coordinates.js";
import { Mouse } from "../../utils/Mouse.js";
import { Vector } from "../../utils/Vector.js";

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

    update(): void{
        // Get the mouse position and convert it to the same coordinate system as the entity.
        let mousePosition = Mouse.getInstance().position;
        let mouseInGame = mousePosition.toGameCoordinate();

        // Calculate the acceleration towards the mouse position.
        this.acceleration = mouseInGame.subtract(this.position).setMagnitude(0.1);
        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);

        // Update the position based on the velocity.
        let newPos = this.position.add(this.velocity);
        this.position = new GameCoordinate(newPos.x, newPos.y);
    }

    // NOTE: Not the ideal way of doing this, i don't want to have to add optionally all possible methods that entity can be composed with.
    
    render?(): void;
}