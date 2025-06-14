import { radians } from "./math.js";

export class Camera {

    pos = null;
    fov = null;
    distance = null;

    constructor(pos, fov, distance) {
        this.pos = pos;
        this.fov = radians(fov);
        this.distance = distance;
    }

}