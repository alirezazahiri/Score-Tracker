import {v4} from "uuid"
import faker from "faker"

const createID = () => {
    return v4()
}

const createName = () => {
    return faker.name.findName()
}

export {createID as default, createName};