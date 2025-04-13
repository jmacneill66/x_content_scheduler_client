// src/services/websocket.ts

let socket: WebSocket | null = null;
const listeners = new Map<string, (payload: any) => void>();

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

export const connectWebSocket = (): WebSocket => {
  if (socket && [WebSocket.CONNECTING, WebSocket.OPEN].includes(socket.readyState as 0 | 1)) {
    return socket;
  }

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log('[WebSocket] Connected');
  };

  socket.onmessage = (event) => {
    try {
      const { type, payload } = JSON.parse(event.data);
      const handler = listeners.get(type);
      if (handler) handler(payload);
    } catch (error) {
      console.error('[WebSocket] Error parsing message:', error);
    }
  };

  socket.onclose = () => {
    console.warn('[WebSocket] Disconnected');
    socket = null;
  };

  socket.onerror = (error) => {
    console.error('[WebSocket] Error:', error);
  };

  return socket;
};

export const registerListener = (type: string, callback: (payload: any) => void) => {
  listeners.set(type, callback);
};

export const unregisterListener = (type: string) => {
  listeners.delete(type);
};

export const sendMessage = (type: string, payload: any) => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn('[WebSocket] Not connected');
    return;
  }
  socket.send(JSON.stringify({ type, payload }));
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};
