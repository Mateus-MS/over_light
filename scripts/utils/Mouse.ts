import { ScreenCoordinate } from "../engine/type/Coordinates.js";

export enum MouseState {
    Idle,
    Dragging,
    Selecting,
}

export class Mouse {
    
    private static instance: Mouse | null = null;
    
    public position: ScreenCoordinate = new ScreenCoordinate(0, 0);
    public isDown: boolean = false;
    public state: MouseState = MouseState.Idle;
    public clickTime: number | undefined = undefined;

    private constructor(){
        this.initiateListeners();
    }

    private initiateListeners(){
        window.addEventListener("mousemove", (event: MouseEvent) => {
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

    public static getInstance(): Mouse {
        if(this.instance === null){
            this.instance = new Mouse();
        }
        return this.instance;
    }

    public addEvent(event: string, callback: (e: MouseEvent) => any){
        switch(event){
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