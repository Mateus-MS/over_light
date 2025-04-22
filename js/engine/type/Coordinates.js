import { Vector } from "../../utils/Vector.js";
export class ScreenCoordinate extends Vector {
    constructor(x, y) {
        super(x, y);
    }
    toGridCoordinate(gridSize, offset) {
        return new GridCoordinate(Math.ceil((this.x - gridSize.half - offset.x) / gridSize.number), Math.ceil((this.y - gridSize.half - offset.y) / gridSize.number));
    }
    toGameCoordinate(offset) {
        return new GameCoordinate(this.x - offset.x, this.y - offset.y);
    }
}
export class GridCoordinate extends Vector {
    constructor(x, y) {
        super(x, y);
    }
    toScreenCoordinate(gridSize) {
        return new ScreenCoordinate(this.x * gridSize, this.y * gridSize);
    }
}
export class GameCoordinate extends Vector {
    constructor(x, y) {
        super(x, y);
    }
    toScreenCoordinate(screenSize) {
        return new ScreenCoordinate(this.x + screenSize.x, this.y + screenSize.y);
    }
}
