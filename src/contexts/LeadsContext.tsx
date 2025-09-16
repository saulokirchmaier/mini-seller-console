import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { Lead } from '../types/Lead';

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

  const filteredLeads = useMemo(() => {
    if (!search.trim()) return leads;

    const searchLower = search.toLowerCase().trim();
    return leads.filter(
      lead =>
        lead.name.toLowerCase().includes(searchLower) ||
        lead.company.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower)
    );
  }, [leads, search]);

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
