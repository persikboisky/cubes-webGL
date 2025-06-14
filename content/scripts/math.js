export const sin = (radians) => Math.sin(radians);
export const cos = (radians) => Math.cos(radians);
export const tan = (radians) => Math.tan(radians);

export const radians = (degrees) => Math.PI / 180.0 * degrees;
export const degrees = (radians) => 180.0 / Math.PI * radians;

export class Vector3 {

    x = null;
    y = null;
    z = null;

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static sum = (vec1, vec2) => new Vector3(vec1.x + vec2.x, vec1.y + vec2.y, vec1.z + vec2.z);
    static dif = (vec1, vec2) => new Vector3(vec1.x - vec2.x, vec1.y - vec2.y, vec1.z - vec2.z);

    length = () => Math.sqrt((this.x ** 2) + (this.y ** 2) + (this.z ** 2));

    normal() {
        const length = this.length();
        return new Vector3(
            this.x / length,
            this.y / length,
            this.z / length
        );
    }

    static normalize(vec) {
        const length = vec.length();
        return new Vector3(
            vec.x / length,
            vec.y / length,
            vec.z / length
        );
    }

    static cross(vec1, vec2) {
        return new Vector3(
            vec1.y * vec2.z - vec1.z * vec2.y,
            vec1.z * vec2.x - vec1.x * vec2.z,
            vec1.x * vec2.y - vec1.y * vec2.x
        );
    }

    static dot = (vec1, vec2) => vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;

}

export class Matrix4 {

    array = null

    constructor(diagonal = 1.0) {
        this.array = new Array(16);
        this.array.fill(0);
        this.array[0] = diagonal;
        this.array[5] = diagonal;
        this.array[10] = diagonal;
        this.array[15] = 1;
    }

    getArray = () => this.array;
    setArray = (array) => this.array = array;

    static getScale(x, y, z, oldMatrix = new Matrix4(1.0)) {
        const mat = new Matrix4(1.0);
        mat.array[5] = x;
        mat.array[10] = y;
        mat.array[15] = z;
        return Matrix4.multiply(mat, oldMatrix);
    }

    static getTranslate(x, y, z, oldMatrix = new Matrix4(1.0)) {
        const mat = new Matrix4(1.0);
        mat.array[12] = x;
        mat.array[13] = y;
        mat.array[14] = z;
        return Matrix4.multiply(mat, oldMatrix);
    }

    static getRotateX(angleToRadians, oldMatrix = new Matrix4(1.0)) {
        const COS = cos(angleToRadians);
        const SIN = sin(angleToRadians);
        const mat = new Matrix4(1.0);
        mat.array[5] = COS;
        mat.array[6] = -SIN;
        mat.array[9] = SIN;
        mat.array[10] = COS;
        return Matrix4.multiply(mat, oldMatrix);
    }

    static getRotateY(angleToRadians, oldMatrix = new Matrix4(1.0)) {
        const COS = cos(angleToRadians);
        const SIN = sin(angleToRadians);
        const mat = new Matrix4(1.0);
        mat.array[0] = COS;
        mat.array[2] = -SIN;
        mat.array[8] = SIN;
        mat.array[6] = COS;
        return Matrix4.multiply(mat, oldMatrix);
    }

    static getRotateZ(angleToRadians, oldMatrix = new Matrix4(1.0)) {
        const COS = cos(angleToRadians);
        const SIN = sin(angleToRadians);
        const mat = new Matrix4(1.0);
        mat.array[0] = COS;
        mat.array[1] = -SIN;
        mat.array[4] = SIN;
        mat.array[5] = COS;
        return Matrix4.multiply(mat, oldMatrix);
    }

    static multiply(mat1, mat2) {
        const mat = new Matrix4(1.0);
        mat1 = mat1.getArray();
        mat2 = mat2.getArray();
        mat.setArray([
            mat1[0] * mat2[0] + mat1[1] * mat2[4] + mat1[2] * mat2[8] + mat1[3] * mat2[12],
            mat1[0] * mat2[1] + mat1[1] * mat2[5] + mat1[2] * mat2[9] + mat1[3] * mat2[13],
            mat1[0] * mat2[2] + mat1[1] * mat2[6] + mat1[2] * mat2[10] + mat1[3] * mat2[14],
            mat1[0] * mat2[3] + mat1[1] * mat2[7] + mat1[2] * mat2[11] + mat1[3] * mat2[15],

            mat1[4] * mat2[0] + mat1[5] * mat2[4] + mat1[6] * mat2[8] + mat1[7] * mat2[12],
            mat1[4] * mat2[1] + mat1[5] * mat2[5] + mat1[6] * mat2[9] + mat1[7] * mat2[13],
            mat1[4] * mat2[2] + mat1[5] * mat2[6] + mat1[6] * mat2[10] + mat1[7] * mat2[14],
            mat1[4] * mat2[3] + mat1[5] * mat2[7] + mat1[6] * mat2[11] + mat1[7] * mat2[15],

            mat1[8] * mat2[0] + mat1[9] * mat2[4] + mat1[10] * mat2[8] + mat1[11] * mat2[12],
            mat1[8] * mat2[1] + mat1[9] * mat2[5] + mat1[10] * mat2[9] + mat1[11] * mat2[13],
            mat1[8] * mat2[2] + mat1[9] * mat2[6] + mat1[10] * mat2[10] + mat1[11] * mat2[14],
            mat1[8] * mat2[3] + mat1[9] * mat2[7] + mat1[10] * mat2[11] + mat1[11] * mat2[15],

            mat1[12] * mat2[0] + mat1[13] * mat2[4] + mat1[14] * mat2[8] + mat1[15] * mat2[12],
            mat1[12] * mat2[1] + mat1[13] * mat2[5] + mat1[14] * mat2[9] + mat1[15] * mat2[13],
            mat1[12] * mat2[2] + mat1[13] * mat2[6] + mat1[14] * mat2[10] + mat1[15] * mat2[14],
            mat1[12] * mat2[3] + mat1[13] * mat2[7] + mat1[14] * mat2[11] + mat1[15] * mat2[15]
        ]);
        return mat;
    }

    static getPerspective(fovToRadians, aspect, near, far) {
        const mat = new Matrix4(1.0);
        const TAN = tan(fovToRadians / 2.0);
        mat.array[0] = 1.0 / (aspect * TAN);
        mat.array[5] = 1.0 / TAN;
        mat.array[10] = -((far + near) / (far - near));
        mat.array[11] = -1;
        mat.array[14] = -((2.0 * far * near) / (far - near))
        mat.array[15] = 0;
        return mat;
    }

    static getLookAt(pos, target, up) {
        const mat = new Matrix4(1.0);
        const zaxis = Vector3.normalize(Vector3.dif(target, pos));
        const xaxis = Vector3.normalize(Vector3.cross(up, zaxis));
        const yaxis = Vector3.cross(zaxis, xaxis);
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