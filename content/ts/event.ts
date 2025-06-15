

export default class Event {

    private stateKey = {};
    private mouse = {
        x: 0,
        y: 0,
    }

    public constructor(element: Document) {

        element.addEventListener("keydown", (e: KeyboardEvent): void => {
            this.stateKey[e.code] = true;
        });

        element.addEventListener("keyup", (e: KeyboardEvent): void => {
            this.stateKey[e.code] = false;
        });

        element.addEventListener("mousedown", (e: MouseEvent): void => {
            this.mouse[e.button] = true;
        });

        element.addEventListener("mouseup", (e: MouseEvent): void => {
            this.mouse[e.button] = false;
        });
    }

    public getStateKey = (keyCode: string): boolean => this.stateKey[keyCode];
    public getStateKeyMouse = (keyCode: number): boolean => this.mouse[keyCode];

}