import { Entity } from "../objects/entity/Entity.js";
import { GridMap } from "../objects/GridMap.js";
import { Engine } from "../engine/Engine.js";
import { GameCoordinate, GridCoordinate } from "../engine/type/Coordinates.js";
import { Scene } from "../engine/Scene.js";
import { Player } from "../objects/Player.js";

export class TestScene extends Scene {
    private gridMap: GridMap = new GridMap(new GridCoordinate(6, 6), 50);

    constructor() {
        super();

        // Initiate the offset to the center of the screen.
        let screenSize = Engine.getInstance().SCREEN_SIZE.copy();
        if(screenSize.half !== undefined){
            this.offset.x = screenSize.half.x;
            this.offset.y = screenSize.half.y;
        } else {
            throw new Error("Screen half size is not defined at grid map creation.");
        }
    }

    public override Start() {
        // When having multiple scenes this will cause a bug.
        Engine.setOffset(this.offset);

        new Player(new GameCoordinate(20, 20)); 
    }

    public override Update() {
        this.gridMap.render();
    }
}