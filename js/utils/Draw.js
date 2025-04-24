import { Engine } from "../engine/Engine.js";
import { GridCoordinate } from "../engine/type/Coordinates.js";
export class Draw {
    constructor() { }
    static getInstance() {
        if (Draw.c === null) {
            throw new Error("Canvas context is null. Please provide a valid canvas context.");
        }
        if (this.instance === null) {
            this.instance = new Draw();
        }
        return this.instance;
    }
    static setContext(c) {
        Draw.c = c;
    }
    static Text(text) {
        var _a, _b;
        (_a = Draw.c) === null || _a === void 0 ? void 0 : _a.beginPath();
        if (!Draw.c)
            return;
        Draw.c.font = `${text.fontSize}px ${text.font}`;
        Draw.c.fillStyle = text.fill.color;
        Draw.c.textAlign = text.aligment === undefined ? "left" : text.aligment;
        Draw.c.fillText(text.text, text.position.x, text.position.y);
        if (text.stroke) {
            Draw.c.strokeStyle = text.stroke.color;
            Draw.c.lineWidth = text.stroke.width;
            Draw.c.strokeText(text.text, text.position.x, text.position.y);
        }
        (_b = Draw.c) === null || _b === void 0 ? void 0 : _b.closePath();
    }
    static Circle(position, radius, color = "black") {
        var _a;
        (_a = Draw.c) === null || _a === void 0 ? void 0 : _a.beginPath();
        if (!Draw.c)
            return;
        Draw.c.fillStyle = color;
        Draw.c.arc(position.x, position.y, radius, 0, Math.PI * 2);
        Draw.c.fill();
        Draw.c.closePath();
    }
    static Square(square, gridSize = undefined, useOffset = true) {
        var _a;
        (_a = Draw.c) === null || _a === void 0 ? void 0 : _a.beginPath();
        if (!Draw.c)
            return;
        let position = undefined;
        if (square.position instanceof GridCoordinate) {
            if (!gridSize) {
                throw new Error("Grid size is required when using GridCoordinate.");
            }
            position = square.position.toScreenCoordinate(gridSize.number);
        }
        if (position === undefined)
            throw new Error("Invalid position type. Expected GridCoordinate.");
        if (gridSize) {
            position.x -= gridSize.half;
            position.y -= gridSize.half;
        }
        if (useOffset) {
            let offset = Engine.getOffset();
            position.x += offset.x;
            position.y += offset.y;
        }
        Draw.c.fillStyle = square.fill.color;
        Draw.c.fillRect(position.x, position.y, square.size, square.size);
        if (square.stroke) {
            Draw.c.strokeStyle = square.stroke.color;
            Draw.c.lineWidth = square.stroke.width;
            Draw.c.strokeRect(position.x, position.y, square.size, square.size);
        }
        Draw.c.closePath();
    }
}
Draw.c = null;
Draw.instance = null;
