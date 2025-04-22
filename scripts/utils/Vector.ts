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

    add<InputType, ReturnType>(object: InputType): ReturnType{
        if(object instanceof Vector){
            return new Vector(this.x + object.x, this.y + object.y) as ReturnType;
        }
        if(typeof object === "number"){
            return new Vector(this.x + object, this.y + object) as ReturnType;
        }

        throw new Error("Invalid type for addition. Expected Vector or number.");
    }

    subtract<InputType, ReturnType>(object: InputType): ReturnType{
        if(object instanceof Vector){
            return new Vector(this.x - object.x, this.y - object.y) as ReturnType;
        }

        if(typeof object === "number"){
            return new Vector(this.x - object, this.y - object) as ReturnType;
        }

        throw new Error("Invalid type for subtraction. Expected Vector or number.");
    }

    public copy<ReturnType extends Vector>(): ReturnType{
        let vec = new Vector(this.x, this.y) as ReturnType;
        if(this.half){
            vec.half = new Vector(this.half.x, this.half.y);
        }
        return vec;
    } 

}