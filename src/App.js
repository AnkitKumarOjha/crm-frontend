
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/Login';
import AdminDashboard from "./pages/admin/AdminDashboard";
import SalesDashboard from "./pages/sales/SalesDashboard";

function App() {
  return (
    <div className="min-h-full h-screen flex  justify-center py-12 px-4">
    <div className="max-w-md w-full mt-40 ">
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/sales" element={<SalesDashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;