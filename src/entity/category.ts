import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity()
export class Category {

  @PrimaryColumn()
  id: number;

  @Column()
  parentId: number;

  @Column("text")
  title: string;

  @Column("text")
  description: string;

  @Column()
  createdAtBlockNumber: number;

  @Column()
  createdAtMoment: number;

  @Column()
  deleted: boolean;

  @Column()
  archived: boolean;

  @Column()
  numDirectSubcategories: number;

  @Column()
  numDirectModeratedThreads: number;

  @Column()
  positionInParentCategory: number;

  @Column()
  accountId: number;

  @Column()
  blockId: number;

  @Column()
  extrinsicIdx: number;

  @Column()
  eventIdx: number;
};