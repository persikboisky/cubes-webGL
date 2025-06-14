

export class GL {

    gl = null;

    TRIANGLES = null;

    constructor(canvas) {

        // инициализируем WebGL
        this.gl = canvas.getContext('webgl');
        if (!this.gl) {
            console.warn('Webgl not supported, falling back on experimental-webgl');
            this.gl = canvas.getContext('experimental-webgl');
        }
        if (!this.gl) {
            alert('Your browser does not support Webgl');
        }

        this.TRIANGLES = this.gl.TRIANGLES;
        this.gl.enable(this.gl.DEPTH_TEST);
        // this.gl.enable(this.gl.CULL_FACE);
        // this.gl.frontFace(this.gl.CCW);
        // this.gl.cullFace(this.gl.BACK);
    }

    useShaderProgram(id) {
        this.gl.useProgram(id);
    }

    createShaderProgram(vertSTR, fragSTR) {
        // создаём шейдеры
        let vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        let fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

        // загружаем код в шейдеры
        this.gl.shaderSource(vertexShader, vertSTR);
        this.gl.shaderSource(fragmentShader, fragSTR);

        // компилируем вершинный шейдер
        this.gl.compileShader(vertexShader);
        if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', this.gl.getShaderInfoLog(vertexShader));
            return;
        }

        // компилируем фрагментный шейдер
        this.gl.compileShader(fragmentShader);
        if (!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', this.gl.getShaderInfoLog(fragmentShader));
            return;
        }

        // создаём шейдерную программу
        let program = this.gl.createProgram();

        // линкуем шейдеры и программу
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('ERROR linking program!', this.gl.getProgramInfoLog(program));
            return;
        }

        //---------------------------------------------------------------------------------------
        this.gl.validateProgram(program);
        if (!this.gl.getProgramParameter(program, this.gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', this.gl.getProgramInfoLog(program));
            return;
        }

        return program;
    }

    bindVAO = (id) => this.gl.bindBuffer(this.gl.ARRAY_BUFFER, id);

    createVAO(array) {
        let triangleVertexBufferObject = this.gl.createBuffer();
        this.bindVAO(triangleVertexBufferObject);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(array), this.gl.STATIC_DRAW);
        return triangleVertexBufferObject;
    }

    linkAttribute(ShaderProgramID, name, n, size, indentation) {
        let locate = this.gl.getAttribLocation(ShaderProgramID, name);
        this.gl.vertexAttribPointer(
            locate,
            n,
            this.gl.FLOAT,
            this.gl.FALSE,
            size * Float32Array.BYTES_PER_ELEMENT,
            indentation * Float32Array.BYTES_PER_ELEMENT
        );
        this.gl.enableVertexAttribArray(locate);
    }

    clear(color) {
        this.gl.clearColor(color.red / 255, color.green / 255, color.blue / 255, color.alpha / 255);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    drawVAO(primitive, firstVert, nVert, vao = null) {
        if (vao != null) {
            this.bindVAO(vao);
        }

        this.gl.drawArrays(primitive, firstVert, nVert);
    }

    setBufferPosSize(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    setUniformMat4(name, shaderID, mat4) {
        let locate = this.gl.getUniformLocation(shaderID, name);
        this.gl.uniformMatrix4fv(locate, this.gl.FALSE, mat4);
    }

    bindEBO(idEBO) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, idEBO);
    }

    createEBO(array) {
        let id = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, id);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(array), this.gl.STATIC_DRAW);
        return id;
    }

    drawEBO(primitive, size, ebo = null) {
        if (ebo != null) {
            this.bindVAO(vao);
        }
        this.gl.drawElements(primitive, size, this.gl.UNSIGNED_SHORT, 0);
    }
}