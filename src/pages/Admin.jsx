import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  // 检查登录状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      // 如果没有登录，重定向到登录页面
      navigate('/admin-login');
    }
  }, [navigate]);

  // 从本地存储读取设计师数据
  const [designers, setDesigners] = useState(() => {
    const savedDesigners = localStorage.getItem('designers');
    if (savedDesigners) {
      return JSON.parse(savedDesigners);
    }
    // 初始为空数组
    return [];
  });

  // 从本地存储读取需求数据
  const [requests, setRequests] = useState(() => {
    const savedRequests = localStorage.getItem('requests');
    if (savedRequests) {
      const parsedRequests = JSON.parse(savedRequests);
      // 按创建时间倒序排序，最新的需求在前面
      return parsedRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    // 初始为空数组
    return [];
  });

  // 从本地存储读取平台数据
  const [platforms, setPlatforms] = useState(() => {
    const savedPlatforms = localStorage.getItem('platforms');
    if (savedPlatforms) {
      return JSON.parse(savedPlatforms);
    }
    // 初始为空数组
    return [];
  });

  // 从本地存储读取合作店铺数据
  const [shops, setShops] = useState(() => {
    const savedShops = localStorage.getItem('shops');
    if (savedShops) {
      return JSON.parse(savedShops);
    }
    // 初始为空数组
    return [];
  });

  const [newShop, setNewShop] = useState('');

  // 订单对接管理相关状态
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 审核设计师
  const handleReview = (id, status) => {
    const updatedDesigners = designers.map(designer => 
      designer.id === id ? { ...designer, status } : designer
    );
    setDesigners(updatedDesigners);
    // 保存到本地存储
    localStorage.setItem('designers', JSON.stringify(updatedDesigners));
  };

  // 删除设计师
  const handleDelete = (id) => {
    const updatedDesigners = designers.filter(designer => designer.id !== id);
    setDesigners(updatedDesigners);
    // 保存到本地存储
    localStorage.setItem('designers', JSON.stringify(updatedDesigners));
  };

  // 审核平台
  const handlePlatformReview = (id, status) => {
    const updatedPlatforms = platforms.map(platform => 
      platform.id === id ? { ...platform, status } : platform
    );
    setPlatforms(updatedPlatforms);
    // 保存到本地存储
    localStorage.setItem('platforms', JSON.stringify(updatedPlatforms));
  };

  // 删除平台
  const handlePlatformDelete = (id) => {
    const updatedPlatforms = platforms.filter(platform => platform.id !== id);
    setPlatforms(updatedPlatforms);
    // 保存到本地存储
    localStorage.setItem('platforms', JSON.stringify(updatedPlatforms));
  };

  // 派单给设计师
  const handleAssign = (id) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: '已派单' } : req
    ));
  };

  // 添加合作店铺
  const handleAddShop = (e) => {
    e.preventDefault();
    if (newShop) {
      const newId = shops.length + 1;
      const updatedShops = [...shops, { id: newId, name: newShop }];
      setShops(updatedShops);
      // 保存到本地存储
      localStorage.setItem('shops', JSON.stringify(updatedShops));
      setNewShop('');
    }
  };

  // 删除合作店铺
  const handleDeleteShop = (id) => {
    const updatedShops = shops.filter(shop => shop.id !== id);
    setShops(updatedShops);
    // 保存到本地存储
    localStorage.setItem('shops', JSON.stringify(updatedShops));
  };

  // 计算每个设计师的订单数量
  const getDesignerOrderCount = (designerId) => {
    return requests.filter(req => req.designerId === designerId).length;
  };

  // 过滤和分页
  const filteredRequests = requests.filter(req => {
    const searchLower = searchTerm.toLowerCase();
    return (
      req.type.toLowerCase().includes(searchLower) ||
      (req.designerName && req.designerName.toLowerCase().includes(searchLower)) ||
      (req.orderNumber && req.orderNumber.toLowerCase().includes(searchLower))
    );
  });

  // 计算分页
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  // 改变页码
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin">
      <h2>管理后台</h2>
      
      <div className="admin-section">
        <h3>设计师管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>工号</th>
                <th>姓名</th>
                <th>技能</th>
                <th>状态</th>
                <th>订单数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {designers.map(designer => (
                <tr key={designer.id}>
                  <td>{designer.id}</td>
                  <td>{designer.employeeId || '未生成'}</td>
                  <td>{designer.name}</td>
                  <td>{designer.skills.join(', ')}</td>
                  <td>{designer.status}</td>
                  <td>{getDesignerOrderCount(designer.id)}</td>
                  <td>
                    {designer.status === '待审核' && (
                      <>
                        <button 
                          className="btn small-btn approve-btn"
                          onClick={() => handleReview(designer.id, '已通过')}
                        >
                          通过
                        </button>
                        <button 
                          className="btn small-btn reject-btn"
                          onClick={() => handleReview(designer.id, '已拒绝')}
                        >
                          不通过
                        </button>
                      </>
                    )}
                    <button 
                      className="btn small-btn delete-btn"
                      onClick={() => handleDelete(designer.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="admin-section">
        <h3>需求管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>类型</th>
                <th>预算</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.type}</td>
                  <td>¥{req.budget}</td>
                  <td>{req.status}</td>
                  <td>
                    {req.status === '待派单' && (
                      <button 
                        className="btn small-btn assign-btn"
                        onClick={() => handleAssign(req.id)}
                      >
                        派单
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="admin-section">
        <h3>订单对接管理</h3>
        <div className="search-container">
          <input
            type="text"
            placeholder="搜索订单类型、设计师或订单号"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control search-input"
          />
        </div>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>订单号</th>
                <th>需求类型</th>
                <th>预算</th>
                <th>状态</th>
                <th>设计师</th>
                <th>创建时间</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map(req => (
                <tr key={req.id}>
                  <td>{req.orderNumber || '未生成'}</td>
                  <td>{req.type}</td>
                  <td>¥{req.budget}</td>
                  <td>{req.status}</td>
                  <td>{req.designerName || '未分配'}</td>
                  <td>{new Date(req.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 分页 */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="admin-section">
        <h3>平台认证管理</h3>
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>平台名称</th>
                <th>联系人</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(platform => (
                <tr key={platform.id}>
                  <td>{platform.id}</td>
                  <td>{platform.platformName}</td>
                  <td>{platform.contactPerson}</td>
                  <td>{platform.status}</td>
                  <td>
                    {platform.status === '待审核' && (
                      <>
                        <button 
                          className="btn small-btn approve-btn"
                          onClick={() => handlePlatformReview(platform.id, '已通过')}
                        >
                          通过
                        </button>
                        <button 
                          className="btn small-btn reject-btn"
                          onClick={() => handlePlatformReview(platform.id, '已拒绝')}
                        >
                          不通过
                        </button>
                      </>
                    )}
                    <button 
                      className="btn small-btn delete-btn"
                      onClick={() => handlePlatformDelete(platform.id)}
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="admin-section">
        <h3>合作店铺管理</h3>
        <div className="shops-list">
          {shops.map(shop => (
            <div key={shop.id} className="shop-item">
              {shop.name}
              <button 
                className="btn small-btn delete-btn"
                onClick={() => handleDeleteShop(shop.id)}
                style={{ marginLeft: '10px' }}
              >
                删除
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddShop} className="add-shop-form">
          <input 
            type="text" 
            value={newShop} 
            onChange={(e) => setNewShop(e.target.value)}
            placeholder="输入店铺名称"
            className="form-control"
            required
          />
          <button type="submit" className="btn add-shop-btn">
            添加店铺
          </button>
        </form>
      </div>
      
      <div className="admin-actions">
        <Link to="/analytics" className="btn analytics-btn">
          数据可视化
        </Link>
        <Link to="/" className="btn back-btn">
          返回首页
        </Link>
        <button 
          className="btn logout-btn"
          onClick={() => {
            localStorage.removeItem('adminLoggedIn');
            navigate('/admin-login');
          }}
        >
          登出
        </button>
      </div>
    </div>
  );
};

export default Admin;