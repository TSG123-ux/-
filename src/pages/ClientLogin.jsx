import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    if (username && password && phone) {
      // 验证手机号码格式
      const phoneRegex = /^1[3-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        setError('请输入正确的手机号码');
        return;
      }
      // 保存登录状态到本地存储
      localStorage.setItem('clientLoggedIn', 'true');
      localStorage.setItem('clientUsername', username);
      localStorage.setItem('clientPhone', phone);
      // 设置登录过期时间（24小时）
      const expirationTime = new Date();
      expirationTime.setHours(expirationTime.getHours() + 24);
      localStorage.setItem('clientLoginExpiry', expirationTime.toISOString());
      
      // 保存客户信息到clients数组
      const existingClients = JSON.parse(localStorage.getItem('clients') || '[]');
      const clientExists = existingClients.some(client => client.username === username);
      if (!clientExists) {
        const newClient = {
          username: username,
          phone: phone,
          createdAt: new Date().toISOString()
        };
        existingClients.push(newClient);
        localStorage.setItem('clients', JSON.stringify(existingClients));
      }
      
      // 跳转到发布需求页面
      navigate('/client-request');
    } else {
      setError('请输入账号、手机号码和密码');
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
            <label htmlFor="phone">手机号码</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="form-control"
              pattern="1[3-9]\d{9}"
              placeholder="请输入11位手机号码"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#00d4ff',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
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