import {SocketData, SocketSequence, Tool} from '../models';

interface ServerToClientEvents {
    eraseCanvas: () => void;
    syncTool: (data: Tool) => void;
    joinCheck: (b: boolean) => void;
}

export default ServerToClientEvents