import { Entity } from "../../objects/entity/Entity.js" 
import { GridMap } from "../../objects/GridMap.js" 
import { Engine } from "../Engine.js" 
import { GameCoordinate, GridCoordinate } from "../type/Coordinates.js" 
import { Scene } from "../Scene.js" 
import { Player } from "../../objects/entity/entities/Player.js"

export class TestScene extends Scene {
    private gridMap: GridMap = new GridMap(new GridCoordinate(10, 10), 50);
    private player: Entity = new Player(new GameCoordinate(0, 0));

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
    }

    public override Update() {
        this.gridMap.render();
        // this.player.move();
        console.log("a");
    }
}