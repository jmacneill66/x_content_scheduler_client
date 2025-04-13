import axios from 'axios';
import { Post } from '../types/Post';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Define the structure expected by create/update
type PostPayload = {
  user_id: number;
  content: string;
  media_url?: string | null;
  scheduled_time: string;
};

export const schedulerService = {
  getScheduledPosts: () => api.get<Post[]>('/posts/scheduled'),
  getAllPosts: () => api.get<Post[]>('/posts'),
  getPost: (postId: string) => api.get<Post>(`/posts/${postId}`),

  createPost: (postData: PostPayload) =>
    api.post<Post>('/posts', postData),

  updatePost: (postId: string, postData: Partial<PostPayload>) =>
    api.put<Post>(`/posts/${postId}`, postData),

  deletePost: (postId: string) =>
    api.delete(`/posts/${postId}`),

  publishPost: (postId: string) =>
    api.post<Post>(`/posts/${postId}/publish`, {}),

  schedulePost: (postId: string, scheduled_time: string) =>
    api.post<Post>(`/posts/${postId}/schedule`, { scheduled_time }),
};

export const mediaService = {
  uploadMedia: (formData: FormData) =>
    api.post<{ url: string }>('/media/upload', formData),
};
