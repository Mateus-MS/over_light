import { Coordinates, GameCoordinate } from "../../../engine/type/Coordinates.js";
import { Draw } from "../../../utils/Draw.js";
import { Entity } from "../Entity.js";

interface RenderableEntityI{
    render(): void;
}

/**
 * This component gives the ability to a entity to be rendered on the screen.
 * 
 * @param debug - Whether to render debug information or not
 * @returns 
 */
export function Renderable(debug: boolean = false) {
    return function<T extends new (...args: any[]) => Entity>(Base: T) {
        return class extends Base {
            render() {
                Draw.Circle({
                    position: this.position,
                    size: this.size,
                    fill: {
                        color: this.color
                    }
                });

                if(!debug) return;

                // Show coordinates
                Draw.Text({
                    text: `Pos: ${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 80),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });

                // Show velocity
                Draw.Text({
                    text: `Vel: ${this.velocity.x.toFixed(1)}, ${this.velocity.y.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 65),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });

                // Show acceleration
                Draw.Text({
                    text: `Acc: ${this.acceleration.x.toFixed(1)}, ${this.acceleration.y.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 50),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });

                // Show max speed
                Draw.Text({
                    text: `Max vel: ${this.maxSpeed.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 35),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });

                // Draw the velocity vector
                Draw.Line({
                    start: this.position.toScreenCoordinate(),
                    end: Coordinates.GameCoordinateToScreenCoordinate(this.velocity.setMagnitude(30).add(this.position)),
                    stroke: {
                        color: "black",
                        width: 2
                    },
                });
            }
        };
    };
}

export function IsRenderable(obj: Entity): obj is Entity & RenderableEntityI {
    return 'render' in obj && typeof (obj as any).render === 'function';
}