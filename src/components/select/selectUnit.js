import { GetElements } from "../utils/getElements";
import { eventEmitter } from "../event";

class SelectUnit {

    constructor(unit) {
        this.unit = unit
        this.run()
    }

    run() {
        this.selectUnit()
    }

    selectUnit() {
        this.unit.addEventListener('mousedown', this._mouseDownOnUnit.bind(this))
    }

    _mouseDownOnUnit(event) {
        this.currentSelectedUnit = GetElements.getSelectedUnit()
        if (this.currentSelectedUnit != this.unit) {
            this.currentSelectedUnit?.classList.remove(GetElements.selectedClass)
            this.unit.classList.add(GetElements.selectedClass)
        }

    }
}

eventEmitter.on('newUnitCreated', newUnit => {
    new SelectUnit(newUnit)
})
