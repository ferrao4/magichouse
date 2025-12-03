import { useState, useEffect } from 'react';
import { postsApi, Post } from '../services/posts';
import PostCard from '../components/PostCard';
import PostComposer from '../components/PostComposer';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const response = await postsApi.getFeed(page, 20);
      setPosts(response.posts || []);
      setHasMore(response.total > (response.posts?.length || 0));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  if (loading && posts.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <p>Loading feed...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Feed</h1>

      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {/* Post Composer */}
      <PostComposer onPostCreated={handlePostCreated} />

      {/* Feed */}
      <div style={{ marginTop: '30px' }}>
        {posts.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <p style={{ color: '#666' }}>No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handlePostDeleted}
              onUpdate={handlePostUpdated}
            />
          ))
        )}
      </div>

      {hasMore && (
        <button
          onClick={() => {
            setPage(page + 1);
            loadFeed();
          }}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
}
