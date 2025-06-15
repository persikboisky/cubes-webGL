import { Matrix4, radians, Vector3 } from "./math.js";
import { ASPECT } from "./util.js";

export default class Camera {

    private pos: Vector3 = null;
    private target: Vector3 = null;
    private fov: number = 0;
    private distance: number = 0;

    public constructor(pos: Vector3, fov: number, distance: number = 100.0) {
        this.pos = pos;
        this.fov = radians(fov);
        this.target = new Vector3(0, 0, 1);
        this.distance = distance;
    }

    public getProj(): number[] {
        return Matrix4.getPerspective(this.fov, ASPECT, 0.1, this.distance).getArray();
    }

    public getView(): number[] {
        return Matrix4.getLookAt(
            this.pos, 
            Vector3.add(this.pos, this.target),
            new Vector3(0, 1, 0)
        ).getArray();
    }

    public setPos(x: number, y: number, z: number): void {
        this.pos.x = x;
        this.pos.y = y;
        this.pos.z = z;
    }
}