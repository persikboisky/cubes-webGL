

export default class GL {

    private ctx = null;

    public VERTEX: number = 0;
    public FRAGMENT: number = 0;
    public TRIANGLES: GLenum = 0;

    public constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('webgl');

        if (!this.ctx) {
            alert('Your browser does not support Webgl');
        }
        this.ctx.enable(this.ctx.DEPTH_TEST);

        this.VERTEX = this.ctx.VERTEX_SHADER;
        this.FRAGMENT = this.ctx.FRAGMENT_SHADER;
        this.TRIANGLES = this.ctx.TRIANGLES;
    }

    public clear(
        red: number,
        green: number,
        blue: number,
        alpha: number,
        normal: boolean = true
    ): void {
        if (normal) {
            red /= 255;
            green /= 255;
            blue /= 255;
            alpha /= 255;
        }
        this.ctx.clearColor(red, green, blue, alpha);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
    }

    public createShader(type: number, code: string): WebGLShader {
        let shader: WebGLShader = this.ctx.createShader(type);
        this.ctx.shaderSource(shader, code);
        this.ctx.compileShader(shader);
        if (!this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', this.ctx.getShaderInfoLog(shader));
            return;
        }
        return shader;
    }

    public useShaderProgram(id: WebGLProgram): void {
        this.ctx.useProgram(id);
    }

    public createShaderProgram(vert: WebGLShader, frag: WebGLShader): WebGLProgram {
        let program: WebGLProgram = this.ctx.createProgram();
        this.ctx.attachShader(program, vert);
        this.ctx.attachShader(program, frag);
        this.ctx.linkProgram(program);

        if (!this.ctx.getProgramParameter(program, this.ctx.LINK_STATUS)) {
            console.error('ERROR linking program!', this.ctx.getProgramInfoLog(program));
            return;
        }

        //---------------------------------------------------------------------------------------
        this.ctx.validateProgram(program);
        if (!this.ctx.getProgramParameter(program, this.ctx.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', this.ctx.getProgramInfoLog(program));
            return;
        }

        return program;
    }

    public bindVAO(id: WebGLBuffer): void {
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, id);
    }

    public createVAO(array: Float32Array): WebGLBuffer {
        let buffer: WebGLBuffer = this.ctx.createBuffer();
        this.bindVAO(buffer);
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(array), this.ctx.STATIC_DRAW);
        return buffer;
    }

    public linkAttribute(
        program: WebGLProgram,
        name: string,
        n: number,
        size: number,
        indentation: number
    ): void {
        let locate = this.ctx.getAttribLocation(program, name);
        this.ctx.vertexAttribPointer(
            locate,
            n,
            this.ctx.FLOAT,
            this.ctx.FALSE,
            size * Float32Array.BYTES_PER_ELEMENT,
            indentation * Float32Array.BYTES_PER_ELEMENT
        );
        this.ctx.enableVertexAttribArray(locate);
    }

    public drawVAO(primitive: GLenum, firstVert: number, nVert: number, vao: WebGLBuffer = null): void {
        if (vao != null) {
            this.bindVAO(vao);
        }

        this.ctx.drawArrays(primitive, firstVert, nVert);
    }

    public setBufferPosSize(x: number, y: number, width: number, height: number): void {
        this.ctx.viewport(x, y, width, height);
    }

    public setUniformMat4(name: string, shaderID: WebGLProgram, mat4: Float32Array): void {
        let locate = this.ctx.getUniformLocation(shaderID, name);
        this.ctx.uniformMatrix4fv(locate, this.ctx.FALSE, mat4);
    }

    public bindEBO(idEBO: WebGLBuffer): void {
        this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, idEBO);
    }

    public createEBO(array: number[]): WebGLBuffer {
        let id = this.ctx.createBuffer();
        this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, id);
        this.ctx.bufferData(this.ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(array), this.ctx.STATIC_DRAW);
        return id;
    }

    public drawEBO(primitive: GLenum, size: number, ebo: WebGLBuffer = null): void {
        if (ebo != null) {
            this.bindEBO(ebo);
        }
        this.ctx.drawElements(primitive, size, this.ctx.UNSIGNED_SHORT, 0);
    }
}   
