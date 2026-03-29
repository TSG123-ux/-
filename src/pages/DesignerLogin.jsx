import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DesignerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 从本地存储读取设计师数据
    const designers = JSON.parse(localStorage.getItem('designers') || '[]');
    
    // 查找匹配的设计师
    const designer = designers.find(d => d.username === username && d.password === password);
    
    if (designer) {
      if (designer.status === '已通过') {
        // 保存登录状态到本地存储
        localStorage.setItem('loggedInDesigner', JSON.stringify(designer));
        // 跳转到接单大厅
        navigate('/designer-hall');
      } else {
        setError('您的入驻申请尚未通过审核，请等待管理员审核');
      }
    } else {
      setError('账号或密码错误');
    }
  };

  return (
    <div className="designer-login">
      <div className="login-container">
        <h2>设计师登录</h2>
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
          <p>还没有账号？ <Link to="/designer-register">立即注册</Link></p>
          <p><Link to="/">返回首页</Link></p>
        </div>
      </div>
    </div>
  );
};

export default DesignerLogin;