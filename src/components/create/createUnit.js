import { GetElements } from "../utils/getElements"
import { eventEmitter } from "../event"

export class CreateUnit {
    constructor(info = {}) {
        this.info = info
        this.init(this.info)
        this.create()
    }

    init() {
        this.info.currency = this.info.currency || 'BTC'
        this.info.num = this.info.num || 69
        this.info.symbol = this.info.symbol || '%'
    }

    create() {
        this.newUnit = document.createElement('div')
        this.newUnit.classList.add(GetElements.oneUnitClass)
        this.newUnit.innerHTML = `
            <span class="currency">${this.info.currency}</span>
            <div>
                <span class="num">${this.info.num}</span>
                <span class="symbol">${this.info.symbol}</span>
            </div>
        `
        GetElements.getAddUnit().insertAdjacentElement('beforebegin', this.newUnit)

        eventEmitter.emit('newUnitCreated', this.newUnit)
    }

}