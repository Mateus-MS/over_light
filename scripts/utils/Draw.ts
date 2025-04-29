import { Engine } from "../engine/Engine.js";
import { GameCoordinate, GridCoordinate, ScreenCoordinate } from "../engine/type/Coordinates.js";
import { NumberHalf } from "../engine/type/utils.js";
import { Vector } from "../utils/Vector.js";

interface fill{
    color: string;
}

interface stroke{
    color: string;
    width: number;
}

interface TextI{
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

interface SquareI{
    position: Vector;
    size: number;

    fill: fill;
    stroke?: stroke;
}

interface CircleI{
    position: GameCoordinate;
    size: number;

    fill: fill;
    stroke?: stroke;
}

interface LineI{
    start: Vector;
    end: Vector;

    stroke: stroke;
}

export class Draw{

    private static c: CanvasRenderingContext2D | null = null;
    private static instance: Draw | null = null;

    private constructor(){}

    public static getInstance(): Draw{
        // The context needs to be setted before calling this method.
        if(Draw.c === null){
            throw new Error("Canvas context is null. Please provide a valid canvas context.");
        }

        if(this.instance === null){
            this.instance = new Draw();
        }
        return this.instance;
    }

    public static setContext(c: CanvasRenderingContext2D | null){
        Draw.c = c;
    }	

    public static Text(text: TextI){
        Draw.c?.beginPath();

        if(!Draw.c) return;

        let position: ScreenCoordinate = text.position as ScreenCoordinate;

        if(text.position instanceof GameCoordinate){
            position = text.position.toScreenCoordinate();
        }

        Draw.c.font = `${text.fontSize}px ${text.font}`;
        Draw.c.fillStyle = text.fill.color;
        Draw.c.textAlign = text.aligment === undefined ? "left" : text.aligment;
        Draw.c.fillText(text.text, position.x, position.y);

        if(text.stroke){
            Draw.c.strokeStyle = text.stroke.color;
            Draw.c.lineWidth = text.stroke.width;
            Draw.c.strokeText(text.text, position.x, position.y);
        }

        Draw.c?.closePath();
    }

    public static Circle(circle: CircleI){
        Draw.c?.beginPath();

        if(!Draw.c) return;

        let pos = circle.position.toScreenCoordinate();

        Draw.c.fillStyle = circle.fill.color;
        Draw.c.arc(pos.x, pos.y, circle.size, 0, Math.PI * 2);
        Draw.c.fill();

        Draw.c.closePath();
    }

    /**
     * Different from the default behavior of the canvas, when drawing a square,
     * the origin is at the center of the square. Not at the top left corner.
     */
    public static Square(square: SquareI, gridSize: NumberHalf | undefined = undefined, useOffset: boolean = true){
        Draw.c?.beginPath();

        if(!Draw.c) return;

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
        if(useOffset){
            let offset = Engine.getOffset();

            position.x += offset.x;
            position.y += offset.y;
        }

        // Draw logic
        Draw.c.fillStyle = square.fill.color;
        Draw.c.fillRect(position.x, position.y, square.size, square.size);

        if(square.stroke){
            Draw.c.strokeStyle = square.stroke.color;
            Draw.c.lineWidth = square.stroke.width;
            Draw.c.strokeRect(position.x, position.y, square.size, square.size);
        }

        Draw.c.closePath();
    }

    public static Line(line: LineI){
        Draw.c?.beginPath();

        if(!Draw.c) return;

        Draw.c.strokeStyle = line.stroke.color;
        Draw.c.lineWidth = line.stroke.width;

        let start = line.start as ScreenCoordinate;
        let end = line.end as ScreenCoordinate;

        if(line.start instanceof GameCoordinate){
            start = line.start.toScreenCoordinate();
        }

        if(line.end instanceof GameCoordinate){
            end = line.end.toScreenCoordinate();
        }

        Draw.c.moveTo(start.x, start.y);
        Draw.c.lineTo(end.x, end.y);

        Draw.c.stroke();
        Draw.c.closePath();
    }
}