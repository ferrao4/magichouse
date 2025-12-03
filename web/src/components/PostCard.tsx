import { useState } from 'react';
import { postsApi, Post, Comment } from '../services/posts';

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
  onUpdate: (post: Post) => void;
}

export default function PostCard({ post, onDelete, onUpdate }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.reactions?.length || 0);
  const [loading, setLoading] = useState(false);

  const currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;
  const isOwner = post.userId === currentUserId;

  const handleLike = async () => {
    try {
      const response = await postsApi.toggleReaction(post.id);
      setLiked(response.liked);
      setLikeCount(response.count);
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await postsApi.deletePost(post.id);
      onDelete(post.id);
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const loadComments = async () => {
    if (!showComments) {
      try {
        setLoading(true);
        const fetchedComments = await postsApi.getComments(post.id);
        setComments(fetchedComments);
        setShowComments(true);
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setShowComments(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;

    try {
      const newComment = await postsApi.addComment(post.id, commentText);
      setComments([...comments, newComment]);
      setCommentText('');
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <div style={{ fontWeight: '600', fontSize: '15px' }}>
            {post.user.firstName} {post.user.lastName}
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            {post.user.jobTitle && <span>{post.user.jobTitle} • </span>}
            {formatDate(post.createdAt)}
          </div>
        </div>
        {isOwner && (
          <button
            onClick={handleDelete}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              backgroundColor: 'transparent',
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>
        {post.content}
      </div>

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: '20px',
        paddingTop: '12px',
        borderTop: '1px solid #eee'
      }}>
        <button
          onClick={handleLike}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: liked ? '#1976d2' : '#666'
          }}
        >
          👍 {likeCount > 0 && likeCount}
        </button>
        <button
          onClick={loadComments}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#666'
          }}
        >
          💬 Comment
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
          {loading ? (
            <p style={{ fontSize: '14px', color: '#666' }}>Loading comments...</p>
          ) : (
            <>
              {comments.map((comment) => (
                <div key={comment.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>
                    {comment.user.firstName} {comment.user.lastName}
                  </div>
                  <div style={{ fontSize: '14px', marginTop: '4px' }}>
                    {comment.content}
                  </div>
                </div>
              ))}

              <form onSubmit={handleAddComment} style={{ marginTop: '12px' }}>
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}
                />
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}
