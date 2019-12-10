import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity("joystream_forum_category")
export class Category {

  @PrimaryColumn()
  id: number;

  @Column({
    name: 'parent_id'
  })
  parentId: number;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @Column({
    name: 'created_at_block_number'
  })
  createdAtBlockNumber: number;

  @Column({
    name: 'created_at_moment'
  })
  createdAtMoment: number;

  @Column()
  deleted: boolean;

  @Column()
  archived: boolean;

  @Column({
    name: 'num_direct_subcategories'
  })
  numDirectSubcategories: number;

  @Column({
    name: 'num_direct_moderated_threads'
  })
  numDirectModeratedThreads: number;

  @Column({
    name: 'position_in_parent_category'
  })
  positionInParentCategory: number;

  @Column({
    name: 'account_id'
  })
  accountId: number;

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
};