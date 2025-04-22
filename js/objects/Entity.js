import { Engine } from "../engine/Engine.js";
export class Entity {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
        Engine.getInstance().ENTITIES.push(this);
    }
    render() {
        Engine.getInstance().DRAW.Circle(this.position, this.size, this.color);
    }
}
