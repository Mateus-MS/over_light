import { Collisions } from "../engine/Collisions.js";
import { Engine } from "../engine/Engine.js";
import { GameCoordinate, GridCoordinate, ScreenCoordinate } from "../engine/type/Coordinates.js";
import { NumberHalf } from "../engine/type/utils.js";
import { MouseState } from "../utils/Mouse.js";
import { Vector } from "../utils/Vector.js";

// TODO: Add the selecting logic to the grid map
export class GridMap{

    /**
     * The amount of cells in each axis.
     */
    public dimensions: GridCoordinate;
    /**
     * The size of each cell.
     * The size is stored as a NumberHalf to be able to use it in the calculations.
     */
    public size: NumberHalf;
    /**
     * This is used to "pan" everything on the screen.
     * From the grid to the Entities.
     * 
     * TODO: remove this from here and store it on the engine.
     */
    public offset: ScreenCoordinate = new ScreenCoordinate(0, 0);
    
    protected hoveredCell: GridCoordinate | undefined = undefined;

    constructor(dimensions: GridCoordinate, size: number = 20){
        this.dimensions = dimensions;
        this.dimensions.calcHalf();

        this.size = new NumberHalf(size);

        let screenSize = Engine.getInstance().SCREEN_SIZE.copy();
        if(screenSize.half !== undefined){
            this.offset.x = screenSize.half.x;
            this.offset.y = screenSize.half.y;
        } else {
            throw new Error("Screen half size is not defined at grid map creation.");
        }

        this.initiateListeners();
    }

    private initiateListeners(): void{
        let mouse = Engine.getInstance().MOUSE;

        mouse.addEvent("mousedown", (event: MouseEvent) => {
            // If the mouse stay stopped for less than 20ms we consider it a click
            // If the mouse stay stopped for less than 300ms we consider it a drag
            // If the mouse stay stopped for more than 300ms we consider it a selecting
            
            // Reset the mouse state to idle
            mouse.state = MouseState.Idle;
            if(mouse.clickTime === undefined){
                mouse.clickTime = Date.now();
            }
        });

        mouse.addEvent("mouseup", () => {
            // As pointed out in the "mousemove" event.
            // Here if the user do a long click and don't move the mouse, will be registered as a select action.
            if(mouse.clickTime !== undefined && Date.now() - mouse.clickTime >= 200){
                mouse.state = MouseState.Selecting;
            }   
            
            // Reset the click time
            mouse.clickTime = undefined;
            // Reset the mouse state to idle
            mouse.state = MouseState.Idle;
        });

        mouse.addEvent("mousemove", (event: MouseEvent) => {
            // Try to get the hovered cell position
            this.hoveredCell = Engine.getInstance().MOUSE.position.toGridCoordinate(this.size, this.offset);

            // Try to get the action of the mouse
            if(mouse.clickTime !== undefined){
                // Get the passed time since the click
                let time = Date.now() - mouse.clickTime;

                // Test the time to see if it is a click, drag or select
                
                // If the user do a long click and don't move the mouse, this will not be registered HERE.
                // This specific case is handle in the mouse up event.
                if(time < 10){
                    mouse.state = MouseState.Idle;
                }else if(time < 200){
                    mouse.state = MouseState.Dragging;
                }else{
                    mouse.state = MouseState.Selecting;
                }

                mouse.clickTime = undefined;
            }

            // When dragging
            if(mouse.state === MouseState.Dragging){
                this.offset.x += event.movementX;
                this.offset.y += event.movementY;
            }
        });
    }

    public render(): void{
        this.renderHoveredCell();
        this.renderMap();
        this.renderDebug()
    }

