import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Thread } from "./thread";

@Entity("joystream_forum_post")
export class Post {

  @PrimaryColumn()
  id: number;

  @Column({
    name: 'thread_id'
  })
  threadId: number;

  @Column({
      name: 'author_id'
  })
  authorId: number;

  @Column({
      name: 'nr_in_thread'
  })
  nrInThread: number;

  @Column({
    name: 'current_text'
  })
  currentText: string;

  @Column({
      name: 'created_at_block_number'
  })
  createdAtBlockNumber: number

  @Column({
    name: 'created_at_moment'
  })
  createdAtMoment: number

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

  @ManyToOne(type => Thread, thread => thread.posts)
  @JoinColumn({name: 'thread_id'})
  thread: Thread
}