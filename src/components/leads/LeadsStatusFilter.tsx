import { useConfig } from '../../contexts/ConfigContext';
import { LeadStatus } from '../../types/Lead';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const LeadsStatusFilter = () => {
  const { statusFilter, updateStatusFilter } = useConfig();

  const handleStatusChange = (value: string) => {
    updateStatusFilter(value as typeof statusFilter);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Status:</span>
      <Select value={statusFilter} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value={LeadStatus.NEW}>New</SelectItem>
          <SelectItem value={LeadStatus.CONTACTED}>Contacted</SelectItem>
          <SelectItem value={LeadStatus.INPROGRESS}>In Progress</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
