import './select';
import './drag'
import './create'

import { CreateUnit } from './create/createUnit'

import data from '../../data/db.json'
import { GetElements } from './utils/getElements'


data.units.forEach(unitInfo => {
    new CreateUnit(unitInfo)
})

GetElements.getAddUnit().addEventListener('click', () => {
    new CreateUnit()
})