import { GridMap } from "../../objects/GridMap.js";
import { Engine } from "../Engine.js";
import { GridCoordinate } from "../type/Coordinates.js";
import { Scene } from "./Scene.js";
export class TestScene extends Scene {
    constructor() {
        super();
        this.gridMap = new GridMap(new GridCoordinate(10, 10), 50);
        let screenSize = Engine.getInstance().SCREEN_SIZE.copy();
        if (screenSize.half !== undefined) {
            this.offset.x = screenSize.half.x;
            this.offset.y = screenSize.half.y;
        }
        else {
            throw new Error("Screen half size is not defined at grid map creation.");
        }
    }
    Start() {
        Engine.setOffset(this.offset);
    }
    Update() {
        this.gridMap.render();
    }
}
