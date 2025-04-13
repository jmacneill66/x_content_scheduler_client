# ws/handlers.py

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from .manager import ConnectionManager

router = APIRouter()
manager = ConnectionManager()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            print("Received:", data)
            await manager.broadcast({
                "type": data.get("type"),
                "payload": data.get("payload"),
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket)