    private renderMap(): void{
        let engine = Engine.getInstance();
        
        if (engine.SCREEN_SIZE.half === undefined) throw new Error("Screen half size is not defined.");
        if (this.dimensions.half === undefined) throw new Error("Grid dimensions half is not defined.");

        // Get HALF of the screen size as ScreenCoordinate. Default is Vector 
        let centerAsScreenCoordinate = new ScreenCoordinate(engine.SCREEN_SIZE.half.x, engine.SCREEN_SIZE.half.y);
        // Pretend to be a grid coordinate, so we can use the toGridCoordinate method.
        // This is a trick to get the center of the screen in grid coordinates.
        let cellOnCenterOfScreen = centerAsScreenCoordinate.toGridCoordinate(this.size, this.offset);

        // Calculate how many cells fits on half of screen on each axis.
        // TODO: This should be calculated only once, or after zooming, not every frame.
        let quantityOfCellsThatFitOnAxis = new Vector(
            Math.ceil(engine.SCREEN_SIZE.half.x / this.size.number),
            Math.ceil(engine.SCREEN_SIZE.half.y / this.size.number)
        );

        let x: Vector = new Vector(0, 0);
        let y: Vector = new Vector(0, 0);

        // If there is more colums than cells that fit on the screen
        if(quantityOfCellsThatFitOnAxis.x < this.dimensions.half.x){
            // Calculate the min and max values for each axis.
            x.x = cellOnCenterOfScreen.x - quantityOfCellsThatFitOnAxis.x;
            x.y = cellOnCenterOfScreen.x + quantityOfCellsThatFitOnAxis.x;

            y.x = cellOnCenterOfScreen.y - quantityOfCellsThatFitOnAxis.y
            y.y = cellOnCenterOfScreen.y + quantityOfCellsThatFitOnAxis.y;
        } else {
            // If there is enough space on the screen to fit the grid, draw the whole grid.
            x.x = -this.dimensions.half.x
            x.y = this.dimensions.half.x;

            y.x = -this.dimensions.half.y
            y.y = this.dimensions.half.y;
        }

        // Render only the cells that are in the screen.
        for(let i = x.x; i <= x.y; i++){
            for(let j = y.x; j <= y.y; j++){
                engine.DRAW.Square(
                    // The object style
                    {
                        position: new GridCoordinate(i, j),
                        size: this.size.number,
                        fill: {
                            color: "transparent"
                        },
                        stroke: {
                            color: "black",
                            width: 2
                        }
                    }, 
                    // Grid parameters
                    this.size,
                    this.offset
                );
            }
        }
    }

    private renderHoveredCell(): void{
        if(this.hoveredCell && this.isInBounds(this.hoveredCell)){
            Engine.getInstance().DRAW.Square(
                // The object style
                {
                    position: this.hoveredCell,
                    size: this.size.number,
                    fill: {
                        color: "rgba(0, 0, 255, .3)"
                    },
                    stroke: undefined
                }, 
                // Grid parameters
                this.size,
                this.offset
            );
        }
    }

    private renderDebug(): void{
        let engine = Engine.getInstance();

        // Draw the mouse position in different coordinate formats to test if the conversion is working.
        engine.DRAW.Text({
            text: "Mouse positions: ",
            position: new ScreenCoordinate(15, engine.SCREEN_SIZE.y - 103),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 19
        })

        // Draw the mouse state.
        let mouseState: string;
        switch (engine.MOUSE.state){
            case MouseState.Idle:
                mouseState = "Idle";
                break;
            case MouseState.Dragging:
                mouseState = "Dragging";
                break;
            case MouseState.Selecting:
                mouseState = "Selecting";
                break;
            default:
                mouseState = "Unknown";
        }
        engine.DRAW.Text({
            text: `Mouse state: ${mouseState}`,
            position: new ScreenCoordinate(22, engine.SCREEN_SIZE.y - 80),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        })

        // Draw the grid coordinate
        let gridCoordinate = engine.MOUSE.position.toGridCoordinate(this.size, this.offset);        
        engine.DRAW.Text({
            text: `Grid coordinate: ${gridCoordinate?.x}, ${gridCoordinate?.y}`,
            position: new ScreenCoordinate(22, engine.SCREEN_SIZE.y - 60),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        })

        // Draw the game coordinate
        if(engine.SCREEN_SIZE.half === undefined) throw new Error("Screen half size is not defined.");
        let gameCoordinate = engine.MOUSE.position.toGameCoordinate(this.offset);

        engine.DRAW.Text({
            text: `Game coordinate: ${gameCoordinate?.x}, ${gameCoordinate?.y}`,
            position: new ScreenCoordinate(22, engine.SCREEN_SIZE.y - 40),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        })

        // Draw the screen coordinate
        let screenCoordinate = engine.MOUSE.position;
        engine.DRAW.Text({
            text: `Screen coordinate: ${screenCoordinate?.x}, ${screenCoordinate?.y}`,
            position: new GameCoordinate(22, engine.SCREEN_SIZE.y - 20),
            fill: { color: "black" },
            aligment: "left",
            font: "Arial",
            fontSize: 15
        })
    }

    public isInBounds(coordinate: GridCoordinate): boolean{
        if(this.dimensions.half === undefined) throw new Error("Grid dimensions half is not defined.");

        return Collisions.PointInSquare(coordinate, new Vector(0, 0), this.dimensions.half.x);
    }

}