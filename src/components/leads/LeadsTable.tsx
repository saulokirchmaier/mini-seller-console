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

export const LeadsTable = () => {
  const { leads, loading, error } = useLeads();
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

  // Aplicar paginação
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedLeads = leads.slice(startIndex, endIndex);

  return (
    <div className="w-full overflow-auto">
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
            <TableRow key={lead.id}>
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
                        : 'bg-green-100 text-green-800'
                  }`}
                >
                  {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <LeadsPerPageSelect />
        <LeadsPagination totalItems={leads.length} />
      </div>
    </div>
  );
};
