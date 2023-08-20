import {SocketData, SocketSequence, Tool} from '../models';

interface ClientToServerEvents {
    eraseCanvas: () => void;
    syncTool: (data: Tool) => void;
    createRoom: (data: SocketData) => void;
    joinRoom: (data: SocketData, callback: (b: boolean) => void) => void;
}

export default ClientToServerEvents