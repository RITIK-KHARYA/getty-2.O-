import { Socket, io } from "socket.io-client";
import { create } from "zustand";

interface WebSocketStore {
  socket: Socket | null;
  Connected: boolean;
  ConnectSocket: () => void;
}

export const useWebSocketStore = create<WebSocketStore>((set) => ({
  socket: null,
  Connected: false,
  ConnectSocket: () => {
    // const ws = new WebSocket("ws://localhost:3000/api/ws");
    const socket = io("http://localhost:3000/", {
      path: "/ws",
    });
    socket.on("connect", () => {
      console.log("connected");
      set({ Connected: true });
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
      set({ Connected: false });
    });
    set({ socket });
  },
}));
