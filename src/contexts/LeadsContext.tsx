import { createContext, useContext, useEffect, useState } from 'react';
import type { Lead } from '../types/Lead';

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: string | null;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider = ({ children }: { children: React.ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <LeadsContext.Provider value={{ leads, loading, error }}>
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
