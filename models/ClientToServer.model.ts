import SocketData from "./socketData.model.js";

interface ClientToServerEvents {
    hello: () => void;
    userJoined: (data: SocketData) => void;
    userIsJoined: (success: boolean) => void;
}

export default ClientToServerEvents