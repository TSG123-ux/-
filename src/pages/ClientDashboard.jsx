import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');

  // 检查登录状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('clientLoggedIn');
    const expiryTime = localStorage.getItem('clientLoginExpiry');
    const savedUsername = localStorage.getItem('clientUsername');
    
    if (!isLoggedIn || !expiryTime || new Date() > new Date(expiryTime)) {
      // 如果没有登录或登录已过期，重定向到登录页面
      localStorage.removeItem('clientLoggedIn');
      localStorage.removeItem('clientLoginExpiry');
      localStorage.removeItem('clientUsername');
      navigate('/client-login');
    } else {
      setUsername(savedUsername);
      // 加载订单数据
      loadOrders();
    }
  }, [navigate]);

  // 加载订单数据
  const loadOrders = () => {
    // 从本地存储读取订单数据
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // 按创建时间倒序排序，最新的订单在前面
      const sortedOrders = parsedRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    }
  };

  // 过滤不文明内容
  const filterContent = (text) => {
    // 常见脏话和不文明词汇
    const badWords = ['傻逼', '操你妈', 'fuck', 'shit', 'bitch', 'damn', '混蛋', '垃圾', '废物', '白痴'];
    let filteredText = text;
    
    // 过滤脏话
    badWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filteredText = filteredText.replace(regex, '*'.repeat(word.length));
    });
    
    // 过滤奇怪字符（只保留中文、英文、数字和常见标点）
    filteredText = filteredText.replace(/[^\u4e00-\u9fa5a-zA-Z0-9.,?!，。！？；;:""''()（）]/g, '');
    
    return filteredText;
  };

  // 处理评价
  const handleReview = (order) => {
    // 评分输入
    const ratingInput = prompt('请为该订单评分（1-5星）：');
    const rating = parseInt(ratingInput);
    
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert('请输入有效的评分（1-5星）！');
      return;
    }
    
    // 评价内容输入
    const commentInput = prompt('请输入评价内容：');
    
    if (!commentInput || commentInput.trim() === '') {
      alert('请输入评价内容！');
      return;
    }
    
    // 过滤评价内容
    const filteredComment = filterContent(commentInput);
    
    // 从本地存储读取订单数据
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // 找到对应订单并添加评价
      const updatedRequests = parsedRequests.map(req => {
        if (req.id === order.id) {
          return {
            ...req,
            review: {
              rating: rating,
              comment: filteredComment,
              createdAt: new Date().toISOString()
            }
          };
        }
        return req;
      });
      // 保存到本地存储
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      // 重新加载订单数据
      loadOrders();
      alert('评价成功！');
    }
  };

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem('clientLoggedIn');
    localStorage.removeItem('clientLoginExpiry');
    localStorage.removeItem('clientUsername');
    navigate('/client-login');
  };

  return (
    <div className="client-dashboard">
      <h2>客户中心</h2>
      
      <div className="dashboard-header">
        <h3 className="welcome-title">欢迎，{username}！</h3>
        <button 
          className="btn logout-btn"
          onClick={handleLogout}
        >
          退出
        </button>
      </div>
      
      <div className="orders-section">
        <h3>我的订单</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>订单ID</th>
                <th>订单类型</th>
                <th>预算</th>
                <th>创建时间</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.type}</td>
                    <td>¥{order.budget}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <span className={`order-status ${order.status}`}>
                        {order.status === '待派单' ? '未派出' : order.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn small-btn view-btn"
                        onClick={() => {
                          // 查看订单详情
                          alert(`订单详情：\n类型：${order.type}\n预算：¥${order.budget}\n描述：${order.description}\n状态：${order.status}${order.review ? `\n评分：${'★'.repeat(order.review.rating)}${'☆'.repeat(5 - order.review.rating)}\n评价：${order.review.comment}` : ''}`);
                        }}
                      >
                        查看详情
                      </button>
                      {order.status === '已完成' && !order.review && (
                        <button 
                          className="btn small-btn client-btn"
                          onClick={() => handleReview(order)}
                          style={{ marginTop: '5px' }}
                        >
                          评价订单
                        </button>
                      )}
                      {order.review && (
                        <span style={{ display: 'block', marginTop: '5px', color: '#00d4ff' }}>
                          已评价
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-orders">
                    暂无订单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/client-request" className="btn client-btn">
          提交新需求
        </Link>
        <Link to="/" className="btn back-btn">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default ClientDashboard;