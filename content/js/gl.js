export default class GL {
    constructor(canvas) {
        this.ctx = null;
        this.VERTEX = 0;
        this.FRAGMENT = 0;
        this.TRIANGLES = 0;
        this.ctx = canvas.getContext('webgl');
        if (!this.ctx) {
            alert('Your browser does not support Webgl');
        }
        this.ctx.enable(this.ctx.DEPTH_TEST);
        this.VERTEX = this.ctx.VERTEX_SHADER;
        this.FRAGMENT = this.ctx.FRAGMENT_SHADER;
        this.TRIANGLES = this.ctx.TRIANGLES;
    }
    clear(red, green, blue, alpha, normal = true) {
        if (normal) {
            red /= 255;
            green /= 255;
            blue /= 255;
            alpha /= 255;
        }
        this.ctx.clearColor(red, green, blue, alpha);
        this.ctx.clear(this.ctx.COLOR_BUFFER_BIT | this.ctx.DEPTH_BUFFER_BIT);
    }
    createShader(type, code) {
        let shader = this.ctx.createShader(type);
        this.ctx.shaderSource(shader, code);
        this.ctx.compileShader(shader);
        if (!this.ctx.getShaderParameter(shader, this.ctx.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', this.ctx.getShaderInfoLog(shader));
            return;
        }
        return shader;
    }
    useShaderProgram(id) {
        this.ctx.useProgram(id);
    }
    createShaderProgram(vert, frag) {
        let program = this.ctx.createProgram();
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
    bindVAO(id) {
        this.ctx.bindBuffer(this.ctx.ARRAY_BUFFER, id);
    }
    createVAO(array) {
        let buffer = this.ctx.createBuffer();
        this.bindVAO(buffer);
        this.ctx.bufferData(this.ctx.ARRAY_BUFFER, new Float32Array(array), this.ctx.STATIC_DRAW);
        return buffer;
    }
    linkAttribute(program, name, n, size, indentation) {
        let locate = this.ctx.getAttribLocation(program, name);
        this.ctx.vertexAttribPointer(locate, n, this.ctx.FLOAT, this.ctx.FALSE, size * Float32Array.BYTES_PER_ELEMENT, indentation * Float32Array.BYTES_PER_ELEMENT);
        this.ctx.enableVertexAttribArray(locate);
    }
    drawVAO(primitive, firstVert, nVert, vao = null) {
        if (vao != null) {
            this.bindVAO(vao);
        }
        this.ctx.drawArrays(primitive, firstVert, nVert);
    }
    setBufferPosSize(x, y, width, height) {
        this.ctx.viewport(x, y, width, height);
    }
    setUniformMat4(name, shaderID, mat4) {
        let locate = this.ctx.getUniformLocation(shaderID, name);
        this.ctx.uniformMatrix4fv(locate, this.ctx.FALSE, mat4);
    }
    bindEBO(idEBO) {
        this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, idEBO);
    }
    createEBO(array) {
        let id = this.ctx.createBuffer();
        this.ctx.bindBuffer(this.ctx.ELEMENT_ARRAY_BUFFER, id);
        this.ctx.bufferData(this.ctx.ELEMENT_ARRAY_BUFFER, new Uint16Array(array), this.ctx.STATIC_DRAW);
        return id;
    }
    drawEBO(primitive, size, ebo = null) {
        if (ebo != null) {
            this.bindEBO(ebo);
        }
        this.ctx.drawElements(primitive, size, this.ctx.UNSIGNED_SHORT, 0);
    }
}
