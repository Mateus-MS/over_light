import { Vector } from "../../utils/Vector.js";
import { NumberHalf } from "./utils.js";

/**
 * This coordinates are used to represent a point in the default screen space.
 * The origin is at the top left corner of the screen.
 * 
 * Used in example:
 * - Mouse coordinates
 * - Click coordinates
 * - Draw coordinates, at least they should be converted to this space before drawing.
 */
export class ScreenCoordinate extends Vector{
    constructor(x: number, y: number){
        super(x, y);
    }

    public toGridCoordinate(gridSize: NumberHalf, offset: ScreenCoordinate): GridCoordinate{
        return new GridCoordinate(Math.ceil((this.x - gridSize.half - offset.x) / gridSize.number), Math.ceil((this.y  - gridSize.half - offset.y) / gridSize.number));
    }    

    public toGameCoordinate(offset: ScreenCoordinate): GameCoordinate{
        return new GameCoordinate(this.x - offset.x, this.y - offset.y);
    }

}

/**
 * This coordinates are used to represent a cell in the grid space.
 * The origin is at the center of the screen.
 * 
 * Used in example:
 * - Grid drawing
 * - Towers drawing
 * - Entities collision detection
 */
export class GridCoordinate extends Vector{
    constructor(x: number, y: number){
        super(x, y);
    }

    public toScreenCoordinate(gridSize: number): ScreenCoordinate{
        return new ScreenCoordinate(this.x * gridSize, this.y * gridSize);
    }
}

/**
 * This coordinates are used to represent a point in game space.
 * The origin is at the center of the screen.
 * 
 * Used in example:
 * - Entities drawing
 */
export class GameCoordinate extends Vector{
    constructor(x: number, y: number){
        super(x, y);
    }

    public toScreenCoordinate(screenSize: Vector): ScreenCoordinate{
        return new ScreenCoordinate(this.x + screenSize.x, this.y + screenSize.y);
    }
}