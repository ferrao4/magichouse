import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

export enum ReactionType {
  LIKE = 'LIKE',
}

@Entity('reactions')
@Unique(['postId', 'userId'])
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id' })
  postId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'text',
    default: ReactionType.LIKE,
  })
  type: ReactionType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Post, (post) => post.reactions)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.reactions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
