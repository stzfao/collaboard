import { Point } from '../client/node_modules/roughjs/bin/geometry'

interface Pencil {
    type: string,
    offsetX: number,
    offsetY: number,
    path?: Point[],
    stroke: string
    
}

export default Pencil