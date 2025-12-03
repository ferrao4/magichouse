import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Post, PostVisibility } from '../../entities/post.entity';
import { PostAttachment } from '../../entities/post-attachment.entity';
import { Comment } from '../../entities/comment.entity';
import { Reaction, ReactionType } from '../../entities/reaction.entity';
import { User, UserRole } from '../../entities/user.entity';
import { CreatePostDto, CreateCommentDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostAttachment)
    private attachmentRepository: Repository<PostAttachment>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Reaction)
    private reactionRepository: Repository<Reaction>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPost(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = this.postRepository.create({
      userId,
      orgId: user.orgId,
      content: createPostDto.content,
      visibility: createPostDto.visibility || PostVisibility.COMPANY,
    });

    return await this.postRepository.save(post);
  }

  async getFeed(userId: string, page: number = 1, limit: number = 20): Promise<{ posts: Post[]; total: number }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const skip = (page - 1) * limit;

    // Get posts from the same organization
    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.attachments', 'attachments')
      .leftJoinAndSelect('post.reactions', 'reactions')
      .leftJoinAndSelect('reactions.user', 'reactionUser')
      .where('post.orgId = :orgId', { orgId: user.orgId })
      .andWhere('post.deletedAt IS NULL');

    // Filter by visibility
    queryBuilder.andWhere(
      '(post.visibility = :company OR (post.visibility = :department AND user.department = :userDepartment))',
      {
        company: PostVisibility.COMPANY,
        department: PostVisibility.DEPARTMENT,
        userDepartment: user.department,
      },
    );

    const [posts, total] = await queryBuilder
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { posts, total };
  }

  async getPost(postId: string, userId: string): Promise<Post> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const post = await this.postRepository.findOne({
      where: { id: postId, orgId: user.orgId },
      relations: ['user', 'attachments', 'reactions', 'reactions.user'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async deletePost(postId: string, userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Only the post owner or admin can delete
    if (post.userId !== userId && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this post');
    }

    await this.postRepository.softDelete(postId);
  }

  // Comments
  async addComment(postId: string, userId: string, createCommentDto: CreateCommentDto): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepository.create({
      postId,
      userId,
      content: createCommentDto.content,
      parentCommentId: createCommentDto.parentCommentId || null,
    });

    return await this.commentRepository.save(comment);
  }

  async getComments(postId: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { postId, deletedAt: IsNull(), parentCommentId: IsNull() },
      relations: ['user', 'replies', 'replies.user'],
      order: { createdAt: 'ASC' },
    });
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    // Only the comment owner or admin can delete
    if (comment.userId !== userId && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to delete this comment');
    }

    await this.commentRepository.softDelete(commentId);
  }

  // Reactions
  async toggleReaction(postId: string, userId: string): Promise<{ liked: boolean; count: number }> {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const existingReaction = await this.reactionRepository.findOne({
      where: { postId, userId },
    });

    if (existingReaction) {
      // Unlike
      await this.reactionRepository.remove(existingReaction);
      const count = await this.reactionRepository.count({ where: { postId } });
      return { liked: false, count };
    } else {
      // Like
      const reaction = this.reactionRepository.create({
        postId,
        userId,
        type: ReactionType.LIKE,
      });
      await this.reactionRepository.save(reaction);
      const count = await this.reactionRepository.count({ where: { postId } });
      return { liked: true, count };
    }
  }

  async getReactionCount(postId: string): Promise<number> {
    return await this.reactionRepository.count({ where: { postId } });
  }

  async getUserReaction(postId: string, userId: string): Promise<boolean> {
    const reaction = await this.reactionRepository.findOne({
      where: { postId, userId },
    });
    return !!reaction;
  }
}
