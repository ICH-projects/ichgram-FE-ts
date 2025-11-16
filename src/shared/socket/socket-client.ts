import { io, Socket } from "socket.io-client";
import { addMessagesListener, addNotificationsListener } from "./listeners";

const { VITE_WEBSOCKET_URL: socketURL } = import.meta.env;

export const AppSocket = (function () {
  let _instance: Socket | null;

  function createInstance() {
    const socket = io(`${socketURL}`, {
      withCredentials: true,
    });
    socket.on("connect", function () {
      console.log("Socket connected", socket.connected);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      console.log("Socket connected", socket.connected);
      _instance = null;
    });
    addNotificationsListener(socket);
    addMessagesListener(socket);

    return socket;
  }

  return {
    getInstance: function () {
      if (!_instance) {
        _instance = createInstance();
      }
      return _instance;
    },
  };
})();
