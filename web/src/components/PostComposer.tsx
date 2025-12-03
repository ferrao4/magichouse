import { useState } from 'react';
import { postsApi, Post } from '../services/posts';

interface PostComposerProps {
  onPostCreated: (post: Post) => void;
}

export default function PostComposer({ onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      const newPost = await postsApi.createPost(content);
      onPostCreated(newPost);
      setContent('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px'
    }}>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{
            padding: '8px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '10px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          disabled={loading}
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            resize: 'vertical',
            fontFamily: 'inherit'
          }}
        />

        <div style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            style={{
              padding: '8px 24px',
              backgroundColor: loading || !content.trim() ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading || !content.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
