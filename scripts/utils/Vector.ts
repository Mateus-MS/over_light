import { GameCoordinate, GridCoordinate, ScreenCoordinate } from "../engine/type/Coordinates.js";

export class Vector{

    public x: number;
    public y: number;
    public half: Vector | undefined = undefined;

    constructor(x: number, y: number, withHalf: boolean = false){
        this.x = x;
        this.y = y;

        if(withHalf){
            this.calcHalf();
        }
    }

    get arr(): number[]{
        return [this.x, this.y];
    }

    public calcHalf(){
        this.half = new Vector(this.x / 2, this.y / 2);
    }

    add(vector: Vector): Vector;
    add(number: number): Vector;
    add(object: Vector | number): Vector{
        // If the object is a vector or something that extends a vector
        if(object instanceof Vector){
            let x = this.x + object.x;
            let y = this.y + object.y;

            if(object instanceof ScreenCoordinate){
                return new ScreenCoordinate(x, y);
            }

            if(object instanceof GridCoordinate){
                return new GridCoordinate(x, y);
            }

            if(object instanceof GameCoordinate){
                return new GameCoordinate(x, y);
            }

            // if the object is simply a vector, return a new vector.
            return new Vector(x, y);
        }
        if(typeof object === "number"){
            return new Vector(this.x + object, this.y + object);
        }

        throw new Error("Invalid type for addition. Expected Vector or number.");
    }

    subtract(vector: Vector): Vector;
    subtract(number: number): Vector;
    subtract(object: Vector | number): Vector{
        // If the object is a vector or something that extends a vector
        if(object instanceof Vector){
            let x = this.x - object.x;
            let y = this.y - object.y;

            if(object instanceof ScreenCoordinate){
                return new ScreenCoordinate(x, y);
            }

            if(object instanceof GridCoordinate){
                return new GridCoordinate(x, y);
            }

            if(object instanceof GameCoordinate){
                return new GameCoordinate(x, y);
            }

            // if the object is simply a vector, return a new vector.
            return new Vector(x, y);
        }

        if(typeof object === "number"){
            return new Vector(this.x - object, this.y - object);
        }

        throw new Error("Invalid type for subtraction. Expected Vector or number.");
    }

    multiply(vector: Vector): Vector;
    multiply(number: number): Vector;
    multiply(object: Vector | number): Vector{
        // If the object is a vector or something that extends a vector
        if(object instanceof Vector){
            let x = this.x * object.x;
            let y = this.y * object.y;

            if(object instanceof ScreenCoordinate){
                return new ScreenCoordinate(x, y);
            }

            if(object instanceof GridCoordinate){
                return new GridCoordinate(x, y);
            }

            if(object instanceof GameCoordinate){
                return new GameCoordinate(x, y);
            }

            // if the object is simply a vector, return a new vector.
            return new Vector(x, y);
        }

        if(typeof object === "number"){
            return new Vector(this.x * object, this.y * object);
        }

        throw new Error("Invalid type for multiplyion. Expected Vector or number.");
    }

    divide(vector: Vector, storeHalf: boolean): Vector;
    divide(number: number, storeHalf: boolean): Vector;
    divide(object: Vector | number, storeHalf: boolean = false): Vector{
        // If the object is a vector or something that extends a vector
        if(object instanceof Vector){
            let x = this.x / object.x;
            let y = this.y / object.y;

            if(object instanceof ScreenCoordinate){
                let cord = new ScreenCoordinate(x, y);
                if(storeHalf){
                    cord.calcHalf();
                }
                return cord;
            }

            if(object instanceof GridCoordinate){
                let cord = new GridCoordinate(x, y);
                if(storeHalf){
                    cord.calcHalf();
                }
                return cord;
            }

            if(object instanceof GameCoordinate){
                let cord = new GameCoordinate(x, y);
                if(storeHalf){
                    cord.calcHalf();
                }
                return cord;
            }

            // if the object is simply a vector, return a new vector.
            let vec = new Vector(x, y);
            if(storeHalf){
                vec.calcHalf();
            }
            return vec;
        }

        if(typeof object === "number"){
            return new Vector(this.x / object, this.y / object);
        }

        throw new Error("Invalid type for multiplyion. Expected Vector or number.");
    }

    public copy<ReturnType extends Vector>(): ReturnType{
        let vec = new Vector(this.x, this.y) as ReturnType;
        if(this.half){
            vec.half = new Vector(this.half.x, this.half.y);
        }
        return vec;
    } 

    public print(): void{
        console.log(`Vector: (${this.x}, ${this.y})`);
    }

}