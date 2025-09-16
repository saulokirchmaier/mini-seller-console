export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: LeadStatus;
}

export type LeadStatus = 'new' | 'contacted' | 'converted';

export const LeadStatus = {
  NEW: 'new' as LeadStatus,
  CONTACTED: 'contacted' as LeadStatus,
  CONVERTED: 'converted' as LeadStatus,
};

export interface LeadFilters {
  search: string;
  status: LeadStatus | 'all';
  sortBy: 'score' | 'name' | 'company';
  sortDirection: 'asc' | 'desc';
}

export interface PaginationParams {
  page: number;
  limit: number;
}
