import { Point } from '../client/node_modules/roughjs/bin/geometry'

interface Tool {
    type: string,
    offsetX: number,
    offsetY: number,
    path?: Point[],
    width?: number,
    height?: number,
    stroke: string,
    strokeWidth: number,
}

export default Tool