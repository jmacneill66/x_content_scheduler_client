import React, { useState } from 'react';
import { schedulerService, mediaService } from '../services/api';

interface PostFormProps {
  onPostCreated: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setMediaFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!mediaFile) return null;
      const formData = new FormData();
      formData.append('file', mediaFile);
      const res = await mediaService.uploadMedia(formData);
      return res.data.url;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Media upload failed. Please try again or skip the media.');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const uploadedMediaUrl = mediaFile ? await handleUpload() : mediaUrl;

      await schedulerService.createPost({
        user_id: 1,
        content,
        media_url: uploadedMediaUrl || null,
        scheduled_time: new Date(scheduledTime).toISOString(),
      });

      setContent('');
      setMediaUrl('');
      setScheduledTime('');
      setMediaFile(null);
      onPostCreated();
      alert('✅ Post successfully scheduled!');
    } catch (error) {
      console.error('Post creation failed:', error);
      alert('⚠️ Failed to schedule post. Please check your input or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDesktopPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    const previewWindow = window.open('', '_blank', 'width=600,height=400');
    if (!previewWindow) return;

    previewWindow.document.write(`
      <html>
        <head>
          <title>Post Preview</title>
          <style>
            body { font-family: sans-serif; padding: 20px; background: #f4f4f4; }
            .content { margin-bottom: 1em; }
            .meta { font-size: 0.9em; color: #666; }
            .media { max-width: 100%; margin-top: 1em; }
            .user { font-size: 1em; color: #333; }
          </style>
        </head>
        <body>
          <div class="content"><strong>Preview:</strong><br/>${content}</div>
          <div class="meta">Scheduled at: ${new Date(scheduledTime).toLocaleString()}</div>
          <div class="user">User ID: 1</div>
          ${mediaUrl ? `<img class="media" src="${mediaUrl}" />` : ''}
        </body>
      </html>
    `);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post content here..."
        className="w-full h-24 p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        placeholder="Media URL (optional)"
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="datetime-local"
        value={scheduledTime}
        onChange={(e) => setScheduledTime(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="p-4 border-2 border-dashed rounded text-center"
      >
        {mediaFile ? mediaFile.name : 'Drag media file here (optional)'}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded text-white ${isLoading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
        >
          Schedule Post
        </button>
        <button
          onClick={handleDesktopPreview}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Preview
        </button>

      </div>
    </form>
  );
};
