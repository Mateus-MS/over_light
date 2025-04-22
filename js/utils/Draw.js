import { GridCoordinate } from "../engine/type/Coordinates.js";
export class Draw {
    constructor(c) {
        this.c = null;
        this.c = c;
    }
    static getInstance(c) {
        if (!this.instance) {
            this.instance = new Draw(c);
        }
        return this.instance;
    }
    Text(text) {
        var _a, _b;
        (_a = this.c) === null || _a === void 0 ? void 0 : _a.beginPath();
        if (!this.c)
            return;
        this.c.font = `${text.fontSize}px ${text.font}`;
        this.c.fillStyle = text.fill.color;
        this.c.textAlign = text.aligment === undefined ? "left" : text.aligment;
        this.c.fillText(text.text, text.position.x, text.position.y);
        if (text.stroke) {
            this.c.strokeStyle = text.stroke.color;
            this.c.lineWidth = text.stroke.width;
            this.c.strokeText(text.text, text.position.x, text.position.y);
        }
        (_b = this.c) === null || _b === void 0 ? void 0 : _b.closePath();
    }
    Circle(position, radius, color = "black") {
        var _a;
        (_a = this.c) === null || _a === void 0 ? void 0 : _a.beginPath();
        if (!this.c)
            return;
        this.c.fillStyle = color;
        this.c.arc(position.x, position.y, radius, 0, Math.PI * 2);
        this.c.fill();
        this.c.closePath();
    }
    Square(square, gridSize = undefined, offset = undefined) {
        var _a;
        (_a = this.c) === null || _a === void 0 ? void 0 : _a.beginPath();
        if (!this.c)
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
        if (offset) {
            position.x += offset.x;
            position.y += offset.y;
        }
        this.c.fillStyle = square.fill.color;
        this.c.fillRect(position.x, position.y, square.size, square.size);
        if (square.stroke) {
            this.c.strokeStyle = square.stroke.color;
            this.c.lineWidth = square.stroke.width;
            this.c.strokeRect(position.x, position.y, square.size, square.size);
        }
        this.c.closePath();
    }
}
Draw.instance = null;
