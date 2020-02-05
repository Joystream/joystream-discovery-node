// From: apps/packages/joy-types/src/forum.ts:BlockchainTimestamp
export interface ForumBlockchainTimestamp {
  block: string; // instead of u64 due to overflow
  time: string; // instead of Date.
}

// From: apps/packages/joy-types/src/forum.ts:ModerationActionType
export interface ForumModerationAction {
  // tslint:disable-next-line: variable-name
  moderated_at: ForumBlockchainTimestamp;
  // tslint:disable-next-line: variable-name
  moderator_id: string; // AccountId
  rationale: string;
}

// From: apps/packages/joy-types/src/forum.ts:ChildPositionInParentCategoryType
export interface ForumChildPositionInParentCategory {
  // tslint:disable-next-line: variable-name
  parent_id: string; // instead of u64 due to overflow
  // tslint:disable-next-line: variable-name
  child_nr_in_parent_category: string; // instead of u32 due to overflow
}
