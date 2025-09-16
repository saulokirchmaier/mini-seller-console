import './App.css';
import { LeadsProvider } from './contexts/LeadsContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { LeadsTable } from './components/leads/LeadsTable';

function App() {
  return (
    <ConfigProvider>
      <LeadsProvider>
        <div className="container mx-auto py-2 md:py-8 px-2">
          <h1 className="text-2xl md:text-4xl font-bold mb-6">
            Mini Seller Console
          </h1>
          <div className="bg-white rounded-lg shadow p-2 md:p-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Leads</h2>
            <LeadsTable />
          </div>
        </div>
      </LeadsProvider>
    </ConfigProvider>
  );
}

export default App;
