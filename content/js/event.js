export default class Event {
    constructor(element) {
        this.stateKey = {};
        this.mouse = {
            x: 0,
            y: 0,
        };
        this.getStateKey = (keyCode) => this.stateKey[keyCode];
        this.getStateKeyMouse = (keyCode) => this.mouse[keyCode];
        element.addEventListener("keydown", (e) => {
            this.stateKey[e.code] = true;
        });
        element.addEventListener("keyup", (e) => {
            this.stateKey[e.code] = false;
        });
        element.addEventListener("mousedown", (e) => {
            this.mouse[e.button] = true;
        });
        element.addEventListener("mouseup", (e) => {
            this.mouse[e.button] = false;
        });
    }
}
