import {
  EntityManager,
  Like,
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { ForumThread } from "./thread";
import { ForumCategory } from "./category";
import { ForumModerationAction, ForumBlockchainTimestamp } from "./common";

/*
DESCRIBE joystream_forum_post; -- FIELD, TYPE, NULL, KEY, EXTRA
'id', 'bigint', 'NO', 'PRI', NULL, ''
'thread_id', 'bigint', 'YES', 'MUL', NULL, ''
'author_id', 'varchar(64)', 'YES', '', NULL, ''
'nr_in_thread', 'int', 'YES', '', NULL, ''
'current_text', 'text', 'YES', '', NULL, ''
'created_at_block_number', 'int', 'YES', '', NULL, ''
'created_at_moment', 'bigint', 'YES', '', NULL, ''
'block_id', 'int', 'NO', 'PRI', NULL, ''
'extrinsic_idx', 'int', 'YES', '', NULL, ''
'event_idx', 'int', 'YES', '', NULL, ''
*/
@Entity("joystream_forum_post")
export class ForumPost {
  public parent: ForumCategory;
  public replies: [ForumPost];
  public moderation: ForumModerationAction;
  // tslint:disable-next-line: variable-name
  public created_at: ForumBlockchainTimestamp;

  @PrimaryColumn()
  public id: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public thread_id: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public author_id: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public nr_in_thread: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public current_text: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public created_at_block_number: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public created_at_moment: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public block_id: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public extrinsic_idx: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public event_idx: string;

  /*
  @ManyToOne(
    type => ForumThread,
    thread => thread.posts
  )
  @JoinColumn({ name: "thread_id" })
  public thread: ForumThread;
  */
}

export async function findPost(
  manager: EntityManager,
  text: string
): Promise<ForumPost[]> {
  return manager.find(ForumPost, {
    current_text: Like(`%${text}%`)
  });
}

/*
  type ForumPost {
    # Relations
    thread: ForumThread
    # author: MembersProfile # TODO add when harvester updated

    # From: apps/packages/joy-types/src/forum.ts:PostType
    id: string # instead of u64 due to overflow
    thread_id: String # instead of u64 due to overflow
    nr_in_thread: string # instead of u32 due to overflow
    current_text: string
    moderation: ForumModerationAction
    created_at: ForumBlockchainTimestamp
    author_id: string # AccountId
  }
*/
