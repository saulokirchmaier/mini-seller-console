import './App.css';
import { LeadsProvider } from './contexts/LeadsContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { LeadsTable } from './components/leads/LeadsTable';

function App() {
  return (
    <ConfigProvider>
      <LeadsProvider>
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold mb-6">Mini Seller Console</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Leads</h2>
            <LeadsTable />
          </div>
        </div>
      </LeadsProvider>
    </ConfigProvider>
  );
}

export default App;
