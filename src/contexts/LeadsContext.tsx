import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Lead } from '../types/Lead';
import { useConfig } from './ConfigContext';

interface LeadsContextType {
  leads: Lead[];
  filteredLeads: Lead[];
  loading: boolean;
  error: string | null;
  search: string;
  updateSearch: (search: string) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider = ({ children }: { children: React.ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await fetch('/data/leads.json');
        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }
        const data = await response.json();
        setLeads(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const { statusFilter, scoreSort } = useConfig();

  const filteredLeads = useMemo(() => {
    let filtered = leads;

    // Filter by search term
    if (search.trim()) {
      const searchLower = search.toLowerCase().trim();
      filtered = filtered.filter(
        lead =>
          lead.name.toLowerCase().includes(searchLower) ||
          lead.company.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Sort by score
    if (scoreSort !== 'default') {
      filtered = [...filtered].sort((a, b) => {
        if (scoreSort === 'asc') {
          return a.score - b.score;
        } else {
          return b.score - a.score;
        }
      });
    }

    return filtered;
  }, [leads, search, statusFilter, scoreSort]);

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        filteredLeads,
        loading,
        error,
        search,
        updateSearch,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
};
