import { Routes, Route } from "react-router";
import { Taskbar } from "./components/Taskbar";
import { CustomerListPage } from "./pages/CustomerListPage";
import { CustomerDetailPage } from "./pages/CustomerDetailPage";
import { AllAccountsPage } from "./pages/AllAccountsPage";
import { CreateTransactionPage } from "./pages/CreateTransactionPage";
import { TransactionsPage } from "./pages/TransactionsPage";

function App() {
  return (
    <>
      <Taskbar />
      <main>
        <Routes>
          <Route path="/" element={<CustomerListPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          <Route path="/accounts" element={<AllAccountsPage />} />
          <Route path="/transactions" element={<CreateTransactionPage />} />
          <Route path="/transactions/history" element={<TransactionsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
