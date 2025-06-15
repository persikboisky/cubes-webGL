export const sin = (radians: number): number => Math.sin(radians);
export const cos = (radians: number): number => Math.cos(radians);
export const tan = (radians: number): number => Math.tan(radians);

export const radians = (degrees: number): number => Math.PI / 180.0 * degrees;
export const degrees = (radians: number): number => 180.0 / Math.PI * radians;

export class Vector3 {

    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public static add(vec1: Vector3, vec2: Vector3): Vector3 {
        return new Vector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
    }

    public static dif(vec1: Vector3, vec2: Vector3): Vector3 {
        return new Vector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);
    }

    public length() {
        return Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2));
    }

    public static cross(vec1: Vector3, vec2: Vector3): Vector3 {
        return new Vector3(
            vec1.y * vec2.z - vec1.z * vec2.y,
            vec1.z * vec2.x - vec1.x * vec2.z,
            vec1.x * vec2.y - vec1.y * vec2.x
        );
    }

    public static dot(vec1: Vector3, vec2: Vector3): number {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }

    public static normalize(vec: Vector3): Vector3 {
        const length = vec.length();
        return new Vector3(
            vec.x / length,
            vec.y / length,
            vec.z / length
        );
    }
}


export class Matrix4 {

    public array: number[] = null;

    public constructor(diagonal: number = 1.0) {
        this.array = new Array(16);
        this.array.fill(0.0);

        this.array[0] = diagonal;
        this.array[5] = diagonal;
        this.array[10] = diagonal;
        this.array[15] = 1.0;
    }

    public setArray(array: number[]): void {
        this.array = array;
    }

    public getArray(): number[] {
        return this.array;
    }

    public static multiply(mat4_1: Matrix4, mat4_2: Matrix4): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        const mat1: number[] = mat4_1.getArray();
        const mat2: number[] = mat4_2.getArray();

        mat.array[0] = mat1[0] * mat2[0] + mat1[1] * mat2[4] + mat1[2] * mat2[8] + mat1[3] * mat2[12];
        mat.array[1] = mat1[0] * mat2[1] + mat1[1] * mat2[5] + mat1[2] * mat2[9] + mat1[3] * mat2[13];
        mat.array[2] = mat1[0] * mat2[2] + mat1[1] * mat2[6] + mat1[2] * mat2[10] + mat1[3] * mat2[14];
        mat.array[3] = mat1[0] * mat2[3] + mat1[1] * mat2[7] + mat1[2] * mat2[11] + mat1[3] * mat2[15];

        mat.array[4] = mat1[4] * mat2[0] + mat1[5] * mat2[4] + mat1[6] * mat2[8] + mat1[7] * mat2[12];
        mat.array[5] = mat1[4] * mat2[1] + mat1[5] * mat2[5] + mat1[6] * mat2[9] + mat1[7] * mat2[13];
        mat.array[6] = mat1[4] * mat2[2] + mat1[5] * mat2[6] + mat1[6] * mat2[10] + mat1[7] * mat2[14];
        mat.array[7] = mat1[4] * mat2[3] + mat1[5] * mat2[7] + mat1[6] * mat2[11] + mat1[7] * mat2[15];

        mat.array[8] = mat1[8] * mat2[0] + mat1[9] * mat2[4] + mat1[10] * mat2[8] + mat1[11] * mat2[12];
        mat.array[9] = mat1[8] * mat2[1] + mat1[9] * mat2[5] + mat1[10] * mat2[9] + mat1[11] * mat2[13];
        mat.array[10] = mat1[8] * mat2[2] + mat1[9] * mat2[6] + mat1[10] * mat2[10] + mat1[11] * mat2[14];
        mat.array[11] = mat1[8] * mat2[3] + mat1[9] * mat2[7] + mat1[10] * mat2[11] + mat1[11] * mat2[15];

        mat.array[12] = mat1[12] * mat2[0] + mat1[13] * mat2[4] + mat1[14] * mat2[8] + mat1[15] * mat2[12];
        mat.array[13] = mat1[12] * mat2[1] + mat1[13] * mat2[5] + mat1[14] * mat2[9] + mat1[15] * mat2[13];
        mat.array[14] = mat1[12] * mat2[2] + mat1[13] * mat2[6] + mat1[14] * mat2[10] + mat1[15] * mat2[14];
        mat.array[15] = mat1[12] * mat2[3] + mat1[13] * mat2[7] + mat1[14] * mat2[11] + mat1[15] * mat2[15];

        return mat;
    }

    public static getScale(sX: number, sY: number, sZ: number, oldMat: Matrix4 = new Matrix4(1.0)): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        mat.array[0] = sX;
        mat.array[5] = sY;
        mat.array[10] = sZ;
        return Matrix4.multiply(oldMat, mat);
    }

    public static getTranslate(x: number, y: number, z: number, oldMat: Matrix4 = new Matrix4(1.0)): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        mat.array[12] = x;
        mat.array[13] = y;
        mat.array[14] = z;
        return Matrix4.multiply(oldMat, mat);
    }

    public static getRotateX(radians: number, oldMat: Matrix4 = new Matrix4(1.0)): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        const SIN: number = sin(radians);
        const COS: number = cos(radians);
        mat.array[5] = COS;
        mat.array[6] = -SIN;
        mat.array[9] = SIN;
        mat.array[10] = COS;

        return Matrix4.multiply(oldMat, mat);
    }

    public static getRotateY(radians: number, oldMat: Matrix4 = new Matrix4(1.0)): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        const SIN: number = sin(radians);
        const COS: number = cos(radians);
        mat.array[0] = COS;
        mat.array[2] = -SIN;
        mat.array[8] = SIN;
        mat.array[11] = COS;

        return Matrix4.multiply(oldMat, mat);
    }

    public static getRotateZ(radians: number, oldMat: Matrix4 = new Matrix4(1.0)): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        const SIN: number = sin(radians);
        const COS: number = cos(radians);
        mat.array[0] = COS;
        mat.array[1] = -SIN;
        mat.array[4] = SIN;
        mat.array[5] = COS;

        return Matrix4.multiply(oldMat, mat);
    }

    public static getPerspective(fovToRadians: number, aspect: number, near: number, far: number): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        const TAN: number = tan(fovToRadians / 2.0);
        mat.array[0] = 1.0 / (aspect * TAN);
        mat.array[5] = 1.0 / TAN;
        mat.array[10] = -((far + near) / (far - near));
        mat.array[11] = -1;
        mat.array[14] = -((2.0 * far * near) / (far - near));
        mat.array[15] = 0;
        return mat;
    }

    public static getLookAt(pos: Vector3, target: Vector3, up: Vector3): Matrix4 {
        const mat: Matrix4 = new Matrix4(1.0);
        const zaxis: Vector3 = Vector3.normalize(Vector3.dif(target, pos));
        const xaxis: Vector3 = Vector3.normalize(Vector3.cross(up, zaxis));
        const yaxis: Vector3 = Vector3.cross(zaxis, xaxis);
        mat.array[0] = xaxis.x;
        mat.array[1] = yaxis.x;
        mat.array[2] = zaxis.x;
        mat.array[4] = xaxis.y;
        mat.array[5] = yaxis.y;
        mat.array[6] = zaxis.y;
        mat.array[8] = xaxis.z;
        mat.array[9] = yaxis.z;
        mat.array[10] = zaxis.z;
        mat.array[12] = Vector3.dot(xaxis, pos);
        mat.array[13] = Vector3.dot(yaxis, pos);
        mat.array[14] = Vector3.dot(zaxis, pos);
        return mat;
    }
}






