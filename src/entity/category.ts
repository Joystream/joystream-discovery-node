import {
  Like,
  EntityManager,
  Entity,
  Column,
  PrimaryColumn,
  OneToMany
} from "typeorm";
import {
  ForumBlockchainTimestamp,
  ForumChildPositionInParentCategory
} from "./common";
import { ForumThread } from "./thread";

/*

DESCRIBE joystream_forum_category; -- FIELD, TYPE, NULL, KEY, EXTRA
'id', 'bigint', 'NO', 'PRI', NULL, ''
'parent_id', 'bigint', 'YES', 'MUL', NULL, ''
'title', 'varchar(150)', 'YES', 'MUL', NULL, ''
'description', 'varchar(150)', 'YES', 'MUL', NULL, ''
'created_at_block_number', 'int', 'YES', '', NULL, ''
'created_at_moment', 'bigint', 'YES', '', NULL, ''
'deleted', 'tinyint(1)', 'YES', '', NULL, ''
'archived', 'tinyint(1)', 'YES', '', NULL, ''
'num_direct_subcategories', 'int', 'YES', '', NULL, ''
'num_direct_unmoderated_threads', 'int', 'YES', '', NULL, ''
'num_direct_moderated_threads', 'int', 'YES', '', NULL, ''
'position_in_parent_category', 'int', 'YES', '', NULL, ''
'account_id', 'varchar(64)', 'YES', '', NULL, ''
'block_id', 'int', 'NO', 'PRI', NULL, ''
'extrinsic_idx', 'int', 'YES', '', NULL, ''
'event_idx', 'int', 'YES', '', NULL, ''
*/
@Entity("joystream_forum_category")
export class ForumCategory {
  public parent: ForumCategory;
  public threads: [ForumThread];
  public subcategories: [ForumCategory];
  // tslint:disable-next-line: variable-name
  public created_at: ForumBlockchainTimestamp;
  // tslint:disable-next-line: variable-name
  public position_in_parent_category: ForumChildPositionInParentCategory;

  @PrimaryColumn()
  public id: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public parent_id: string;

  @Column("text")
  public title: string;

  @Column("text")
  public description: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public created_at_block_number: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public created_at_moment: string;

  @Column()
  public deleted: boolean;

  @Column()
  public archived: boolean;

  @Column()
  // tslint:disable-next-line: variable-name
  public num_direct_moderated_threads: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public num_direct_unmoderated_threads: string;

  @Column()
  @Column({
    name: "position_in_parent_category"
  })
  // tslint:disable-next-line: variable-name
  public position_in_parent_category_db: string;

  @Column()
  // tslint:disable-next-line: variable-name
  public account_id: string;

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
  @OneToMany(
    type => Thread,
    thread => thread.category
  )
  public threads: Thread[];
  */
}

export async function findCategory(
  manager: EntityManager,
  text: string
): Promise<ForumCategory[]> {
  return manager.find(ForumCategory, {
    where: [
      {
        title: Like(`%${text}%`)
      },
      {
        description: Like(`%${text}%`)
      }
    ]
  });
}
