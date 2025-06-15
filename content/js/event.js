export default class Event {
    constructor(element) {
        this.stateKey = {};
        this.mouse = {
            x: 0,
            y: 0,
            "1": false,
            "2": false,
            "3": false,
            "4": false
        };
        this.getStateKey = (keyCode) => this.stateKey[keyCode];
        element.addEventListener("keydown", (e) => {
            this.stateKey[e.code] = true;
        });
        element.addEventListener("keyup", (e) => {
            this.stateKey[e.code] = false;
        });
        element.addEventListener("mousedown", (e) => {
            console.log(e.button);
        });
        element.addEventListener("mouseup", (e) => {
            console.log(e.code);
        });
    }
}
