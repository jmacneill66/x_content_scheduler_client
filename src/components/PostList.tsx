import React, { useEffect, useState } from 'react';
import { schedulerService } from '../services/api';
import { connectWebSocket, registerListener, unregisterListener } from '../services/websocket';
import { Post } from '../types/Post';

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const fetchPosts = async () => {
    const res = await schedulerService.getAllPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
    connectWebSocket();

    registerListener('post_created', fetchPosts);

    return () => {
      unregisterListener('post_created');
    };
  }, []);

  const handleEdit = (post: Post) => {
    setEditingId(post.id);
    setEditContent(post.content);
  };
  
  const handleDelete = async (postId: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await schedulerService.deletePost(postId.toString());
      setEditingId(null);
      fetchPosts();
    }
  };
  
  const handleUpdate = async (postId: number) => {
    await schedulerService.updatePost(postId.toString(), { content: editContent });
    setEditingId(null);
    fetchPosts();
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white border rounded shadow-sm">
          {editingId === post.id ? (
            <>
              <textarea
                className="w-full p-2 border mb-2"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button className="text-blue-600 mr-3" onClick={() => handleUpdate(post.id)}>
                Save
              </button>
              <button className="text-red-600 mr-3" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
              <button className="text-gray-500 mr-3" onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-800">{post.content}</p>
              <div className="text-sm text-gray-500 mt-1">
                Scheduled: {new Date(post.scheduled_time).toLocaleString()}
              </div>
              <div className="text-right mt-2">
                <button className="text-sm text-blue-600" onClick={() => handleEdit(post)}>
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
