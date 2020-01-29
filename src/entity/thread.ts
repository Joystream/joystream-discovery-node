import {
  EntityManager,
  Like,
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { ForumCategory } from "./category";
import { ForumPost } from "./post";
import { ForumModerationAction, ForumBlockchainTimestamp } from "./common";

/*
DESCRIBE joystream_forum_thread; -- FIELD, TYPE, NULL, KEY, EXTRA
'id', 'bigint', 'NO', 'PRI', NULL, ''
'title', 'varchar(150)', 'YES', 'MUL', NULL, ''
'text', 'text', 'YES', '', NULL, ''
'category_id', 'bigint', 'YES', 'MUL', NULL, ''
'nr_in_category', 'int', 'YES', '', NULL, ''
'num_unmoderated_posts', 'int', 'YES', '', NULL, ''
'num_moderated_posts', 'int', 'YES', '', NULL, ''
'created_at_block_number', 'int', 'YES', '', NULL, ''
'created_at_moment', 'bigint', 'YES', '', NULL, ''
'author_id', 'varchar(64)', 'YES', '', NULL, ''
'block_id', 'int', 'NO', 'PRI', NULL, ''
'extrinsic_idx', 'int', 'YES', '', NULL, ''
'event_idx', 'int', 'YES', '', NULL, ''
*/
@Entity("joystream_forum_thread")
export class ForumThread {
  public parent: ForumCategory;
  public replies: [ForumPost];
  public moderation: ForumModerationAction;
  // tslint:disable-next-line: variable-name
  public created_at: ForumBlockchainTimestamp;

  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public text: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public category_id: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public nr_in_category: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public num_unmoderated_posts: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public num_moderated_posts: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public created_at_block_number: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public created_at_moment: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public author_id: string;

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
    type => CategoryDB,
    category => category.threads
  )
  @JoinColumn({ name: "category_id" })
  public category: CategoryDB;

  @OneToMany(
    type => PostDB,
    post => post.thread
  )
  public posts: PostDB[];
  */
}

export async function getThread(
  manager: EntityManager,
  id: string
): Promise<ForumThread | undefined> {
  return manager.findOne(ForumThread, id)
}

export async function findThreads(
  manager: EntityManager,
  text: string
): Promise<ForumThread[]> {
  return manager.find(ForumThread, {
    where: [
      {
        title: Like(`%${text}%`)
      },
      {
        text: Like(`%${text}%`)
      }
    ]
  });
}
