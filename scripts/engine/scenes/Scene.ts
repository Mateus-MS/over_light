import { Engine } from "../Engine.js";
import { ScreenCoordinate } from "../type/Coordinates.js";

export class Scene {
    protected engine: Engine = Engine.getInstance();

    protected offset: ScreenCoordinate = new ScreenCoordinate(0, 0)

    constructor() {
        this.engine.StartEngine(this.Start, this.Update, this);
    }

    public Start(){};
    public Update(){};
}