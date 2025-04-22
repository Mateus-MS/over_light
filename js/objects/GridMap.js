import { Collisions } from "../engine/Collisions.js";
import { Engine } from "../engine/Engine.js";
import { GameCoordinate, GridCoordinate, ScreenCoordinate } from "../engine/type/Coordinates.js";
import { NumberHalf } from "../engine/type/utils.js";
import { MouseState } from "../utils/Mouse.js";
import { Vector } from "../utils/Vector.js";
export class GridMap {
    constructor(dimensions, size = 20) {
        this.offset = new ScreenCoordinate(0, 0);
        this.hoveredCell = undefined;
        this.dimensions = dimensions;
        this.dimensions.calcHalf();
        this.size = new NumberHalf(size);
        let screenSize = Engine.getInstance().SCREEN_SIZE.copy();
        if (screenSize.half !== undefined) {
            this.offset.x = screenSize.half.x;
            this.offset.y = screenSize.half.y;
        }
        else {
            throw new Error("Screen half size is not defined at grid map creation.");
        }
        this.initiateListeners();
    }
    initiateListeners() {
        let mouse = Engine.getInstance().MOUSE;
        mouse.addEvent("mousedown", (event) => {
            mouse.state = MouseState.Idle;
            if (mouse.clickTime === undefined) {
                mouse.clickTime = Date.now();
            }
        });
        mouse.addEvent("mouseup", () => {
            if (mouse.clickTime !== undefined && Date.now() - mouse.clickTime >= 200) {
                mouse.state = MouseState.Selecting;
            }
            mouse.clickTime = undefined;
            mouse.state = MouseState.Idle;
        });
        mouse.addEvent("mousemove", (event) => {
            this.hoveredCell = Engine.getInstance().MOUSE.position.toGridCoordinate(this.size, this.offset);
            if (mouse.clickTime !== undefined) {
                let time = Date.now() - mouse.clickTime;
                if (time < 10) {
                    mouse.state = MouseState.Idle;
                }
                else if (time < 200) {
                    mouse.state = MouseState.Dragging;
                }
                else {
                    mouse.state = MouseState.Selecting;
                }
                mouse.clickTime = undefined;
            }
            if (mouse.state === MouseState.Dragging) {
                this.offset.x += event.movementX;
                this.offset.y += event.movementY;
            }
        });
    }
    render() {
        this.renderHoveredCell();
        this.renderMap();
        this.renderDebug();
    }
    renderMap() {
        let engine = Engine.getInstance();
        if (engine.SCREEN_SIZE.half === undefined)
            throw new Error("Screen half size is not defined.");
        if (this.dimensions.half === undefined)
            throw new Error("Grid dimensions half is not defined.");
        let centerAsScreenCoordinate = new ScreenCoordinate(engine.SCREEN_SIZE.half.x, engine.SCREEN_SIZE.half.y);
        let cellOnCenterOfScreen = centerAsScreenCoordinate.toGridCoordinate(this.size, this.offset);
        let quantityOfCellsThatFitOnAxis = new Vector(Math.ceil(engine.SCREEN_SIZE.half.x / this.size.number), Math.ceil(engine.SCREEN_SIZE.half.y / this.size.number));
        let x = new Vector(0, 0);
        let y = new Vector(0, 0);
        if (quantityOfCellsThatFitOnAxis.x < this.dimensions.half.x) {
            x.x = cellOnCenterOfScreen.x - quantityOfCellsThatFitOnAxis.x;
            x.y = cellOnCenterOfScreen.x + quantityOfCellsThatFitOnAxis.x;
            y.x = cellOnCenterOfScreen.y - quantityOfCellsThatFitOnAxis.y;
            y.y = cellOnCenterOfScreen.y + quantityOfCellsThatFitOnAxis.y;
        }
        else {
            x.x = -this.dimensions.half.x;
            x.y = this.dimensions.half.x;
            y.x = -this.dimensions.half.y;
            y.y = this.dimensions.half.y;
        }
        for (let i = x.x; i <= x.y; i++) {
            for (let j = y.x; j <= y.y; j++) {
                engine.DRAW.Square({
                    position: new GridCoordinate(i, j),
                    size: this.size.number,
                    fill: {
                        color: "transparent"
                    },
                    stroke: {
                        color: "black",
                        width: 2
                    }
                }, this.size, this.offset);
            }
        }
    }
    renderHoveredCell() {
        if (this.hoveredCell && this.isInBounds(this.hoveredCell)) {
            Engine.getInstance().DRAW.Square({
                position: this.hoveredCell,
                size: this.size.number,
                fill: {
                    color: "rgba(0, 0, 255, .3)"
                },
                stroke: undefined
            }, this.size, this.offset);
        }
    }
    renderDebug() {
        let engine = Engine.getInstance();
        engine.DRAW.Text({
            text: "Mouse positions: ",
            position: new ScreenCoordinate(15, engine.SCREEN_SIZE.y - 103),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 19
        });
        let mouseState;
        switch (engine.MOUSE.state) {
            case MouseState.Idle:
                mouseState = "Idle";
                break;
            case MouseState.Dragging:
                mouseState = "Dragging";
                break;
            case MouseState.Selecting:
                mouseState = "Selecting";
                break;
            default:
                mouseState = "Unknown";
        }
        engine.DRAW.Text({
            text: `Mouse state: ${mouseState}`,
            position: new ScreenCoordinate(22, engine.SCREEN_SIZE.y - 80),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        });
        let gridCoordinate = engine.MOUSE.position.toGridCoordinate(this.size, this.offset);
        engine.DRAW.Text({
            text: `Grid coordinate: ${gridCoordinate === null || gridCoordinate === void 0 ? void 0 : gridCoordinate.x}, ${gridCoordinate === null || gridCoordinate === void 0 ? void 0 : gridCoordinate.y}`,
            position: new ScreenCoordinate(22, engine.SCREEN_SIZE.y - 60),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        });
        if (engine.SCREEN_SIZE.half === undefined)
            throw new Error("Screen half size is not defined.");
        let gameCoordinate = engine.MOUSE.position.toGameCoordinate(this.offset);
        engine.DRAW.Text({
            text: `Game coordinate: ${gameCoordinate === null || gameCoordinate === void 0 ? void 0 : gameCoordinate.x}, ${gameCoordinate === null || gameCoordinate === void 0 ? void 0 : gameCoordinate.y}`,
            position: new ScreenCoordinate(22, engine.SCREEN_SIZE.y - 40),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        });
        let screenCoordinate = engine.MOUSE.position;
        engine.DRAW.Text({
            text: `Screen coordinate: ${screenCoordinate === null || screenCoordinate === void 0 ? void 0 : screenCoordinate.x}, ${screenCoordinate === null || screenCoordinate === void 0 ? void 0 : screenCoordinate.y}`,
            position: new GameCoordinate(22, engine.SCREEN_SIZE.y - 20),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        });
    }
    isInBounds(coordinate) {
        if (this.dimensions.half === undefined)
            throw new Error("Grid dimensions half is not defined.");
        return Collisions.PointInSquare(coordinate, new Vector(0, 0), this.dimensions.half.x);
    }
}
