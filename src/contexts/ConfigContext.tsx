import { createContext, useContext, useEffect, useState } from 'react';
import type { PaginationParams, LeadStatus } from '../types/Lead';

interface ConfigContextType {
  pagination: PaginationParams;
  updatePagination: (params: PaginationParams) => void;
  statusFilter: LeadStatus | 'all';
  updateStatusFilter: (status: LeadStatus | 'all') => void;
  scoreSort: 'asc' | 'desc' | 'default';
  updateScoreSort: (sort: 'asc' | 'desc' | 'default') => void;
}

const defaultPagination: PaginationParams = {
  page: 1,
  limit: 10,
};

const defaultStatusFilter = 'all';
const defaultScoreSort = 'default';

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [pagination, setPagination] = useState<PaginationParams>(() => {
    const savedPagination = localStorage.getItem('pagination');
    return savedPagination ? JSON.parse(savedPagination) : defaultPagination;
  });

  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>(() => {
    const savedStatusFilter = localStorage.getItem('statusFilter');
    return savedStatusFilter
      ? JSON.parse(savedStatusFilter)
      : defaultStatusFilter;
  });

  const [scoreSort, setScoreSort] = useState<'asc' | 'desc' | 'default'>(() => {
    const savedScoreSort = localStorage.getItem('scoreSort');
    return savedScoreSort ? JSON.parse(savedScoreSort) : defaultScoreSort;
  });

  useEffect(() => {
    localStorage.setItem('pagination', JSON.stringify(pagination));
  }, [pagination]);

  useEffect(() => {
    localStorage.setItem('statusFilter', JSON.stringify(statusFilter));
  }, [statusFilter]);

  useEffect(() => {
    localStorage.setItem('scoreSort', JSON.stringify(scoreSort));
  }, [scoreSort]);

  const updatePagination = (params: PaginationParams) => {
    setPagination(params);
  };

  const updateStatusFilter = (status: LeadStatus | 'all') => {
    setStatusFilter(status);
    // Reset to first page when filter changes
    if (pagination.page !== 1) {
      setPagination({ ...pagination, page: 1 });
    }
  };

  const updateScoreSort = (sort: 'asc' | 'desc' | 'default') => {
    setScoreSort(sort);
    // Reset to first page when sort changes
    if (pagination.page !== 1) {
      setPagination({ ...pagination, page: 1 });
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        pagination,
        updatePagination,
        statusFilter,
        updateStatusFilter,
        scoreSort,
        updateScoreSort,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
