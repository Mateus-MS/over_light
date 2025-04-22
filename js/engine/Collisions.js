export class Collisions {
    static PointInSquare(point, squarePosition, halfSquareSize) {
        return point.x >= squarePosition.x - halfSquareSize &&
            point.x <= squarePosition.x + halfSquareSize &&
            point.y >= squarePosition.y - halfSquareSize &&
            point.y <= squarePosition.y + halfSquareSize;
    }
}
