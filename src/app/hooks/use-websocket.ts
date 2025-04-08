import { Socket, io } from "socket.io-client";
import { create } from "zustand";

interface WebSocketStore {
  socket: Socket | null;
  Connected: boolean;
  ConnectSocket: (spaceId: string) => void;
  data: string | null;
}

export const useWebSocketStore = create<WebSocketStore>((set) => ({
  socket: null,
  Connected: false,
  data: null,

  ConnectSocket: (spaceId?: string, conversationId?: string) => {
    const socket = io("http://localhost:3000/", {
      path: "/ws",
    });

    socket.on("connect", () => {
      console.log("connected");
      socket.emit("create", spaceId);
      socket.emit("create-chat", conversationId);
      set({ Connected: true });
    });

    socket.on("disconnect2", () => {
      console.log("disconnected");
      set({ Connected: false });
    });
    set({ socket });

    socket.on("disconnect", () => {
      console.log("disconnected");
      set({ Connected: false });
    });
    set({ socket });
  },
}));

