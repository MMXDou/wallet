export class GetElements {
    static oneUnitClass = 'one-unit'
    static selectedClass = 'selected-unit'
    static addUnitClass = 'add-unit'
    static moveBarClass = 'moveBar'
    static containerClass = 'container'

    static getUnitsExceptAddUnit() {
        return [...document.querySelectorAll(`.${GetElements.oneUnitClass}`)].filter(unit => !unit.classList.contains(GetElements.addUnitClass))
    }

    static getSelectedUnit() {
        return document.querySelector(`.${GetElements.selectedClass}`)
    }

    static getAddUnit() {
        return document.querySelector(`.${GetElements.addUnitClass}`)
    }

    static getMoveBar() {
        return document.querySelector(`.${this.moveBarClass}`)
    }

    static getContainer() {
        return document.querySelector(`.${this.containerClass}`)
    }
}