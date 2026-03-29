import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 简单的管理员账号密码验证
    // 默认账号：admin，密码：admin123
    if (username === 'admin' && password === 'admin123') {
      // 保存登录状态到本地存储
      localStorage.setItem('adminLoggedIn', 'true');
      // 跳转到管理后台
      navigate('/admin');
    } else {
      setError('账号或密码错误');
    }
  };

  return (
    <div className="admin-login">
      <div className="login-container">
        <h2>管理员登录</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">账号</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn login-btn">
            登录
          </button>
        </form>
        <div className="login-footer">
          <p>默认账号：admin，密码：admin123</p>
          <p><Link to="/">返回首页</Link></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;