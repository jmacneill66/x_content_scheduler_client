# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ws.handlers import router as websocket_router  
from app.routes.post_routes import router as post_router  
import sys
import os
# Add project root to Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


app = FastAPI(title="X Content Scheduler")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(websocket_router)
app.include_router(post_router, prefix="/posts")


@app.get("/")
async def read_root():
    return {"message": "Welcome to X Content Scheduler API"}
