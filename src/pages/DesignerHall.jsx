import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DesignerHall = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 检查登录状态
    const loggedInDesigner = localStorage.getItem('loggedInDesigner');
    if (!loggedInDesigner) {
      navigate('/designer-login');
      return;
    }

    const designer = JSON.parse(loggedInDesigner);
    setIsLoggedIn(true);
    
    // 检查审核状态
    if (designer.status !== '已通过') {
      setIsApproved(false);
      return;
    }
    setIsApproved(true);

    // 加载需求数据的函数
    const loadRequests = () => {
      const savedRequests = localStorage.getItem('requests');
      if (savedRequests) {
        const parsedRequests = JSON.parse(savedRequests);
        // 显示所有待派单的需求
        const pendingRequests = parsedRequests.filter(req => req.status === '待派单');
        setRequests(pendingRequests);
      }
    };

    // 初始加载
    loadRequests();

    // 监听本地存储变化，实现实时同步
    const handleStorageChange = () => {
      loadRequests();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 定时轮询检查更新（每2秒）
    const interval = setInterval(loadRequests, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [navigate]);

  const handleAccept = (id) => {
    // 先检查需求是否仍然是待派单状态（防止重复抢单）
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      const request = parsedRequests.find(req => req.id === id);
      
      if (request && request.status === '待派单') {
        // 移除已接单的需求
        const updatedRequests = requests.filter(req => req.id !== id);
        setRequests(updatedRequests);
        setMessage('接单成功');

        // 获取当前登录的设计师信息
        const loggedInDesigner = JSON.parse(localStorage.getItem('loggedInDesigner'));

        // 更新本地存储中的需求状态为已接单，并添加设计师信息
        const updatedStorageRequests = parsedRequests.map(req => 
          req.id === id ? { 
            ...req, 
            status: '已接单',
            designerId: loggedInDesigner.id,
            designerName: loggedInDesigner.name
          } : req
        );
        localStorage.setItem('requests', JSON.stringify(updatedStorageRequests));
      } else {
        setMessage('该需求已被其他设计师接单');
        // 重新加载需求列表
        const pendingRequests = parsedRequests.filter(req => req.status === '待派单');
        setRequests(pendingRequests);
      }
    }

    // 3秒后清除消息
    setTimeout(() => setMessage(''), 3000);
  };

  if (!isLoggedIn) {
    return (
      <div className="designer-hall">
        <div className="empty-state">
          <p>请先登录设计师账号</p>
          <Link to="/designer-login" className="btn">去登录</Link>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="designer-hall">
        <div className="empty-state">
          <p>您的设计师申请正在审核中，请等待管理员审核通过</p>
          <Link to="/" className="btn">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="designer-hall">
      <h2>接单大厅</h2>
      {message && <div className="success-message">{message}</div>}
      
      {requests.length === 0 ? (
        <div className="empty-state">
          <p>暂无待接单需求</p>
          <Link to="/" className="btn">返回首页</Link>
        </div>
      ) : (
        <div className="requests-list">
          {requests.map(req => (
            <div key={req.id} className="request-card">
              <div className="request-header">
                <h3>{req.type}</h3>
                <span className="budget">预算：¥{req.budget}</span>
              </div>
              <div className="request-details">
                {req.pages && <p>页数：{req.pages}页</p>}
                <p>风格：{req.style}</p>
              </div>
              <button 
                className="btn accept-btn"
                onClick={() => handleAccept(req.id)}
              >
                接单
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="hall-actions">
        <Link to="/" className="btn back-btn">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default DesignerHall;