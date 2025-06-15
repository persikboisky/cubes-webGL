import Camera from "./camera.js";
import Event from "./event.js";
import GL from "./gl.js";
import { Matrix4, radians, Vector3 } from "./math.js";
import { fragmentShaderText, indicesBuffer, SPEED, vertexBuffer, vertexShaderText } from "./util.js";
export default class App {
    constructor(width = 600, height = 600, TIC = 60) {
        this.canvas = null;
        this.event = null;
        this.width = 0;
        this.height = 0;
        this.interval = 0;
        this.gl = null;
        this.program = null;
        this.vao = null;
        this.ebo = null;
        this.saveTime = 0;
        this.Time = 0;
        this.pos = new Vector3(0, 0, -4);
        this.cam = new Camera(new Vector3(0, 0, -5), 70, 100);
        this.canvas = document.querySelector("#display");
        this.width = width;
        this.height = height;
        this.interval = 1000 / TIC;
        this.canvas.width = width;
        this.canvas.height = height;
        this.saveTime = new Date().getSeconds() + new Date().getMilliseconds() / 1000;
        this.event = new Event(document);
    }
    init() {
        this.gl = new GL(this.canvas);
        let vert = this.gl.createShader(this.gl.VERTEX, vertexShaderText);
        let frag = this.gl.createShader(this.gl.FRAGMENT, fragmentShaderText);
        this.program = this.gl.createShaderProgram(vert, frag);
        this.gl.useShaderProgram(this.program);
        this.vao = this.gl.createVAO(vertexBuffer);
        this.gl.bindVAO(this.vao);
        this.gl.linkAttribute(this.program, "vertPosition", 3, 6, 0);
        this.gl.linkAttribute(this.program, "vertColor", 3, 6, 3);
        this.ebo = this.gl.createEBO(indicesBuffer);
        this.gl.bindEBO(this.ebo);
    }
    move() {
        if (this.event.getStateKey("KeyW")) {
            this.pos.z += SPEED;
        }
        if (this.event.getStateKey("KeyS")) {
            this.pos.z += -SPEED;
        }
        if (this.event.getStateKey("KeyA")) {
            this.pos.x += SPEED;
        }
        if (this.event.getStateKey("KeyD")) {
            this.pos.x += -SPEED;
        }
    }
    update() {
        let model = new Matrix4(1.0);
        model = Matrix4.getRotateZ(radians(this.Time) * 30, model);
        model = Matrix4.getRotateX(radians(this.Time) * 30, model);
        this.cam.setPos(this.pos.x, this.pos.y, this.pos.z);
        this.gl.setUniformMat4("model", this.program, model.getArray());
        this.gl.setUniformMat4("proj", this.program, this.cam.getProj());
        this.gl.setUniformMat4("view", this.program, this.cam.getView());
        this.gl.setBufferPosSize(0, 0, this.width, this.height);
        this.gl.clear(0, 0, 0, 255);
        this.gl.drawEBO(this.gl.TRIANGLES, indicesBuffer.length);
    }
    updateTimer() {
        const data = new Date();
        let t = data.getSeconds() + data.getMilliseconds() / 1000;
        this.Time += Math.abs(t - this.saveTime);
        this.saveTime = t;
    }
    run() {
        this.init();
        setInterval(() => {
            this.move();
            this.update();
            this.updateTimer();
        }, this.interval);
    }
}
