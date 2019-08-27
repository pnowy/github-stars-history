export interface Stack {
  id: string;
  name: string;
  repos: string[];
  predefined?: boolean;
}

export interface ChartItems {
  [date: string]: number;
}

export interface Repository {
  name: string;
  data: ChartItems;
  lastRefreshDate: string;
  requiredCacheUpdate?: boolean;
}
