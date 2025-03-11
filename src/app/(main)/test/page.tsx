// "use client";

// import { useWebSocketStore } from "@/app/hooks/use-websocket";
// import { useEffect } from "react";

// export default function Test() {
//   const { ConnectSocket, Connected, socket,data } = useWebSocketStore();
//   useEffect(() => {
//     ConnectSocket();
//   }, []);
//   return (
//     <div>
//       <h1>test</h1>
//       <h1>{JSON.stringify(socket?.id)}</h1>
//       <h1>{Connected}</h1>
//       <h1>{data}</h1>
//     </div>
//   );
// }
