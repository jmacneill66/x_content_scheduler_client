# app/routes/post_routes.py

from fastapi import APIRouter, HTTPException
from app.models.post import PostCreate
from ws.manager import ConnectionManager
import json, asyncio

router = APIRouter()
manager = ConnectionManager()

posts_db = []
post_id_counter = 1

@router.get("/scheduled")
async def get_scheduled_posts():
    return [post for post in posts_db if post["status"] == "scheduled"]

@router.post("/", status_code=201)
async def create_post(post: PostCreate):
    global post_id_counter
    new_post = post.dict()
    new_post["id"] = post_id_counter
    new_post["status"] = "draft"
    post_id_counter += 1
    posts_db.append(new_post)

    await manager.broadcast({
        "type": "post_created",
        "data": new_post
    })

    return new_post

@router.get("/")
async def get_all_posts():
    return posts_db

@router.get("/{post_id}")
async def get_post(post_id: int):
    post = next((post for post in posts_db if post["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.put("/{post_id}")
async def update_post(post_id: int, updated_post: PostCreate):
    post = next((post for post in posts_db if post["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    post.update(updated_post.dict(exclude_unset=True))

    await manager.broadcast({
        "type": "post_updated",
        "data": post
    })

    return post

@router.delete("/{post_id}")
async def delete_post(post_id: int):
    global posts_db
    post = next((post for post in posts_db if post["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    posts_db = [p for p in posts_db if p["id"] != post_id]

    await manager.broadcast({
        "type": "post_deleted",
        "data": {"id": post_id}
    })
    return {"message": "Post deleted successfully"}

@router.post("/{post_id}/publish")
async def publish_post(post_id: int):
    post = next((post for post in posts_db if post["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    await asyncio.sleep(1)
    post["status"] = "published"
    await manager.broadcast({
        "type": "post_published",
        "data": post
    })
    return post

@router.post("/{post_id}/schedule")
async def schedule_post(post_id: int, scheduled_time: str):
    post = next((post for post in posts_db if post["id"] == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    post["scheduled_time"] = scheduled_time
    await manager.broadcast({
        "type": "post_scheduled",
        "data": post
    })
    return post
