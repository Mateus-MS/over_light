import { GameCoordinate, GridCoordinate, ScreenCoordinate } from "../engine/type/Coordinates.js";
export class Vector {
    constructor(x, y, withHalf = false) {
        this.half = undefined;
        this.x = x;
        this.y = y;
        if (withHalf) {
            this.calcHalf();
        }
    }
    get arr() {
        return [this.x, this.y];
    }
    calcHalf() {
        this.half = new Vector(this.x / 2, this.y / 2);
    }
    add(object) {
        if (object instanceof Vector) {
            let x = this.x + object.x;
            let y = this.y + object.y;
            if (object instanceof ScreenCoordinate) {
                return new ScreenCoordinate(x, y);
            }
            if (object instanceof GridCoordinate) {
                return new GridCoordinate(x, y);
            }
            if (object instanceof GameCoordinate) {
                return new GameCoordinate(x, y);
            }
            return new Vector(x, y);
        }
        if (typeof object === "number") {
            return new Vector(this.x + object, this.y + object);
        }
        throw new Error("Invalid type for addition. Expected Vector or number.");
    }
    subtract(object) {
        if (object instanceof Vector) {
            let x = this.x - object.x;
            let y = this.y - object.y;
            if (object instanceof ScreenCoordinate) {
                return new ScreenCoordinate(x, y);
            }
            if (object instanceof GridCoordinate) {
                return new GridCoordinate(x, y);
            }
            if (object instanceof GameCoordinate) {
                return new GameCoordinate(x, y);
            }
            return new Vector(x, y);
        }
        if (typeof object === "number") {
            return new Vector(this.x - object, this.y - object);
        }
        throw new Error("Invalid type for subtraction. Expected Vector or number.");
    }
    multiply(object) {
        if (object instanceof Vector) {
            let x = this.x * object.x;
            let y = this.y * object.y;
            if (object instanceof ScreenCoordinate) {
                return new ScreenCoordinate(x, y);
            }
            if (object instanceof GridCoordinate) {
                return new GridCoordinate(x, y);
            }
            if (object instanceof GameCoordinate) {
                return new GameCoordinate(x, y);
            }
            return new Vector(x, y);
        }
        if (typeof object === "number") {
            return new Vector(this.x * object, this.y * object);
        }
        throw new Error("Invalid type for multiplyion. Expected Vector or number.");
    }
    divide(object, storeHalf = false) {
        if (object instanceof Vector) {
            let x = this.x / object.x;
            let y = this.y / object.y;
            if (object instanceof ScreenCoordinate) {
                let cord = new ScreenCoordinate(x, y);
                if (storeHalf) {
                    cord.calcHalf();
                }
                return cord;
            }
            if (object instanceof GridCoordinate) {
                let cord = new GridCoordinate(x, y);
                if (storeHalf) {
                    cord.calcHalf();
                }
                return cord;
            }
            if (object instanceof GameCoordinate) {
                let cord = new GameCoordinate(x, y);
                if (storeHalf) {
                    cord.calcHalf();
                }
                return cord;
            }
            let vec = new Vector(x, y);
            if (storeHalf) {
                vec.calcHalf();
            }
            return vec;
        }
        if (typeof object === "number") {
            return new Vector(this.x / object, this.y / object);
        }
        throw new Error("Invalid type for multiplyion. Expected Vector or number.");
    }
    copy() {
        let vec = new Vector(this.x, this.y);
        if (this.half) {
            vec.half = new Vector(this.half.x, this.half.y);
        }
        return vec;
    }
    print() {
        console.log(`Vector: (${this.x}, ${this.y})`);
    }
}
