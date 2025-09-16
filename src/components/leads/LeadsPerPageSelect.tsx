import { useConfig } from '../../contexts/ConfigContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const LeadsPerPageSelect = () => {
  const { pagination, updatePagination } = useConfig();

  const handleLimitChange = (value: string) => {
    const newLimit = parseInt(value, 10);
    updatePagination({ ...pagination, page: 1, limit: newLimit });
  };

  return (
    <div className="flex items-center gap-2 m-2">
      <span className="text-sm text-muted-foreground">Show</span>
      <Select
        value={pagination.limit.toString()}
        onValueChange={handleLimitChange}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder={pagination.limit.toString()} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-sm text-muted-foreground">per page</span>
    </div>
  );
};
