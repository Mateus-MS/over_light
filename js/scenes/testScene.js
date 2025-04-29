import { GridMap } from "../objects/GridMap.js";
import { Engine } from "../engine/Engine.js";
import { GameCoordinate, GridCoordinate } from "../engine/type/Coordinates.js";
import { Scene } from "../engine/Scene.js";
import { Player } from "../objects/Player.js";
export class TestScene extends Scene {
    constructor() {
        super();
        this.gridMap = new GridMap(new GridCoordinate(6, 6), 50);
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
        new Player(new GameCoordinate(20, 20));
    }
    Update() {
        this.gridMap.render();
    }
}
