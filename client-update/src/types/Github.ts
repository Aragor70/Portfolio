export type CommitAuthorType = {
  name: string;
  email: string;
  date: string;
}

export type CommitterType = {
  name: string;
  email: string;
  date: string;
}

export type CommitTreeType = {
  sha: string;
  url: string;
}

export type CommitVerificationType = {
  verified: boolean;
  reason: string;
  signature: string | null;
  payload: string | null;
  verified_at: string | null;
}

export type CommitDataType = {
  author: CommitAuthorType;
  committer: CommitterType;
  message: string;
  tree: CommitTreeType;
  url: string;
  comment_count: number;
  verification: CommitVerificationType;
}

export type ParentCommitType = {
  sha: string;
  url: string;
  html_url: string;
}
export type GiRepoType = {
  sha: string;
  node_id: string;
  commit: CommitDataType;
  url: string;
  html_url: string;
  comments_url: string;
  author: string | null;
  committer: string | null;
  parents: ParentCommitType[];
}