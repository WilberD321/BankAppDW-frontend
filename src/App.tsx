import { Routes, Route } from "react-router";
import { useAuth } from "./context/AuthContext";
import { Taskbar } from "./components/Taskbar";
import { PortalNav } from "./components/PortalNav";
import { LoginPage } from "./pages/LoginPage";
import { CustomerListPage } from "./pages/CustomerListPage";
import { CustomerDetailPage } from "./pages/CustomerDetailPage";
import { AllAccountsPage } from "./pages/AllAccountsPage";
import { CreateTransactionPage } from "./pages/CreateTransactionPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { PortalAccountsPage } from "./pages/PortalAccountsPage";

function App() {
  const { session } = useAuth();

  if (!session) {
    return (
      <main>
        <LoginPage />
      </main>
    );
  }

  if (session.role === "admin") {
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
            <Route path="/transactions/:accountId" element={<CreateTransactionPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <PortalNav />
      <main>
        <Routes>
          <Route path="/" element={<PortalAccountsPage />} />
          <Route path="/transactions" element={<CreateTransactionPage />} />
          <Route path="/transactions/history" element={<TransactionsPage />} />
          <Route path="/transactions/:accountId" element={<CreateTransactionPage />} />
          <Route path="*" element={<PortalAccountsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
