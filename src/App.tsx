import React from 'react';
import { PostForm } from './components/PostForm';
import { PostList } from './components/PostList';

const App = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">X Content Scheduler</h1>
      <PostForm onPostCreated={() => console.log('Post created')} />
      <PostList />
    </div>
  );
};

export default App;