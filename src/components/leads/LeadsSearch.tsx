import { useState, useEffect } from 'react';
import { useLeads } from '../../contexts/LeadsContext';
import { useConfig } from '../../contexts/ConfigContext';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

export const LeadsSearch = () => {
  const { search, updateSearch } = useLeads();
  const { pagination, updatePagination } = useConfig();
  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== search) {
        updateSearch(searchValue);

        // Reset to first page when search changes
        if (pagination.page !== 1) {
          updatePagination({ ...pagination, page: 1 });
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, search, updateSearch, pagination, updatePagination]);

  return (
    <div className="relative w-full max-w-sm m-2">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-4 w-4 text-gray-500" />
      </div>
      <Input
        type="text"
        placeholder="Search by name, company or email..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
