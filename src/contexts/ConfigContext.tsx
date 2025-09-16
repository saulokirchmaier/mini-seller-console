import { createContext, useContext, useEffect, useState } from 'react';
import type { PaginationParams } from '../types/Lead';

interface ConfigContextType {
  pagination: PaginationParams;
  updatePagination: (params: PaginationParams) => void;
}

const defaultPagination: PaginationParams = {
  page: 1,
  limit: 10,
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const [pagination, setPagination] = useState<PaginationParams>(() => {
    const savedPagination = localStorage.getItem('pagination');
    return savedPagination ? JSON.parse(savedPagination) : defaultPagination;
  });

  useEffect(() => {
    localStorage.setItem('pagination', JSON.stringify(pagination));
  }, [pagination]);

  const updatePagination = (params: PaginationParams) => {
    setPagination(params);
  };

  return (
    <ConfigContext.Provider value={{ pagination, updatePagination }}>
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
