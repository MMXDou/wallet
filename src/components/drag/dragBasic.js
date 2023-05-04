export class DragBasic {

    constructor(dragElement, moveTarget) {
        this.dragElement = dragElement
        this.moveTarget = moveTarget
        this.init()
        // this.run()
    }

    init() {
        this.isMouseDownOnDragElement = false

        this.startPosition = { x: 0, y: 0 }

        this.moveDistance = { x: 0, y: 0 }

        this.alreadyMovedDistance = { x: 0, y: 0 }
    }

    run() {
        this.mouseDown()
        this.mouseUp()
        this.mouseMove()
    }

    mouseDown() {
        this.dragElement.addEventListener('mousedown', this._mouseDownOnDragElement.bind(this))
    }

    mouseMove() {
        document.body.addEventListener('mousemove', this._mouseMoveToDrag.bind(this))
    }

    mouseUp() {
        document.body.addEventListener('mouseup', this._mouseUpFromDragElement.bind(this))
    }

    _mouseDownOnDragElement(event) {
        this.isMouseDownOnDragElement = true
        this.startPosition.x = event.clientX
        this.startPosition.y = event.clientY

    }

    _mouseMoveToDrag(event) {
        console.log('enter');
        if (this.isMouseDownOnDragElement) {
            this.moveDistance.x = event.clientX - this.startPosition.x + this.alreadyMovedDistance.x
            this.moveDistance.y = event.clientY - this.startPosition.y + this.alreadyMovedDistance.y
            // console.log(`${event.clientX} - ${this.startPosition.x} + ${+ this.alreadyMovedDistance.x}= ${event.clientX - this.startPosition.x}`);
            this.moveTarget.style.transform = `translate(${this.moveDistance.x}px, ${this.moveDistance.y}px)`

        }
    }

    _mouseUpFromDragElement(event) {
        this.isMouseDownOnDragElement = false
        this.alreadyMovedDistance.x = this.moveDistance.x
        this.alreadyMovedDistance.y = this.moveDistance.y
    }

}