export type itemType = {
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  count: number;
  name: string;
};

export type dataType = {
  items: itemType[];
  total: number;
  page: number;
  pageSize: number;
  order: "desc" | "asc";
  sort: string;
};
