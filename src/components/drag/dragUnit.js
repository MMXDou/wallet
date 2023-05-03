import { eventEmitter } from "../event";
import { GetElements } from "../utils/getElements";
import { DragBasic } from "./dragBasic";

class DragUnit extends DragBasic {

    // static self = null

    constructor(dragUnit) {
        super(dragUnit, dragUnit)
        // if (DragContainer.self) {
        //     return
        // }
        // DragContainer.self = this
        this.dragUnit = dragUnit
        this.zIndex = this.dragUnit.style.zIndex
        this.transition = this.dragUnit.style.transition

        this.run()
    }


    _mouseDownOnDragElement = (event) => {
        super._mouseDownOnDragElement(event)
        this.dragUnit.style.zIndex = 999
        this.dragUnit.style.transition = 'none'
    }

    _mouseMoveToDrag = (event) => {
        if (this.isMouseDownOnDragElement) {
            this.moveDistance.x = event.clientX - this.startPosition.x
            this.moveDistance.y = event.clientY - this.startPosition.y
            if (this.moveDistance.x < -112 && GetElements.getUnitsExceptAddUnit().indexOf(this.moveTarget) != 0) {
                this.moveTarget.previousSibling.insertAdjacentElement('beforebegin', this.moveTarget)
                // this.moveTarget.parentNode.insertBefore(this.moveTarget, this.moveTarget.previousSibling)
                this.startPosition.x = this.startPosition.x - 112
            }
            if (this.moveDistance.x > 112 && this.moveTarget.nextSibling != GetElements.getAddUnit()) {
                this.moveTarget.nextSibling.insertAdjacentElement('afterend', this.moveTarget)
                // this.moveTarget.parentNode.insertBefore(this.moveTarget, this.moveTarget.previousSibling)
                this.startPosition.x = this.startPosition.x + 112
            }
            // console.log(`${event.clientX} - ${this.startPosition.x} + ${+ this.alreadyMovedDistance.x}= ${event.clientX - this.startPosition.x}`);
            this.moveTarget.style.transform = `translate(${this.moveDistance.x}px, ${this.moveDistance.y}px)`

        }
    }

    _mouseUpFromDragElement = (event) => {
        this.isMouseDownOnDragElement = false
        this.moveTarget.style.transform = `translate(0px, 0px)`
        this.dragUnit.style.zIndex = this.zIndex
        this.dragUnit.style.transition = this.transition
    }

}

eventEmitter.on('newUnitCreated', newUnit => {
    new DragUnit(newUnit)
})
