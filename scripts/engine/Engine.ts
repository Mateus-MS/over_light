import { Entity } from "../objects/Entity.js";
import { Draw } from "../utils/Draw.js";
import { Mouse } from "../utils/Mouse.js";
import { Vector } from "../utils/Vector.js";

export class Engine {

    private static instance: Engine | null = null;

    private canvas: HTMLCanvasElement;
    private updateLoopInterval: number | null = null;
    private c: CanvasRenderingContext2D | null = null;

    public DRAW: Draw;
    public ENTITIES: Entity[] = [];
    public MOUSE: Mouse = Mouse.getInstance();

    public readonly frameRate: number = 60;
    public readonly SCREEN_SIZE: Vector = new Vector(window.innerWidth, window.innerHeight);

    // Variables for FPS display
    public showFPS: boolean = true;

    private fpsDisplayPosition: Vector = new Vector(10, 30);
    private lastSecond: number | undefined = undefined;
    private frameCount: number = 0;
    private lastFPS: number = 0;

    private constructor(){
        this.canvas = this.initCanvas();
        this.c = this.canvas.getContext("2d");

        this.DRAW = Draw.getInstance(this.c);

        this.SCREEN_SIZE.calcHalf();
    }

    public static getInstance(): Engine {
        if(this.instance === null){
            this.instance = new Engine();
        }
        return this.instance;
    }

    public StartEngine(startFunction: ()=> void, updateFunction: ()=> void, context: any){
        // BUG?: The update loop is starting 4 calls before the Start method.

        // Bind the context of the start and update functions to the current instance
        this.Start = startFunction.bind(context);
        this.Update = updateFunction.bind(context);

        // Start the engine
        this.Start();
        this.startUpdate();
    }

    private initCanvas(): HTMLCanvasElement {
        let canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        document.body.appendChild(canvas);

        return canvas;
    }

    public Start(){
        throw new Error("Start method not implemented in Engine.");
    }

    public Update(){
        throw new Error("Update method not implemented in Engine.");
    }

    private startUpdate(){
        this.updateLoopInterval = setInterval(() => {
            this.updateLoop();
        }, 1000 / this.frameRate);
    }

    /**
     * Responsible for the logic off counting the FPS then showing it.
     */
    private updateLoop(){
        if(this.lastSecond === undefined){
            this.lastSecond = new Date().getSeconds();
        }

        let currentSecond = new Date().getSeconds();

        if(currentSecond - this.lastSecond >= 1 ){
            this.lastSecond = currentSecond;
            this.lastFPS = this.frameCount;
            this.frameCount = 0;
        } else {
            this.frameCount++;
        }

        // Clear the canvas
        this.c?.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if(this.showFPS){
            this.DRAW.Text({
                text: `FPS: ${this.lastFPS}`,
                position: this.fpsDisplayPosition,
                fill: { 
                    color: "black" 
                },
                aligment: "left",
                font: "Arial",
                fontSize: 25
            });
        }

        this.Update();
    }
}