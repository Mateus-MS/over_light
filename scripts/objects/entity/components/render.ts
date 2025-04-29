import { Coordinates, GameCoordinate } from "../../../engine/type/Coordinates.js";
import { Draw } from "../../../utils/Draw.js";
import { Entity } from "../Entity.js";

export function renderEntity(entity: Entity, debug: boolean = false): void {
    Draw.Circle({
        position: entity.position,
        size: entity.size,
        fill: {
            color: entity.color
        }
    });

    if(!debug) return;

    // Show coordinates
    Draw.Text({
        text: `Pos: ${entity.position.x.toFixed(1)}, ${entity.position.y.toFixed(1)}`,
        position: new GameCoordinate(entity.position.x - 35, entity.position.y - 80),
        fill: { color: "black" },
        font: "Arial",
        fontSize: 13,
        aligment: "left"
    });

    // Show velocity
    Draw.Text({
        text: `Vel: ${entity.velocity.x.toFixed(1)}, ${entity.velocity.y.toFixed(1)}`,
        position: new GameCoordinate(entity.position.x - 35, entity.position.y - 65),
        fill: { color: "black" },
        font: "Arial",
        fontSize: 13,
        aligment: "left"
    });

    // Show acceleration
    Draw.Text({
        text: `Acc: ${entity.acceleration.x.toFixed(1)}, ${entity.acceleration.y.toFixed(1)}`,
        position: new GameCoordinate(entity.position.x - 35, entity.position.y - 50),
        fill: { color: "black" },
        font: "Arial",
        fontSize: 13,
        aligment: "left"
    });

    // Show max speed
    Draw.Text({
        text: `Max vel: ${entity.maxSpeed.toFixed(1)}`,
        position: new GameCoordinate(entity.position.x - 35, entity.position.y - 35),
        fill: { color: "black" },
        font: "Arial",
        fontSize: 13,
        aligment: "left"
    });

    // Draw the velocity vector
    Draw.Line({
        start: entity.position.toScreenCoordinate(),
        end: Coordinates.GameCoordinateToScreenCoordinate(entity.velocity.setMagnitude(30).add(entity.position)),
        stroke: {
            color: "black",
            width: 2
        },
    });
}