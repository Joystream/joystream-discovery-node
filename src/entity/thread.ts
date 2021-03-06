import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Category } from './category';
import { Post } from './post';

@Entity("joystream_forum_thread")
export class Thread {

  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({
      name: 'category_id'
  })
  categoryId: number;

  @Column({
    name: 'nr_in_category'
  })
  nrInCategory: number;


  @Column({
    name: 'num_unmoderated_posts'
  })
  numUnmoderatedPosts: number;

  @Column({
    name: 'num_moderated_posts'
  })
  numModeratedPosts: number;

  @Column({
      name: 'created_at_block_number'
  })
  createdAtBlockNumber: number

  @Column({
    name: 'created_at_moment'
  })
  createdAtMoment: number

  @Column({
    name: 'author_id'
  })
  authorId: number;

  @Column({
    name: 'block_id'
  })
  blockId: number;

  @Column({
    name: 'extrinsic_idx'
  })
  extrinsicIdx: number;

  @Column({
    name: 'event_idx'
  })
  eventIdx: number;  

  @ManyToOne(type => Category, category => category.threads)
  @JoinColumn({name: 'category_id'})
  category: Category

  @OneToMany(type => Post, post => post.thread)
  posts: Post[]
}