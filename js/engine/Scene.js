import { Entity } from "../objects/Entity.js";
import { Vector } from "../utils/Vector.js";
import { Engine } from "./Engine.js";
export class Scene {
    constructor() {
        this.engine = Engine.getInstance();
        this.engine.StartEngine(this.Start, this.Update, this);
        this.player = new Entity(new Vector(50, 50), 20, "blue");
    }
    Start() {
    }
    Update() {
        this.engine.DRAW.Circle(new Vector(100, 100), 20, "red");
    }
}
