import { Draw } from "../utils/Draw.js";
import { Vector } from "../utils/Vector.js";
import { ScreenCoordinate } from "./type/Coordinates.js";
export class Engine {
    static setOffset(offset) {
        Engine.offset = offset;
    }
    static getOffset() {
        return Engine.offset;
    }
    constructor() {
        this.updateLoopInterval = null;
        this.c = null;
        this.ENTITIES = [];
        this.frameRate = 60;
        this.SCREEN_SIZE = new Vector(window.innerWidth, window.innerHeight);
        this.showFPS = true;
        this.fpsDisplayPosition = new Vector(10, 30);
        this.lastSecond = undefined;
        this.frameCount = 0;
        this.lastFPS = 0;
        this.canvas = this.initCanvas();
        this.c = this.canvas.getContext("2d");
        Draw.setContext(this.c);
        this.SCREEN_SIZE.calcHalf();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new Engine();
        }
        return this.instance;
    }
    StartEngine(startFunction, updateFunction, context) {
        this.Start = startFunction.bind(context);
        this.Update = updateFunction.bind(context);
        this.Start();
        this.startUpdate();
    }
    initCanvas() {
        let canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);
        return canvas;
    }
    Start() {
        throw new Error("Start method not implemented in Engine.");
    }
    Update() {
        throw new Error("Update method not implemented in Engine.");
    }
    startUpdate() {
        this.updateLoopInterval = setInterval(() => {
            this.updateLoop();
        }, 1000 / this.frameRate);
    }
    updateLoop() {
        var _a;
        if (this.lastSecond === undefined) {
            this.lastSecond = new Date().getSeconds();
        }
        let currentSecond = new Date().getSeconds();
        if (currentSecond - this.lastSecond >= 1) {
            this.lastSecond = currentSecond;
            this.lastFPS = this.frameCount;
            this.frameCount = 0;
        }
        else {
            this.frameCount++;
        }
        (_a = this.c) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.showFPS) {
            Draw.Text({
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
Engine.instance = null;
Engine.offset = new ScreenCoordinate(0, 0);
