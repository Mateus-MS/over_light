import { GridMap } from "../../objects/GridMap.js";
import { GridCoordinate } from "../type/Coordinates.js";
import { Scene } from "./Scene.js";

export class TestScene extends Scene {
    private gridMap: GridMap = new GridMap(new GridCoordinate(10, 10), 50);

    constructor() {
        super();
    }

    public override Start() {
    }

    public override Update() {
        this.gridMap.render();
    }
}