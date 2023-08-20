import {Tool} from '.'

interface SocketSequence {
    type: string;
    roomId: string;
    elements: Tool
}

export default SocketSequence