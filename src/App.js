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
import EditUser from "./pages/admin/EditUser"; // import Unauthorized component
import Unauthorized from "./components/Unauthorized";
import CreateCustomer from "./pages/sales/CreateCustomer";
import CustomerForSales from "./pages/customer/CustomerForSales";
import EditProfile from "./pages/EditProfile";
import EditCustomer from "./pages/customer/EditCustomer";
import CreateContact from "./pages/sales/CreateContact";
import EditContact from "./pages/sales/EditContact";

function App() {
  const { role } = useContext(AuthContext);

  // Admin Route Wrapper
  const AdminRoute = ({ element }) => {
    return role === "ROLE_ADMIN" ? element : <Unauthorized />;
  };

  // Sales Route Wrapper
  const SalesRoute = ({ element }) => {
    return role === "ROLE_SALES_REP" ? element : <Unauthorized />;
  };

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={role === "ROLE_ADMIN" ?<DefaultLayout> <AdminProfile /> </DefaultLayout>: <DefaultLayout><SalesProfile /></DefaultLayout>}
      />
      <Route path="/edit-profile/:id" element={<DefaultLayout><EditProfile /></DefaultLayout>} />
      <Route
        path="/sales-reps/:id"
        element={<AdminRoute element={<DefaultLayout><SalesProfileA /></DefaultLayout>} />}
      />
      <Route
        path="/admin"
        element={<AdminRoute element={<DefaultLayout><AdminDashboard /></DefaultLayout>} />}
      />
      <Route
        path="/customers/:customerid"
        element={<AdminRoute element={<DefaultLayout><Customer /></DefaultLayout>} />}
      />
      <Route
        path="/create-user"
        element={<AdminRoute element={<DefaultLayout><CreateUser /></DefaultLayout>} />}
      />
      <Route
        path="/edit-user/:id"
        element={<AdminRoute element={<DefaultLayout><EditUser /></DefaultLayout>} />}
      />

      <Route
        path="/sales"
        element={<SalesRoute element={<DefaultLayout><SalesDashboard /></DefaultLayout>} />}
      />
      <Route
        path="/create-customer"
        element={<SalesRoute element={<DefaultLayout><CreateCustomer /></DefaultLayout>} />}
      />
      <Route
        path="/customer/:customerid"
        element={<SalesRoute element={<DefaultLayout><CustomerForSales /></DefaultLayout>} />}
      />
      <Route
        path="/edit-customer/:id"
        element={<SalesRoute element={<DefaultLayout><EditCustomer /></DefaultLayout>} />}
      />
      <Route
        path="/create-contact/:customerid"
        element={<SalesRoute element={<DefaultLayout><CreateContact /></DefaultLayout>} />}
      />
      <Route
        path="/:customerid/edit-contact/:contactid"
        element={<SalesRoute element={<DefaultLayout><EditContact /></DefaultLayout>} />}
      />
    </Routes>
    </> 
  );
}

export default App;