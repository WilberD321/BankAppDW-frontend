import { Routes, Route } from "react-router";
import { Taskbar } from "./components/Taskbar";
import { CustomerListPage } from "./pages/CustomerListPage";
import { CustomerDetailPage } from "./pages/CustomerDetailPage";

function App() {
  return (
    <>
      <Taskbar />
      <main>
        <Routes>
          <Route path="/" element={<CustomerListPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
