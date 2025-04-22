/**
 * Some times we have a situation where a half of a specific number is used multiple times.
 * To avoid calculating it multiple times, we can store the number ad its half in this class.
 * 
 * Example:
 * - Screen Size = 1920 x 1080
 * - Half Screen Size = 960 x 540
 * 
 * This is used in a lot of calculations so that makes sense to store it to future use.
 * 
 * The class is more a convention to be very explicit about this behavior.
 */
export class NumberHalf {

    public number: number;
    public half: number;

    constructor(number: number){
        this.number = number;
        this.half = this.number / 2;
    }
}