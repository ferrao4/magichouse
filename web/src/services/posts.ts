import apiClient from './api';

export interface Post {
  id: string;
  userId: string;
  orgId: string;
  content: string;
  visibility: 'COMPANY' | 'DEPARTMENT';
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string;
    department?: string;
    profilePictureUrl?: string;
  };
  reactions: Array<{
    id: string;
    userId: string;
    type: string;
  }>;
  attachments?: Array<{
    id: string;
    fileUrl: string;
    fileType: string;
  }>;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    profilePictureUrl?: string;
  };
  replies?: Comment[];
}

export const postsApi = {
  // Posts
  createPost: async (content: string, visibility: 'COMPANY' | 'DEPARTMENT' = 'COMPANY') => {
    const response = await apiClient.post('/posts', { content, visibility });
    return response.data;
  },

  getFeed: async (page: number = 1, limit: number = 20) => {
    const response = await apiClient.get('/posts/feed', { params: { page, limit } });
    return response.data;
  },

  getPost: async (postId: string) => {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  },

  deletePost: async (postId: string) => {
    await apiClient.delete(`/posts/${postId}`);
  },

  // Comments
  addComment: async (postId: string, content: string, parentCommentId?: string) => {
    const response = await apiClient.post(`/posts/${postId}/comments`, {
      content,
      parentCommentId,
    });
    return response.data;
  },

  getComments: async (postId: string) => {
    const response = await apiClient.get(`/posts/${postId}/comments`);
    return response.data;
  },

  deleteComment: async (commentId: string) => {
    await apiClient.delete(`/posts/comments/${commentId}`);
  },

  // Reactions
  toggleReaction: async (postId: string) => {
    const response = await apiClient.post(`/posts/${postId}/react`);
    return response.data;
  },

  getReactionCount: async (postId: string) => {
    const response = await apiClient.get(`/posts/${postId}/reactions/count`);
    return response.data;
  },

  getUserReaction: async (postId: string) => {
    const response = await apiClient.get(`/posts/${postId}/reactions/me`);
    return response.data;
  },
};
