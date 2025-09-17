import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type {
  Opportunity,
  LeadConversionForm,
  OpportunityStage,
} from '../types/Opportunity';

interface OpportunitiesContextType {
  opportunities: Opportunity[];
  filteredOpportunities: Opportunity[];
  loading: boolean;
  error: string | null;
  selectedOpportunity: Opportunity | null;
  setSelectedOpportunity: (opportunity: Opportunity | null) => void;
  convertLead: (form: LeadConversionForm) => Promise<boolean>;
  updateOpportunity: (
    id: string,
    updatedData: Partial<Opportunity>
  ) => Promise<boolean>;
  search: string;
  updateSearch: (search: string) => void;
  stageFilter: OpportunityStage | 'all';
  updateStageFilter: (stage: OpportunityStage | 'all') => void;
}

const OpportunitiesContext = createContext<
  OpportunitiesContextType | undefined
>(undefined);

export const OpportunitiesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    const savedOpportunities = localStorage.getItem('opportunities');
    if (savedOpportunities) {
      try {
        // Precisamos converter as strings de data de volta para objetos Date
        const parsed = JSON.parse(savedOpportunities);
        return parsed.map((opp: Opportunity) => ({
          ...opp,
          createdAt: new Date(opp.createdAt),
        }));
      } catch (e) {
        console.error('Error parsing opportunities from localStorage', e);
        return [];
      }
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<Opportunity | null>(null);

  // Estado para busca e filtro
  const [search, setSearch] = useState(() => {
    const savedSearch = localStorage.getItem('opportunitiesSearch');
    return savedSearch ? JSON.parse(savedSearch) : '';
  });

  const [stageFilter, setStageFilter] = useState<OpportunityStage | 'all'>(
    () => {
      const savedStageFilter = localStorage.getItem('opportunitiesStageFilter');
      return savedStageFilter ? JSON.parse(savedStageFilter) : 'all';
    }
  );

  // Persistir oportunidades no localStorage quando elas mudarem
  useEffect(() => {
    localStorage.setItem('opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  // Persistir busca no localStorage
  useEffect(() => {
    localStorage.setItem('opportunitiesSearch', JSON.stringify(search));
  }, [search]);

  // Persistir filtro de estágio no localStorage
  useEffect(() => {
    localStorage.setItem(
      'opportunitiesStageFilter',
      JSON.stringify(stageFilter)
    );
  }, [stageFilter]);

  // Filtrar oportunidades com base na busca e no filtro de estágio
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opportunity => {
      // Filtro de busca
      const searchMatch =
        search === '' ||
        opportunity.name.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.accountName.toLowerCase().includes(search.toLowerCase());

      // Filtro de estágio
      const stageMatch =
        stageFilter === 'all' || opportunity.stage === stageFilter;

      return searchMatch && stageMatch;
    });
  }, [opportunities, search, stageFilter]);

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  const updateStageFilter = (stage: OpportunityStage | 'all') => {
    setStageFilter(stage);
  };

  const convertLead = async (form: LeadConversionForm): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const newOpportunity: Opportunity = {
        id: `opp-${Date.now()}`,
        name: form.name,
        stage: form.stage,
        amount: form.amount,
        accountName: form.accountName,
        createdAt: new Date(),
        originalLeadId: form.leadId,
      };

      setOpportunities(prev => [...prev, newOpportunity]);
      // Não precisamos salvar explicitamente no localStorage aqui porque o useEffect fará isso
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateOpportunity = async (
    id: string,
    updatedData: Partial<Opportunity>
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 500));

      setOpportunities(prev =>
        prev.map(opp => (opp.id === id ? { ...opp, ...updatedData } : opp))
      );

      // Se a oportunidade atualizada é a selecionada, atualize-a também
      if (selectedOpportunity?.id === id) {
        setSelectedOpportunity(prev =>
          prev ? { ...prev, ...updatedData } : null
        );
      }

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OpportunitiesContext.Provider
      value={{
        opportunities,
        filteredOpportunities,
        loading,
        error,
        selectedOpportunity,
        setSelectedOpportunity,
        convertLead,
        updateOpportunity,
        search,
        updateSearch,
        stageFilter,
        updateStageFilter,
      }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
};

export const useOpportunities = () => {
  const context = useContext(OpportunitiesContext);
  if (context === undefined) {
    throw new Error(
      'useOpportunities must be used within an OpportunitiesProvider'
    );
  }
  return context;
};
