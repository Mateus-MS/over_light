import { Engine } from "../engine/Engine.js";
import { Draw } from "../utils/Draw.js";
export class Entity {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
        Engine.getInstance().ENTITIES.push(this);
    }
    render() {
        Draw.Circle(this.position, this.size, this.color);
    }
}
