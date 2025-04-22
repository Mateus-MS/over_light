import { Engine } from "../Engine.js";
import { ScreenCoordinate } from "../type/Coordinates.js";
export class Scene {
    constructor() {
        this.engine = Engine.getInstance();
        this.offset = new ScreenCoordinate(0, 0);
        this.engine.StartEngine(this.Start, this.Update, this);
    }
    Start() { }
    ;
    Update() { }
    ;
}
