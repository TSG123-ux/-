import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DesignerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
          <p>还没有账号？ <Link to="/designer-register">立即注册</Link></p>
          <p><Link to="/">返回首页</Link></p>
        </div>
      </div>
    </div>
  );
};

export default DesignerLogin;