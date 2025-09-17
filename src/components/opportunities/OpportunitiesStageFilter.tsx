import { useOpportunities } from '../../contexts/OpportunitiesContext';
import { OpportunityStage } from '../../types/Opportunity';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const OpportunitiesStageFilter = () => {
  const { stageFilter, updateStageFilter } = useOpportunities();

  const handleStageChange = (value: string) => {
    updateStageFilter(value as typeof stageFilter);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Stage:</span>
      <Select value={stageFilter} onValueChange={handleStageChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value={OpportunityStage.DISCOVERY}>Discovery</SelectItem>
          <SelectItem value={OpportunityStage.PROPOSAL}>Proposal</SelectItem>
          <SelectItem value={OpportunityStage.NEGOTIATION}>
            Negotiation
          </SelectItem>
          <SelectItem value={OpportunityStage.CLOSED_WON}>
            Closed Won
          </SelectItem>
          <SelectItem value={OpportunityStage.CLOSED_LOST}>
            Closed Lost
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
