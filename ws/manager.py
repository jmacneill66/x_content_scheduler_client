# ws/manager.py

from fastapi import WebSocket
from typing import List, Dict, Any


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_personal_message(self, message: Dict[str, Any], websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, message: Dict[str, Any]):
        for connection in self.active_connections:
            await connection.send_json(message)

    async def get_active_connections(self) -> List[WebSocket]:
        return self.active_connections

    async def count_active_connections(self) -> int:
        return len(self.active_connections)

    async def get_connection_ids(self) -> List[str]:
        return [str(id(conn)) for conn in self.active_connections]

    async def disconnect_all(self):
        for connection in self.active_connections:
            await connection.close()
        self.active_connections.clear()

    async def send_message_to_all(self, message: Dict[str, Any]):
        for connection in self.active_connections:
            await connection.send_json(message)

    async def send_message_to_connection(self, message: Dict[str, Any], connection_id: str):
        for connection in self.active_connections:
            if str(id(connection)) == connection_id:
                await connection.send_json(message)
                break
        else:
            raise ValueError(
                f"No active connection found with ID: {connection_id}")

    async def get_connection_by_id(self, connection_id: str) -> WebSocket:
        for connection in self.active_connections:
            if str(id(connection)) == connection_id:
                return connection
        raise ValueError(
            f"No active connection found with ID: {connection_id}")

    async def get_all_connections(self) -> List[WebSocket]:
        return self.active_connections

    async def get_connection_count(self) -> int:
        return len(self.active_connections)
