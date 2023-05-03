import { eventEmitter } from "../event";
import { GetElements } from "../utils/getElements";
import { DragBasic } from "./dragBasic";

class DragUnit extends DragBasic {

    constructor(dragUnit) {
        super(dragUnit, dragUnit)

        this.dragUnit = dragUnit
        this.zIndex = this.dragUnit.style.zIndex
        // this.transition = this.dragUnit.style.transition

        this.run()
    }


    _mouseDownOnDragElement = (event) => {
        super._mouseDownOnDragElement(event)
        this.dragUnit.style.zIndex = 999
        // this.dragUnit.style.transition = 'none'
    }

    _mouseMoveToDrag = (event) => {
        if (this.isMouseDownOnDragElement) {
            this.moveDistance.x = event.clientX - this.startPosition.x
            this.moveDistance.y = event.clientY - this.startPosition.y
            if (this.moveDistance.x < -113 && GetElements.getUnitsExceptAddUnit().indexOf(this.moveTarget) != 0) {
                // this.dragUnit.previousSibling.style.transition = '0.5s'
                // this.dragUnit.previousSibling.insertAdjacentElement('beforebegin', this.dragUnit)
                this.moveTarget.parentNode.insertBefore(this.moveTarget, this.moveTarget.previousSibling)
                this.startPosition.x = event.clientX
                // this.moveTarget.previousSibling.transition = this.transition
            }
            if (this.moveDistance.x > 113 && this.dragUnit.nextSibling != GetElements.getAddUnit()) {
                // this.dragUnit.nextSibling.insertAdjacentElement('afterend', this.dragUnit)
                this.moveTarget.parentNode.insertBefore(this.moveTarget.nextSibling, this.moveTarget)
                this.startPosition.x = event.clientX

            }
            this.dragUnit.style.transform = `translate(${this.moveDistance.x}px, ${this.moveDistance.y}px)`
        }
    }

    _mouseUpFromDragElement = (event) => {
        this.isMouseDownOnDragElement = false
        this.dragUnit.style.transform = `translate(0px, 0px)`
        this.dragUnit.style.zIndex = this.zIndex
        // this.dragUnit.style.transition = this.transition
    }
}

eventEmitter.on('newUnitCreated', newUnit => {
    new DragUnit(newUnit)
})
