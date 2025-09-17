import './App.css';
import { LeadsProvider } from './contexts/LeadsContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { OpportunitiesProvider } from './contexts/OpportunitiesContext';
import { LeadsTable } from './components/leads/LeadsTable';
import { LeadDrawer } from './components/leads/LeadDrawer';
import { OpportunitiesTable } from './components/opportunities/OpportunitiesTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

function App() {
  return (
    <ConfigProvider>
      <LeadsProvider>
        <OpportunitiesProvider>
          <div className="container mx-auto py-2 md:py-8 px-2 flex flex-col content-start">
            <h1 className="text-2xl md:text-4xl font-bold mb-6">
              Mini Seller Console
            </h1>
            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="self-center">
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
              </TabsList>
              <TabsContent value="leads">
                <div className="bg-white rounded-lg shadow p-2 md:p-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">
                    Leads
                  </h2>
                  <LeadsTable />
                </div>
              </TabsContent>
              <TabsContent value="opportunities">
                <div className="bg-white rounded-lg shadow p-2 md:p-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">
                    Opportunities
                  </h2>
                  <OpportunitiesTable />
                </div>
              </TabsContent>
            </Tabs>

            <LeadDrawer />
          </div>
        </OpportunitiesProvider>
      </LeadsProvider>
    </ConfigProvider>
  );
}

export default App;
