import { GL } from "./GL.js";
import { radians, cos, sin, Matrix4, Vector3 } from "./math.js";
import { boxIndices, fragmentShaderText, RGBA, triangleVertices, vertexShaderText } from "./util.js";

export class App {

    canvas = null;
    WIDTH = null;
    HEIGHT = null;
    gl = null;
    ShaderProgram = null;
    VAO = null;
    EBO = null;
    Time = 0;
    saveTime = 0

    interval = 1000 / 60;

    constructor(width, height) {
        this.canvas = document.querySelector("#display");
        this.gl = new GL(this.canvas);

        this.WIDTH = width;
        this.HEIGHT = height;
        this.canvas.width = width;
        this.canvas.height = height;

        this.saveTime = new Date().getSeconds() + new Date().getMilliseconds() / 1000;
    }

    update() {

        let model = Matrix4.getRotateZ(radians(this.Time) * 100);
        model = Matrix4.getRotateX(radians(this.Time) * 100, model);

        const proj = Matrix4.getPerspective(radians(70), 1, 0.1, 100);

        const target = new Vector3(0, 0, 0);
        const pos = new Vector3(
            // sin(radians(this.Time) * 100) * 5, 
            // 0,
            // cos(radians(this.Time) * 100) * 5,
            0,
            0,
            -10
        );
        const up = new Vector3(0, 1, 0);
        const view = Matrix4.getLookAt(pos, target, up);

        // console.table(view.getArray());

        this.gl.setBufferPosSize(0, 0, this.WIDTH, this.HEIGHT);
        this.gl.clear(new RGBA(0, 0, 0, 255));
        this.gl.useShaderProgram(this.ShaderProgram);

        this.gl.setUniformMat4("model", this.ShaderProgram, model.getArray());
        this.gl.setUniformMat4("proj", this.ShaderProgram, proj.getArray());
        this.gl.setUniformMat4("view", this.ShaderProgram, view.getArray());
        this.gl.drawEBO(this.gl.TRIANGLES, boxIndices.length);

        model = Matrix4.getTranslate(4, 0, 0, model);
        this.gl.setUniformMat4("model", this.ShaderProgram, model.getArray());
        this.gl.setUniformMat4("proj", this.ShaderProgram, proj.getArray());
        this.gl.setUniformMat4("view", this.ShaderProgram, view.getArray());
        this.gl.drawEBO(this.gl.TRIANGLES, boxIndices.length);

        model = Matrix4.getTranslate(-8, 0, 0, model);
        this.gl.setUniformMat4("model", this.ShaderProgram, model.getArray());
        this.gl.setUniformMat4("proj", this.ShaderProgram, proj.getArray());
        this.gl.setUniformMat4("view", this.ShaderProgram, view.getArray());
        this.gl.drawEBO(this.gl.TRIANGLES, boxIndices.length);
    }

    intiDraw() {
        this.ShaderProgram = this.gl.createShaderProgram(vertexShaderText, fragmentShaderText);

        this.VAO = this.gl.createVAO(triangleVertices);
        this.gl.linkAttribute(this.ShaderProgram, "vertPosition", 3, 6, 0);
        this.gl.linkAttribute(this.ShaderProgram, "vertColor", 3, 6, 3);

        this.EBO = this.gl.createEBO(boxIndices);
    }

    updateTimer() {
        const data = new Date();
        let t = data.getSeconds() + data.getMilliseconds() / 1000;
        this.Time += Math.abs(t - this.saveTime);
        this.saveTime = t;
    }

    run() {
        this.intiDraw();
        setInterval(() => {

            this.updateTimer();
            this.update();

        }, this.interval);
    }
}