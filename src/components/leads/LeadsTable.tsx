import { useLeads } from '../../contexts/LeadsContext';
import { useConfig } from '../../contexts/ConfigContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { LeadsPagination } from './LeadsPagination';
import { LeadsPerPageSelect } from './LeadsPerPageSelect';
import { LeadsSearch } from './LeadsSearch';
import { LeadsStatusFilter } from './LeadsStatusFilter';
import { LeadsScoreSort } from './LeadsScoreSort';

export const LeadsTable = () => {
  const { leads, filteredLeads, loading, error, setSelectedLead } = useLeads();
  const { pagination } = useConfig();
  const { page, limit } = pagination;

  if (loading) {
    return <div className="p-4 text-center">Loading leads...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (leads.length === 0) {
    return <div className="p-4 text-center">No leads found.</div>;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col md:flex-row items-start sm:items-center md:justify-between gap-2 p-2 md:px-4">
        <LeadsSearch />
        <div className="flex flex-col md:flex-row items-center justify-center self-center gap-2">
          <LeadsStatusFilter />
          <LeadsScoreSort />
        </div>
      </div>
      <div className="w-[100%] p-2 md:px-4 overflow-y-auto mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLeads.map(lead => (
              <TableRow
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="cursor-pointer"
              >
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.score}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : lead.status === 'contacted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-violet-100 text-violet-800'
                    }`}
                  >
                    {lead.status.toUpperCase()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center md:justify-between items-center flex-wrap mt-4">
        <LeadsPerPageSelect />
        <LeadsPagination totalItems={filteredLeads.length} />
      </div>
    </div>
  );
};
