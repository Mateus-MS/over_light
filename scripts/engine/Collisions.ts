import { Vector } from "../utils/Vector.js";

export class Collisions{
    public static PointInSquare(point: Vector, squarePosition: Vector, halfSquareSize: number): boolean{
        return point.x >= squarePosition.x - halfSquareSize &&
               point.x <= squarePosition.x + halfSquareSize &&
               point.y >= squarePosition.y - halfSquareSize &&
               point.y <= squarePosition.y + halfSquareSize;

    }
}