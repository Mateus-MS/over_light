import { GameCoordinate } from "../../../engine/type/Coordinates.js";
import { Mouse } from "../../../utils/Mouse.js";
import { Actor } from "../Actor.js";

export class Player extends Actor {
    constructor(position: GameCoordinate){
        super(position, 20, "red");
    }

    public override move(): void{
        // Get the mouse position and convert it to the same coordinate system as the entity.
        let mousePosition = Mouse.getInstance().position;
        let mouseInGame = mousePosition.toGameCoordinate();

        // Calculate the acceleration towards the mouse position.
        this.acceleration = mouseInGame.subtract(this.position).setMagnitude(0.1);
        this.velocity = this.velocity.add(this.acceleration);
        this.velocity = this.velocity.limit(this.maxSpeed);

        // Update the position based on the velocity.
        let newPos = this.position.add(this.velocity);
        this.position = new GameCoordinate(newPos.x, newPos.y);
    }
}