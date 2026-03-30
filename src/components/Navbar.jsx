import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          无界设计
        </Link>
        <div className="navbar-links">
          <Link to="/client-login" className="navbar-link">
            客户登录
          </Link>
          <Link to="/client-dashboard" className="navbar-link">
            客户中心
          </Link>
          <Link to="/designer-login" className="navbar-link">
            设计师登录
          </Link>
          <Link to="/designer-orders" className="navbar-link">
            我的订单
          </Link>
          <Link to="/admin" className="navbar-link">
            管理后台
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;