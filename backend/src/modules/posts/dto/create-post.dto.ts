import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PostVisibility } from '../../../entities/post.entity';

export class CreatePostDto {
  @ApiProperty({ example: 'Just launched our new feature! 🚀' })
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty({ enum: PostVisibility, default: PostVisibility.COMPANY })
  @IsOptional()
  @IsEnum(PostVisibility)
  visibility?: PostVisibility;
}
