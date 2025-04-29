import { Engine } from "../engine/Engine.js";
import { Coordinates, GameCoordinate } from "../engine/type/Coordinates.js";
import { Draw } from "../utils/Draw.js";
import { Mouse } from "../utils/Mouse.js";
import { Vector } from "../utils/Vector.js";
export class Entity {
    constructor(position, size, color) {
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.maxSpeed = 5;
        this.position = position;
        this.size = size;
        this.color = color;
        Engine.getInstance().ENTITIES.push(this);
    }
    render(debug = false) {
        Draw.Circle({
            position: this.position,
            size: this.size,
            fill: {
                color: this.color
            }
        });
        if (!debug)
            return;
        Draw.Text({
            text: `Pos: ${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 80),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });
        Draw.Text({
            text: `Vel: ${this.velocity.x.toFixed(1)}, ${this.velocity.y.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 65),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });
        Draw.Text({
            text: `Acc: ${this.acceleration.x.toFixed(1)}, ${this.acceleration.y.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 50),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });
        Draw.Text({
            text: `Max vel: ${this.maxSpeed.toFixed(1)}`,
            position: new GameCoordinate(this.position.x - 35, this.position.y - 35),
            fill: { color: "black" },
            font: "Arial",
            fontSize: 13,
            aligment: "left"
        });
        Draw.Line({
            start: this.position.toScreenCoordinate(),
            end: Coordinates.GameCoordinateToScreenCoordinate(this.velocity.setMagnitude(30).add(this.position)),
            stroke: {
                color: "black",
                width: 2
            },
        });
    }
    update() {
        let mousePosition = Mouse.getInstance().position;
        let mouseInGame = mousePosition.toGameCoordinate();
        this.acceleration = mouseInGame.subtract(this.position).setMagnitude(0.1);
        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);
        let newPos = this.position.add(this.velocity);
        this.position = new GameCoordinate(newPos.x, newPos.y);
    }
}
