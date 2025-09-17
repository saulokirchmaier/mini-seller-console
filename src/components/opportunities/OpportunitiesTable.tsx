import { useOpportunities } from '../../contexts/OpportunitiesContext';
import { useConfig } from '../../contexts/ConfigContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { OpportunityDrawer } from './OpportunityDrawer';
import { OpportunitiesSearch } from './OpportunitiesSearch';
import { OpportunitiesStageFilter } from './OpportunitiesStageFilter';
import { OpportunitiesPagination } from './OpportunitiesPagination';
import { OpportunitiesPerPageSelect } from './OpportunitiesPerPageSelect';

export const OpportunitiesTable = () => {
  const { filteredOpportunities, loading, error, setSelectedOpportunity } =
    useOpportunities();
  const { pagination } = useConfig();

  if (loading) {
    return <div className="p-4 text-center">Loading opportunities...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  // Moved the empty state check after rendering filters

  // Calculate pagination
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = startIndex + pagination.limit;
  const paginatedOpportunities = filteredOpportunities.slice(
    startIndex,
    endIndex
  );

  return (
    <div className="w-full">
      <OpportunityDrawer />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 p-2 md:px-4">
        <OpportunitiesSearch />
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <OpportunitiesStageFilter />
        </div>
      </div>
      <div className="w-[100%] p-2 md:px-4 overflow-y-auto mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOpportunities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No opportunities found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedOpportunities.map(opportunity => (
                <TableRow
                  key={opportunity.id}
                  onClick={() => setSelectedOpportunity(opportunity)}
                  className="cursor-pointer"
                >
                  <TableCell>{opportunity.name}</TableCell>
                  <TableCell>{opportunity.accountName}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        opportunity.stage === 'discovery'
                          ? 'bg-blue-100 text-blue-800'
                          : opportunity.stage === 'proposal'
                            ? 'bg-yellow-100 text-yellow-800'
                            : opportunity.stage === 'negotiation'
                              ? 'bg-orange-100 text-orange-800'
                              : opportunity.stage === 'closed_won'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {opportunity.stage.replace('_', ' ').toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    {opportunity.amount
                      ? new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(opportunity.amount)
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {opportunity.createdAt.toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {filteredOpportunities.length > 0 && (
        <div className="flex flex-col md:flex-row justify-between items-center p-2 md:px-4 mt-4">
          <OpportunitiesPerPageSelect />
          <OpportunitiesPagination />
        </div>
      )}
    </div>
  );
};
