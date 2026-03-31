import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [refundReason, setRefundReason] = useState('');

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
    const currentClient = localStorage.getItem('clientUsername');
    if (savedRequests && currentClient) {
      const parsedRequests = JSON.parse(savedRequests);
      // 过滤出当前客户的订单
      const clientOrders = parsedRequests.filter(req => req.clientUsername === currentClient);
      // 按创建时间倒序排序，最新的订单在前面
      const sortedOrders = clientOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    }
  };

  // 实时同步订单状态
  useEffect(() => {
    // 监听本地存储变化
    const handleStorageChange = () => {
      loadOrders();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 定时轮询检查更新（每2秒）
    const interval = setInterval(loadOrders, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

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
    setCurrentOrder(order);
    setReviewData({ rating: 5, comment: '' });
    setShowReviewModal(true);
  };

  // 提交评价
  const handleSubmitReview = () => {
    if (!currentOrder) return;
    
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      alert('请选择有效的评分（1-5星）！');
      return;
    }
    
    if (!reviewData.comment || reviewData.comment.trim() === '') {
      alert('请输入评价内容！');
      return;
    }
    
    // 过滤评价内容
    const filteredComment = filterContent(reviewData.comment);
    
    // 从本地存储读取订单数据
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // 找到对应订单并添加评价
      const updatedRequests = parsedRequests.map(req => {
        if (req.id === currentOrder.id) {
          return {
            ...req,
            review: {
              rating: reviewData.rating,
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
      setShowReviewModal(false);
      setCurrentOrder(null);
      alert('评价成功！');
    }
  };

  // 处理付款
  const handlePayment = (order) => {
    setCurrentOrder(order);
    setShowPaymentModal(true);
  };

  // 确认付款
  const handleConfirmPayment = () => {
    if (!currentOrder) return;
    
    // 从本地存储读取订单数据
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // 找到对应订单并标记为已付款
      const updatedRequests = parsedRequests.map(req => {
        if (req.id === currentOrder.id) {
          return {
            ...req,
            paid: true
          };
        }
        return req;
      });
      // 保存到本地存储
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      // 重新加载订单数据
      loadOrders();
      setShowPaymentModal(false);
      setCurrentOrder(null);
      alert('付款成功！');
    }
  };

  // 处理退款
  const handleRefund = (order) => {
    setCurrentOrder(order);
    setRefundReason('');
    setShowRefundModal(true);
  };

  // 确认退款
  const handleConfirmRefund = () => {
    if (!currentOrder) return;
    
    if (!refundReason || refundReason.trim() === '') {
      alert('请输入退款原因！');
      return;
    }
    
    // 从本地存储读取订单数据
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // 找到对应订单并标记为已退款
      const updatedRequests = parsedRequests.map(req => {
        if (req.id === currentOrder.id) {
          return {
            ...req,
            refunded: true,
            refundReason: refundReason,
            refundTime: new Date().toISOString()
          };
        }
        return req;
      });
      // 保存到本地存储
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      // 重新加载订单数据
      loadOrders();
      setShowRefundModal(false);
      setCurrentOrder(null);
      setRefundReason('');
      alert('退款申请已提交！');
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
                        {order.status === '待派单' ? '未派单' : order.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn small-btn view-btn"
                        onClick={() => {
                          // 查看订单详情
                          alert(`订单详情：\n类型：${order.type}\n预算：¥${order.budget}\n描述：${order.description}\n状态：${order.status}${order.paid ? '\n付款状态：已付款' : '\n付款状态：未付款'}${order.refunded ? `\n退款状态：已退款\n退款原因：${order.refundReason}` : ''}${order.review ? `\n评分：${'★'.repeat(order.review.rating)}${'☆'.repeat(5 - order.review.rating)}\n评价：${order.review.comment}` : ''}`);
                        }}
                      >
                        查看详情
                      </button>
                      {order.status === '已完成' && !order.paid && (
                        <button 
                          className="btn small-btn client-btn"
                          onClick={() => handlePayment(order)}
                          style={{ marginTop: '5px' }}
                        >
                          付款
                        </button>
                      )}
                      {order.status === '已完成' && order.paid && !order.refunded && (
                        <>
                          {!order.review && (
                            <button 
                              className="btn small-btn client-btn"
                              onClick={() => handleReview(order)}
                              style={{ marginTop: '5px' }}
                            >
                              评价订单
                            </button>
                          )}
                          <button 
                            className="btn small-btn client-btn"
                            onClick={() => handleRefund(order)}
                            style={{ marginTop: '5px' }}
                          >
                            申请退款
                          </button>
                        </>
                      )}
                      {order.refunded && (
                        <span style={{ display: 'block', marginTop: '5px', color: '#ff6b6b' }}>
                          已退款
                        </span>
                      )}
                      {order.review && !order.refunded && (
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

      {/* 评价模态框 */}
      {showReviewModal && currentOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>评价订单</h3>
            <button className="close-btn" onClick={() => setShowReviewModal(false)}>&times;</button>
            
            <div className="form-group">
              <label>订单类型：{currentOrder.type}</label>
            </div>
            
            <div className="form-group">
              <label>评分</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star}
                    className={`star ${star <= reviewData.rating ? 'active' : ''}`}
                    onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">评价内容</label>
              <textarea
                id="comment"
                value={reviewData.comment}
                onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                className="form-control"
                rows={4}
                placeholder="请输入您的评价..."
              ></textarea>
            </div>
            
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={() => setShowReviewModal(false)}>
                取消
              </button>
              <button className="btn accept-btn" onClick={handleSubmitReview}>
                提交评价
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 付款模态框 */}
      {showPaymentModal && currentOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>订单付款</h3>
            <button className="close-btn" onClick={() => setShowPaymentModal(false)}>&times;</button>
            
            <div className="form-group">
              <label>订单类型：{currentOrder.type}</label>
            </div>
            
            <div className="form-group">
              <label>订单金额：¥{currentOrder.budget}</label>
            </div>
            
            <div className="payment-methods">
              <h4>请选择付款方式</h4>
              
              <div className="payment-option">
                <h5>微信支付</h5>
                <div className="qr-code">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20pay%20qr%20code%20with%20green%20background%20and%20Gemini%20name&image_size=square" alt="微信收款码" className="qr-code-img" />
                  <p>请使用微信扫描二维码付款</p>
                  <p style={{ fontSize: '12px', color: '#a8cfff' }}>Gemini(**国)</p>
                </div>
              </div>
              
              <div className="payment-option">
                <h5>支付宝</h5>
                <div className="qr-code">
                  <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=alipay%20payment%20qr%20code%20with%20blue%20background%20and%20Chinese%20text&image_size=square" alt="支付宝收款码" className="qr-code-img" />
                  <p>请使用支付宝扫描二维码付款</p>
                  <p style={{ fontSize: '12px', color: '#a8cfff' }}>**国</p>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={() => setShowPaymentModal(false)}>
                取消
              </button>
              <button className="btn accept-btn" onClick={handleConfirmPayment}>
                确认付款
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 退款模态框 */}
      {showRefundModal && currentOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>申请退款</h3>
            <button className="close-btn" onClick={() => setShowRefundModal(false)}>&times;</button>
            
            <div className="form-group">
              <label>订单类型：{currentOrder.type}</label>
            </div>
            
            <div className="form-group">
              <label>订单金额：¥{currentOrder.budget}</label>
            </div>
            
            <div className="form-group">
              <label htmlFor="refundReason">退款原因</label>
              <textarea
                id="refundReason"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="form-control"
                rows={4}
                placeholder="请详细说明退款原因..."
              ></textarea>
            </div>
            
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={() => setShowRefundModal(false)}>
                取消
              </button>
              <button className="btn accept-btn" onClick={handleConfirmRefund}>
                提交退款申请
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;