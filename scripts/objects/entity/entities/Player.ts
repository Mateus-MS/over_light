import { GameCoordinate } from "../../../engine/type/Coordinates.js";
import { Mouse } from "../../../utils/Mouse.js";
import { renderEntity } from "../components/render.js";
import { Entity } from "../Entity.js";

export class Player extends Entity {
    constructor(position: GameCoordinate){
        super(position, 20, "red");
    }

    // When defining a new type of Entity, override the update method to implement specific behavior.
    // You can use existing helper methods or define custom ones as needed.
    // For example, the move method here is specific to the Player entity,
    // while the render method is commonly used by most entities.
    // The update method is called every frame, so keep it lightweight.
    // Each entity type is responsible for performing the actions it needs per frame,
    // such as rendering, moving, checking collisions, etc.
    public override update(): void {
        renderEntity(this);
        this.move();
    }

    public move(): void{
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