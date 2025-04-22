import { GridMap } from "../../objects/GridMap.js";
import { GridCoordinate } from "../type/Coordinates.js";
import { Scene } from "./Scene.js";
export class TestScene extends Scene {
    constructor() {
        super();
        this.gridMap = new GridMap(new GridCoordinate(10, 10), 50);
    }
    Start() {
    }
    Update() {
        this.gridMap.render();
    }
}
