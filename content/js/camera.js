import { Matrix4, radians, Vector3 } from "./math.js";
import { ASPECT } from "./util.js";
export default class Camera {
    constructor(pos, fov, distance = 100.0) {
        this.pos = null;
        this.target = null;
        this.fov = 0;
        this.distance = 0;
        this.pos = pos;
        this.fov = radians(fov);
        this.target = new Vector3(0, 0, 1);
        this.distance = distance;
    }
    getProj() {
        return Matrix4.getPerspective(this.fov, ASPECT, 0.1, this.distance).getArray();
    }
    getView() {
        return Matrix4.getLookAt(this.pos, Vector3.add(this.pos, this.target), new Vector3(0, 1, 0)).getArray();
    }
    setPos(x, y, z) {
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
    }
}
