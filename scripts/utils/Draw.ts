import { GridCoordinate, ScreenCoordinate } from "../engine/type/Coordinates.js";
import { NumberHalf } from "../engine/type/utils.js";
import { Vector } from "../utils/Vector.js";

interface fill{
    color: string;
}

interface stroke{
    color: string;
    width: number;
}

export interface TextI{
    // Text
    text: string;
    
    // Position
    position: Vector;
    // Font position
    aligment?: CanvasTextAlign;

    // Style
    fill: fill;
    stroke?: stroke;
    // Font style
    font?: string;
    fontSize?: number;
}

export interface SquareI{
    position: Vector;
    size: number;

    fill: fill;
    stroke?: stroke;
}

export class Draw{

    private c: CanvasRenderingContext2D | null = null;
    private static instance: Draw | null = null;

    private constructor(c: CanvasRenderingContext2D | null){
        this.c = c;
    }

    /**
     * Test if is better to pass the offset here or use another function to set it.
     */
    public static getInstance(c: CanvasRenderingContext2D | null): Draw{
        if(!this.instance){
            this.instance = new Draw(c);
        }
        return this.instance;
    }

    public Text(text: TextI){
        this.c?.beginPath();

        if(!this.c) return;

        this.c.font = `${text.fontSize}px ${text.font}`;
        this.c.fillStyle = text.fill.color;
        this.c.textAlign = text.aligment === undefined ? "left" : text.aligment;
        this.c.fillText(text.text, text.position.x, text.position.y);

        if(text.stroke){
            this.c.strokeStyle = text.stroke.color;
            this.c.lineWidth = text.stroke.width;
            this.c.strokeText(text.text, text.position.x, text.position.y);
        }

        this.c?.closePath();
    }

    public Circle(position: Vector, radius: number, color: string = "black"){
        this.c?.beginPath();

        if(!this.c) return;

        this.c.fillStyle = color;
        this.c.arc(position.x, position.y, radius, 0, Math.PI * 2);
        this.c.fill();

        this.c.closePath();
    }

    /**
     * Different from the default behavior of the canvas, when drawing a square,
     * the origin is at the center of the square. Not at the top left corner.
     */
    public Square(square: SquareI, gridSize: NumberHalf | undefined = undefined, offset: ScreenCoordinate | undefined = undefined){
        this.c?.beginPath();

        if(!this.c) return;

        let position: ScreenCoordinate | undefined = undefined;

        // Convert to screen coodinate if using some other coordinate system.
        if(square.position instanceof GridCoordinate){
            if(!gridSize){
                throw new Error("Grid size is required when using GridCoordinate.");
            }

            position = square.position.toScreenCoordinate(gridSize.number);
        }
        
        if(position === undefined) throw new Error("Invalid position type. Expected GridCoordinate.");

        // If received halfSize, use it to center the square.
        if(gridSize){
            position.x -= gridSize.half;
            position.y -= gridSize.half;
        }

        // If received offset, add it to the position.
        if(offset){
            position.x += offset.x;
            position.y += offset.y;
        }

        // Draw logic
        this.c.fillStyle = square.fill.color;
        this.c.fillRect(position.x, position.y, square.size, square.size);

        if(square.stroke){
            this.c.strokeStyle = square.stroke.color;
            this.c.lineWidth = square.stroke.width;
            this.c.strokeRect(position.x, position.y, square.size, square.size);
        }

        this.c.closePath();
    }

}