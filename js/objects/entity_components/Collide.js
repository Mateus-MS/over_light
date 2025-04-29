export function ImplementsCollidable(obj) {
    obj.collide = function (other) {
        console.log("Collision");
    };
}
