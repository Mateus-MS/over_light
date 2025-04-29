export function Movable(Base) {
    return class Movable extends Base {
        move() {
            console.log(`Moving with position`);
        }
    };
}
export function isMovable(entity) {
    return 'move' in entity;
}
