import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SalesDashboard from "./pages/sales/SalesDashboard";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="min-h-full h-screen flex  justify-center py-12 px-4">
      <div className="max-w-md w-full mt-40 ">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/sales" element={<SalesDashboard />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
