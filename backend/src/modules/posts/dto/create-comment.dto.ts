import { IsString, IsOptional, IsUUID, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Great work! 👏' })
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty({ required: false, description: 'Parent comment ID for replies' })
  @IsOptional()
  @IsString()
  parentCommentId?: string;
}
