import { GetElements } from "../utils/getElements";
import { DragBasic } from "./dragBasic";

class DragContainer extends DragBasic {

    static self = null

    constructor(dragElement, moveTarget) {
        super(dragElement, moveTarget)
        if (DragContainer.self) {
            return
        }
        DragContainer.self = this
        this.run()
    }

}

new DragContainer(GetElements.getMoveBar(), GetElements.getContainer())