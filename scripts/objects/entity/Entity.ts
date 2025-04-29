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

    update(): void{
        
    }

    // NOTE: Not the ideal way of doing this, i don't want to have
    render(debug: boolean = false): void{
        Draw.Circle({
            position: this.position,
            size: this.size,
            fill: {
                color: this.color
            }
        });

        if(!debug) return;

        // Show coordinates
        Draw.Text({
            text: `Pos: ${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 80),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });

        // Show velocity
        Draw.Text({
            text: `Vel: ${this.velocity.x.toFixed(1)}, ${this.velocity.y.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 65),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });

        // Show acceleration
        Draw.Text({
            text: `Acc: ${this.acceleration.x.toFixed(1)}, ${this.acceleration.y.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 50),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });

        // Show max speed
        Draw.Text({
            text: `Max vel: ${this.maxSpeed.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 35),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });

        // Draw the velocity vector
        Draw.Line({
            start: this.position.toScreenCoordinate(),
            end: Coordinates.GameCoordinateToScreenCoordinate(this.velocity.setMagnitude(30).add(this.position)),
            stroke: {
                color: "black",
                width: 2
            },
        });
    };
}