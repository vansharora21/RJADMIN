import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/Login-Page";
import ReportsAndLogs from "./pages/Report";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAuthenticated") === "true";
  return isAuth ? children : <Navigate to="/" replace />;
};

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/";
  const getAuth = localStorage.getItem("isAuthenticated") === "true";
  
  console.log(getAuth, "getAuth is here");

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      {/* BG */}
      {!hideSidebar && (
        <div className='fixed inset-0 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
          <div className='absolute inset-0 backdrop-blur-sm' />
        </div>
      )}

      {!hideSidebar && getAuth && <Sidebar />}
      
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/dashboard' element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
        <Route path='/products' element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
        <Route path='/sales' element={<ProtectedRoute><SalesPage /></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
        <Route path='/analytics' element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
        <Route path='/report' element={<ProtectedRoute><ReportsAndLogs/></ProtectedRoute>} />
        <Route path='/settings' element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#1f2937',
          color: '#f9fafb',
          border: '1px solid #374151'
        }}
      />
    </div>
  );
}

export default App;
