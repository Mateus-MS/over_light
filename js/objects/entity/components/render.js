import { Coordinates, GameCoordinate } from "../../../engine/type/Coordinates.js";
import { Draw } from "../../../utils/Draw.js";
export function Renderable(debug = false) {
    return function (Base) {
        return class extends Base {
            render() {
                Draw.Circle({
                    position: this.position,
                    size: this.size,
                    fill: {
                        color: this.color
                    }
                });
                if (!debug)
                    return;
                Draw.Text({
                    text: `Pos: ${this.position.x.toFixed(1)}, ${this.position.y.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 80),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });
                Draw.Text({
                    text: `Vel: ${this.velocity.x.toFixed(1)}, ${this.velocity.y.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 65),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });
                Draw.Text({
                    text: `Acc: ${this.acceleration.x.toFixed(1)}, ${this.acceleration.y.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 50),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });
                Draw.Text({
                    text: `Max vel: ${this.maxSpeed.toFixed(1)}`,
                    position: new GameCoordinate(this.position.x - 35, this.position.y - 35),
                    fill: { color: "black" },
                    font: "Arial",
                    fontSize: 13,
                    aligment: "left"
                });
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
export function IsRenderable(obj) {
    return 'render' in obj && typeof obj.render === 'function';
}
