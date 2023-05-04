import { eventEmitter } from "../event";
import { GetElements } from "../utils/getElements";
import { DragBasic } from "./dragBasic";

class DragUnit extends DragBasic {

    constructor(dragUnit) {
        super(dragUnit, dragUnit)

        this.dragUnit = dragUnit
        this.zIndex = this.dragUnit.style.zIndex
        // this.transition = this.dragUnit.style.transition
        // this.currentIndex = -1
        // this.originalIndex = -1
        this.run()

    }


    _mouseDownOnDragElement = (event) => {
        super._mouseDownOnDragElement(event)
        this.dragUnit.style.zIndex = 999
        this.currentIndex = GetElements.getUnitsExceptAddUnit().indexOf(this.dragUnit)
        this.originalIndex = GetElements.getUnitsExceptAddUnit().indexOf(this.dragUnit)
        this.moveDistanceFromLastNode = 0
        this.countPassedNode = 0
        this.moveDistance = { x: 0, y: 0 }
        this.ifChangedPosition = false
        // this.dragUnit.style.transition = 'none'

        console.log('currentIndex:', this.currentIndex);
        console.log('originalIndex:', this.originalIndex);
        console.log('passed node', this.countPassedNode);
        console.log('this.startPosition.x:', this.startPosition.x);
        console.log(' event.clientX:', event.clientX);
        console.log('this.moveDistance.x:', this.moveDistance.x);
        console.log('this.isMouseDownOnDragElement:', this.isMouseDownOnDragElement);
    }

    _mouseMoveToDrag = (event) => {
        // if (this.isMouseDownOnDragElement) {
        //     this.moveDistance.x = event.clientX - this.startPosition.x
        //     this.moveDistance.y = event.clientY - this.startPosition.y
        //     if (this.moveDistance.x < -114 && GetElements.getUnitsExceptAddUnit().indexOf(this.moveTarget) != 0) {
        //         // this.dragUnit.previousSibling.style.transition = '0.5s'
        //         // this.dragUnit.previousSibling.insertAdjacentElement('beforebegin', this.dragUnit)
        //         this.moveTarget.parentNode.insertBefore(this.moveTarget, this.moveTarget.previousSibling)
        //         this.startPosition.x = event.clientX
        //         // this.moveTarget.previousSibling.transition = this.transition
        //     }
        //     if (this.moveDistance.x > 114 && this.dragUnit.nextSibling != GetElements.getAddUnit()) {
        //         // this.dragUnit.nextSibling.insertAdjacentElement('afterend', this.dragUnit)
        //         this.moveTarget.parentNode.insertBefore(this.moveTarget.nextSibling, this.moveTarget)
        //         this.startPosition.x = event.clientX

        //     }
        //     this.dragUnit.style.transform = `translate(${this.moveDistance.x}px, ${this.moveDistance.y}px)`
        // }
        if (this.isMouseDownOnDragElement) {
            this.moveDistance.x = event.clientX - this.startPosition.x
            this.moveDistance.y = event.clientY - this.startPosition.y
            this.moveDistanceFromLastNode = this.moveDistance.x - this.countPassedNode * 114
            console.log(`${this.moveDistanceFromLastNode} = ${this.moveDistance.x} - ${this.countPassedNode * 114}`);
            if (this.moveDistance.x < 0) {
                if (this.moveDistanceFromLastNode < -114 && this.currentIndex > 0) {
                    this.currentIndex--
                    this.dragUnit.parentNode.children[this.currentIndex].style.transform = `translateX(114px)`
                    this.countPassedNode--

                    console.log('index:', this.currentIndex);
                    console.log('passed node', this.countPassedNode);
                }
                if (this.moveDistanceFromLastNode > 114 && this.currentIndex < this.originalIndex) {
                    this.currentIndex++
                    this.dragUnit.parentNode.children[this.currentIndex - 1].style.transform = `translateX(0px)`
                    this.countPassedNode++

                    console.log('index:', this.currentIndex);
                    console.log('passed node', this.countPassedNode);
                }
            }
            if (this.moveDistance.x > 0 && this.countPassedNode < 0) {
                console.log('enter');
                this.currentIndex++
                this.dragUnit.parentNode.children[this.currentIndex - 1].style.transform = `translateX(0px)`
                this.countPassedNode++
            }
            if (this.moveDistance.x > 0) {
                if (this.moveDistanceFromLastNode > 114 && this.currentIndex < GetElements.getUnitsExceptAddUnit().length - 1) {
                    this.currentIndex++
                    this.dragUnit.parentNode.children[this.currentIndex].style.transform = `translateX(-114px)`

                    this.countPassedNode++
                    console.log('index:', this.currentIndex);
                    console.log('passed node', this.countPassedNode);
                    console.log('this.moveDistanceFromLastNode:', this.moveDistanceFromLastNode);
                }
                if (this.moveDistanceFromLastNode < -114 && this.currentIndex > this.originalIndex) {
                    console.log(this.moveDistanceFromLastNode);
                    this.currentIndex--
                    this.dragUnit.parentNode.children[this.currentIndex + 1].style.transform = `translateX(0px)`
                    this.countPassedNode--

                    console.log('index:', this.currentIndex);
                    console.log('passed node', this.countPassedNode);
                    console.log('this.moveDistanceFromLastNode:', this.moveDistanceFromLastNode);
                }

            }
            if (this.moveDistance.x < 0 && this.countPassedNode > 0) {
                console.log('enter');
                this.currentIndex--
                this.dragUnit.parentNode.children[this.currentIndex + 1].style.transform = `translateX(0px)`
                this.countPassedNode--
            }

            this.dragUnit.style.transform = `translate(${this.moveDistance.x}px, ${this.moveDistance.y}px)`
        }
    }

    _mouseUpFromDragElement = (event) => {
        this.isMouseDownOnDragElement = false
        // if (this.isMouseDownOnDragElement) {
        console.log('up new');
        // console.log(event.currentTarget);
        // console.log('this.currentIndex:', this.currentIndex);
        // console.log('this.originalIndex:', this.originalIndex);
        // console.log('this unit:', this.dragUnit);
        if (!this.ifChangedPosition) {
            if (this.currentIndex < this.originalIndex) {
                console.log('this.currentIndex:', this.currentIndex);
                console.log('this.originalIndex:', this.originalIndex);
                console.log('left:', this.dragUnit.parentNode.children[this.currentIndex]);
                console.log('this unit:', this.dragUnit);
                this.dragUnit.parentNode.insertBefore(this.dragUnit, this.dragUnit.parentNode.children[this.currentIndex])
                this.ifChangedPosition = true
            }
            if (this.currentIndex > this.originalIndex) {
                console.log('this.currentIndex:', this.currentIndex);
                console.log('this.originalIndex:', this.originalIndex);
                console.log('right:', this.dragUnit.parentNode.children[this.currentIndex + 1]);
                console.log('this unit:', this.dragUnit);
                this.dragUnit.parentNode.insertBefore(this.dragUnit, this.dragUnit.parentNode.children[this.currentIndex + 1])
                this.ifChangedPosition = true
            }
        }

        this.dragUnit.style.transform = `translate(0px, 0px)`
        this.dragUnit.style.zIndex = this.zIndex
        // }

        // this.dragUnit.style.transition = this.transition

    }
}

eventEmitter.on('newUnitCreated', newUnit => {
    new DragUnit(newUnit)
})