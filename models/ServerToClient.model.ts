import SocketData from './socketData.model'

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    userIsJoined: (success: boolean) => void;
    userJoined: (data: SocketData) => void;

}

export default ServerToClientEvents