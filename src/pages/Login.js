
import Login from "../components/Login";

export default function LoginPage() {
  return (
    <>
      <div className="min-h-full h-screen flex  justify-center py-12 px-4">
        <div className="max-w-md w-full mt-40 ">
          <Login />
        </div>
      </div>
    </>
  );
}



// import { Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/Login";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import SalesDashboard from "./pages/sales/SalesDashboard";
// import AuthContext from "./context/AuthContext";
// import DefaultLayout from "./layout/DefaultLayout";
// import AdminProfile from "./pages/admin/AdminProfile";
// import SalesProfile from "./pages/sales/SalesProfile";
// import { useContext } from "react";
// import SalesProfileA from "./pages/admin/SalesProfileA";
// import Customer from "./pages/customer/Customer";
// import CreateUser from "./pages/admin/CreateUser";
// import EditUser from "./pages/admin/EditUser"; // import Unauthorized component
// import Unauthorized from "./components/Unauthorized";
// import CreateCustomer from "./pages/sales/CreateCustomer";
// import CustomerForSales from "./pages/customer/CustomerForSales";
// import EditProfile from "./pages/EditProfile";
// import EditCustomer from "./pages/customer/EditCustomer";
// import CreateContact from "./pages/sales/CreateContact";
// import EditContact from "./pages/sales/EditContact";

// function App() {
//   const { role } = useContext(AuthContext);

//   // Admin Route Wrapper
//   const AdminRoute = ({ element }) => {
//     return role === "ROLE_ADMIN" ? element : <Unauthorized />;
//   };

//   // Sales Route Wrapper
//   const SalesRoute = ({ element }) => {
//     return role === "ROLE_SALES_REP" ? element : <Unauthorized />;
//   };

//   return (
//     <>
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route
//         path="/profile"
//         element={role === "ROLE_ADMIN" ? <AdminProfile /> : <SalesProfile />}
//       />
//       <Route path="/edit-profile/:id" element={<EditProfile />} />
//       <Route
//         path="/sales-reps/:id"
//         element={<AdminRoute element={<SalesProfileA />} />}
//       />
//       <Route
//         path="/admin"
//         element={<AdminRoute element={<AdminDashboard />} />}
//       />
//       <Route
//         path="/customers/:customerid"
//         element={<AdminRoute element={<Customer />} />}
//       />
//       <Route
//         path="/create-user"
//         element={<AdminRoute element={<CreateUser />} />}
//       />
//       <Route
//         path="/edit-user/:id"
//         element={<AdminRoute element={<EditUser />} />}
//       />

//       <Route
//         path="/sales"
//         element={<SalesRoute element={<SalesDashboard />} />}
//       />
//       <Route
//         path="/create-customer"
//         element={<SalesRoute element={<CreateCustomer />} />}
//       />
//       <Route
//         path="/customer/:customerid"
//         element={<SalesRoute element={<CustomerForSales />} />}
//       />
//       <Route
//         path="/edit-customer/:id"
//         element={<SalesRoute element={<EditCustomer />} />}
//       />
//       <Route
//         path="/create-contact/:customerid"
//         element={<SalesRoute element={<CreateContact />} />}
//       />
//       <Route
//         path="/:customerid/edit-contact/:contactid"
//         element={<SalesRoute element={<EditContact />} />}
//       />
//     </Routes>
//     </> 
//   );
// }

// export default App;
