import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Particles from './components/Particles';
import Home from './pages/Home';
import ClientRequest from './pages/ClientRequest';
import DesignerRegister from './pages/DesignerRegister';
import DesignerLogin from './pages/DesignerLogin';
import DesignerHall from './pages/DesignerHall';
import DesignerList from './pages/DesignerList';
import DesignerOrders from './pages/DesignerOrders';
import PlatformRegister from './pages/PlatformRegister';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Analytics from './pages/Analytics';
import ClientLogin from './pages/ClientLogin';
import ClientDashboard from './pages/ClientDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Particles />
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/client-request" element={<ClientRequest />} />
            <Route path="/designer-register" element={<DesignerRegister />} />
            <Route path="/designer-login" element={<DesignerLogin />} />
            <Route path="/designer-hall" element={<DesignerHall />} />
            <Route path="/designer-orders" element={<DesignerOrders />} />
            <Route path="/designer-list" element={<DesignerList />} />
            <Route path="/platform-register" element={<PlatformRegister />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;