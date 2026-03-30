import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const navigate = useNavigate();

  // 生成随机验证码
  const generateCaptcha = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(randomCode);
  };

  // 组件加载时生成验证码
  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 检查账号长度
    if (username.length < 6) {
      setError('账号长度不能少于6个字符');
      return;
    }
    
    // 检查密码长度
    if (password.length < 6) {
      setError('密码长度不能少于6个字符');
      return;
    }
    
    // 验证验证码
    if (userCaptcha !== captcha) {
      setError('验证码错误，请重新输入');
      generateCaptcha(); // 重新生成验证码
      return;
    }
    
    // 客户账号密码验证
    // 这里可以根据实际需求修改验证逻辑
    // 暂时使用简单的验证，实际项目中应该从后端验证
    if (username && password) {
      // 保存登录状态到本地存储
      localStorage.setItem('clientLoggedIn', 'true');
      localStorage.setItem('clientUsername', username);
      // 设置登录过期时间（24小时）
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 24);
      localStorage.setItem('clientLoginExpiry', expirationTime.toISOString());
      // 跳转到客户订单管理页面
      navigate('/client-dashboard');
    } else {
      setError('请输入账号和密码');
    }
  };

  return (
    <div className="client-login">
      <div className="login-container">
        <h2>客户登录</h2>
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
          <div className="form-group">
            <label htmlFor="captcha">验证码</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                id="captcha"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                required
                className="form-control"
                style={{ flex: 1 }}
                placeholder="请输入验证码"
              />
              <div 
                style={{ 
                  background: '#f0f0f0', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  letterSpacing: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '100px',
                  cursor: 'pointer'
                }}
                onClick={generateCaptcha}
              >
                {captcha}
              </div>
            </div>
            <small style={{ display: 'block', marginTop: '5px', fontSize: '12px', color: '#666' }}>
              点击验证码可刷新
            </small>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn login-btn">
            登录
          </button>
        </form>
        <div className="login-footer">
          <p>请输入您的客户账号和密码</p>
          <p><Link to="/" className="back-home-btn">返回首页</Link></p>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;