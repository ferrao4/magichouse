import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto, CreateCommentDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(req.user.id, createPostDto);
  }

  @Get('feed')
  @ApiOperation({ summary: 'Get user feed with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Feed retrieved successfully' })
  async getFeed(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.postsService.getFeed(req.user.id, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific post' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async getPost(@Request() req, @Param('id') id: string) {
    return this.postsService.getPost(id, req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204, description: 'Post deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async deletePost(@Request() req, @Param('id') id: string) {
    await this.postsService.deletePost(id, req.user.id);
  }

  // Comments
  @Post(':id/comments')
  @ApiOperation({ summary: 'Add a comment to a post' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  async addComment(
    @Request() req,
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.postsService.addComment(postId, req.user.id, createCommentDto);
  }

  @Get(':id/comments')
  @ApiOperation({ summary: 'Get all comments for a post' })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
  async getComments(@Param('id') postId: string) {
    return this.postsService.getComments(postId);
  }

  @Delete('comments/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'Comment deleted successfully' })
  async deleteComment(@Request() req, @Param('commentId') commentId: string) {
    await this.postsService.deleteComment(commentId, req.user.id);
  }

  // Reactions
  @Post(':id/react')
  @ApiOperation({ summary: 'Toggle like on a post' })
  @ApiResponse({ status: 200, description: 'Reaction toggled successfully' })
  async toggleReaction(@Request() req, @Param('id') postId: string) {
    return this.postsService.toggleReaction(postId, req.user.id);
  }

  @Get(':id/reactions/count')
  @ApiOperation({ summary: 'Get reaction count for a post' })
  @ApiResponse({ status: 200, description: 'Count retrieved successfully' })
  async getReactionCount(@Param('id') postId: string) {
    const count = await this.postsService.getReactionCount(postId);
    return { count };
  }

  @Get(':id/reactions/me')
  @ApiOperation({ summary: 'Check if current user has reacted to post' })
  @ApiResponse({ status: 200, description: 'Reaction status retrieved' })
  async getUserReaction(@Request() req, @Param('id') postId: string) {
    const liked = await this.postsService.getUserReaction(postId, req.user.id);
    return { liked };
  }
}
