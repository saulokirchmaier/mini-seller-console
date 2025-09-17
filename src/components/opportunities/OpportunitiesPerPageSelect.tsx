import { useConfig } from '../../contexts/ConfigContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const OpportunitiesPerPageSelect = () => {
  const { pagination, updatePagination } = useConfig();

  const handleLimitChange = (value: string) => {
    const limit = parseInt(value);
    updatePagination({ ...pagination, limit, page: 1 });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Show:</span>
      <Select
        value={pagination.limit.toString()}
        onValueChange={handleLimitChange}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
