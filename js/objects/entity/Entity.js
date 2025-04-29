import { Engine } from "../../engine/Engine.js";
import { GameCoordinate } from "../../engine/type/Coordinates.js";
import { Mouse } from "../../utils/Mouse.js";
import { Vector } from "../../utils/Vector.js";
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
