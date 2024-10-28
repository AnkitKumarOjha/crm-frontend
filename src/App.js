import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SalesDashboard from "./pages/sales/SalesDashboard";
import AuthContext from "./context/AuthContext";
import DefaultLayout from "./layout/DefaultLayout";
import AdminProfile from "./pages/admin/AdminProfile";
import SalesProfile from "./pages/sales/SalesProfile";
import { useContext } from "react";
import SalesProfileA from "./pages/admin/SalesProfileA";
import Customer from "./pages/customer/Customer";
import CreateUser from "./pages/admin/CreateUser";

function App() {
  const { role } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <DefaultLayout>
        <Routes>

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/sales" element={<SalesDashboard />} />

          <Route path="/profile" element={role==="ROLE_ADMIN"?<AdminProfile/>:<SalesProfile />} />

          <Route path="/sales-reps/:id" element={<SalesProfileA/>} />
          <Route path="/customers/:customerid" element={<Customer/>} />
          <Route path="/create-user" element={<CreateUser/>} />


        </Routes>
      </DefaultLayout>
      </>
  );
}

export default App;
