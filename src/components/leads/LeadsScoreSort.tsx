import { useConfig } from '../../contexts/ConfigContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const LeadsScoreSort = () => {
  const { scoreSort, updateScoreSort } = useConfig();

  const handleSortChange = (value: string) => {
    updateScoreSort(value as 'asc' | 'desc' | 'default');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Score:</span>
      <Select value={scoreSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort by score" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">
            <div className="flex items-center gap-2">
              <span>Default</span>
            </div>
          </SelectItem>
          <SelectItem value="desc">
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              <span>Highest first</span>
            </div>
          </SelectItem>
          <SelectItem value="asc">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-4 w-4" />
              <span>Lowest first</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
