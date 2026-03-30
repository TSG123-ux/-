import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DesignerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [designer, setDesigner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    orderNumber: '',
    amount: '',
    completionTime: '',
    screenshot: ''
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 检查登录状态
    const loggedInDesigner = localStorage.getItem('loggedInDesigner');
    if (!loggedInDesigner) {
      navigate('/designer-login');
      return;
    }

    const parsedDesigner = JSON.parse(loggedInDesigner);
    setDesigner(parsedDesigner);
    setIsLoggedIn(true);
    
    // 检查审核状态
    if (parsedDesigner.status !== '已通过') {
      setIsApproved(false);
      return;
    }
    setIsApproved(true);

    // 加载已接订单
    loadOrders();
  }, [navigate]);

  // 加载已接订单
  const loadOrders = () => {
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // 显示已接单和已完成的订单
      const designerOrders = parsedRequests.filter(req => 
        req.status === '已接单' || req.status === '已完成'
      );
      setOrders(designerOrders);
    }
  };

  // 更新订单进度
  const handleUpdateProgress = (id, status) => {
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      const updatedRequests = parsedRequests.map(req => 
        req.id === id ? { ...req, status } : req
      );
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      loadOrders();
      setMessage('订单状态已更新');
      
      // 3秒后清除消息
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // 打开完成订单模态框
  const openCompleteModal = (order) => {
    setCurrentOrder(order);
    setOrderDetails({
      orderNumber: '',
      amount: '',
      completionTime: '',
      screenshot: ''
    });
    setUploadedImage(null);
    setShowModal(true);
  };

  // 关闭模态框
  const closeModal = () => {
    setShowModal(false);
    setCurrentOrder(null);
    setUploadedImage(null);
  };

  // 处理订单详情输入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理图片上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setOrderDetails(prev => ({
          ...prev,
          screenshot: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 提交完成订单
  const handleCompleteOrder = () => {
    if (!currentOrder) return;

    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      const updatedRequests = parsedRequests.map(req => 
        req.id === currentOrder.id ? {
          ...req,
          status: '已完成',
          orderNumber: orderDetails.orderNumber,
          amount: orderDetails.amount,
          completionTime: orderDetails.completionTime,
          screenshot: orderDetails.screenshot
        } : req
      );
      localStorage.setItem('requests', JSON.stringify(updatedRequests));
      loadOrders();
      closeModal();
      setMessage('订单已标记为完成');
      
      // 3秒后清除消息
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem('loggedInDesigner');
    navigate('/designer-login');
  };

  if (!isLoggedIn) {
    return (
      <div className="designer-orders">
        <div className="empty-state">
          <p>请先登录设计师账号</p>
          <Link to="/designer-login" className="btn">去登录</Link>
        </div>
      </div>
    );
  }

  if (!isApproved) {
    return (
      <div className="designer-orders">
        <div className="empty-state">
          <p>您的设计师申请正在审核中，请等待管理员审核通过</p>
          <Link to="/" className="btn">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="designer-orders">
      <h2>我的订单</h2>
      
      <div className="dashboard-header">
        <h3 className="welcome-title">欢迎，{designer?.name}！</h3>
        <button 
          className="btn logout-btn"
          onClick={handleLogout}
        >
          退出
        </button>
      </div>
      
      {message && <div className="success-message">{message}</div>}
      
      <div className="orders-section">
        <h3>订单列表</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>订单ID</th>
                <th>订单类型</th>
                <th>预算</th>
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
                    <td>
                      <span className={`order-status ${order.status}`}>
                        {order.status === '已接单' ? '进行中' : order.status}
                      </span>
                    </td>
                    <td>
                      {order.status === '已接单' && (
                        <>
                          <button 
                            className="btn small-btn complete-btn"
                            onClick={() => openCompleteModal(order)}
                          >
                            完成订单
                          </button>
                        </>
                      )}
                      {order.status === '已完成' && (
                        <button 
                          className="btn small-btn view-btn"
                          onClick={() => {
                            alert(`订单详情：\n类型：${order.type}\n预算：¥${order.budget}\n单号：${order.orderNumber || '未填写'}\n金额：¥${order.amount || '未填写'}\n完成时间：${order.completionTime || '未填写'}\n状态：${order.status}`);
                          }}
                        >
                          查看详情
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-orders">
                    暂无订单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/designer-hall" className="btn client-btn">
          去接单
        </Link>
        <Link to="/" className="btn back-btn">
          返回首页
        </Link>
      </div>

      {/* 完成订单模态框 */}
      {showModal && currentOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>完成订单</h3>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            
            <div className="form-group">
              <label htmlFor="orderNumber">订单单号</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={orderDetails.orderNumber}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="请输入订单单号"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="amount">实际金额</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={orderDetails.amount}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="请输入实际金额"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="completionTime">完成时间</label>
              <input
                type="datetime-local"
                id="completionTime"
                name="completionTime"
                value={orderDetails.completionTime}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="screenshot">完成截图</label>
              <input
                type="file"
                id="screenshot"
                name="screenshot"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control"
              />
              {uploadedImage && (
                <div className="image-preview">
                  <img src={uploadedImage} alt="预览" className="preview-img" />
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={closeModal}>
                取消
              </button>
              <button className="btn accept-btn" onClick={handleCompleteOrder}>
                提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignerOrders;