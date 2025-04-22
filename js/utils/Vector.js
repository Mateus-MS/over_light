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
            return new Vector(this.x + object.x, this.y + object.y);
        }
        if (typeof object === "number") {
            return new Vector(this.x + object, this.y + object);
        }
        throw new Error("Invalid type for addition. Expected Vector or number.");
    }
    subtract(object) {
        if (object instanceof Vector) {
            return new Vector(this.x - object.x, this.y - object.y);
        }
        if (typeof object === "number") {
            return new Vector(this.x - object, this.y - object);
        }
        throw new Error("Invalid type for subtraction. Expected Vector or number.");
    }
    copy() {
        let vec = new Vector(this.x, this.y);
        if (this.half) {
            vec.half = new Vector(this.half.x, this.half.y);
        }
        return vec;
    }
}
