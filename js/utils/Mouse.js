import { ScreenCoordinate } from "../engine/type/Coordinates.js";
export var MouseState;
(function (MouseState) {
    MouseState[MouseState["Idle"] = 0] = "Idle";
    MouseState[MouseState["Dragging"] = 1] = "Dragging";
    MouseState[MouseState["Selecting"] = 2] = "Selecting";
})(MouseState || (MouseState = {}));
export class Mouse {
    constructor() {
        this.position = new ScreenCoordinate(0, 0);
        this.isDown = false;
        this.state = MouseState.Idle;
        this.clickTime = undefined;
        this.initiateListeners();
    }
    initiateListeners() {
        window.addEventListener("mousemove", (event) => {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
        });
        window.addEventListener("mousedown", () => {
            this.isDown = true;
        });
        window.addEventListener("mouseup", () => {
            this.isDown = false;
        });
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new Mouse();
        }
        return this.instance;
    }
    addEvent(event, callback) {
        switch (event) {
            case "mousedown":
                window.addEventListener("mousedown", callback);
                break;
            case "mouseup":
                window.addEventListener("mouseup", callback);
                break;
            case "mousemove":
                window.addEventListener("mousemove", callback);
                break;
            default:
                throw new Error(`Unknown event: ${event}`);
        }
    }
}
Mouse.instance = null;
