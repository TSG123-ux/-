import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DesignerList = () => {
  const [designers, setDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState(null);

  // 从本地存储加载设计师数据
  const loadDesigners = () => {
    const savedDesigners = localStorage.getItem('designers');
    if (savedDesigners) {
      const parsedDesigners = JSON.parse(savedDesigners);
      // 只显示已通过审核的设计师
      const approvedDesigners = parsedDesigners.filter(designer => designer.status === '已通过');
      setDesigners(approvedDesigners);
    }
  };

  useEffect(() => {
    // 初始加载
    loadDesigners();

    // 监听本地存储变化，实现实时同步
    const handleStorageChange = () => {
      loadDesigners();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 定时轮询检查更新（每2秒）
    const interval = setInterval(loadDesigners, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleSelectDesigner = (designer) => {
    setSelectedDesigner(designer);
  };

  const handleCloseModal = () => {
    setSelectedDesigner(null);
  };

  const handleRequestDesigner = (designer) => {
    // 模拟发送请求给设计师
    alert(`已向设计师 ${designer.name} 发送合作请求！`);
    setSelectedDesigner(null);
  };

  return (
    <div className="designer-list">
      <h2>挑选设计师</h2>
      <p className="subtitle">浏览我们的专业设计师，根据他们的技能和作品选择最适合您的合作伙伴</p>
      
      <div className="designers-grid">
        {designers.length === 0 ? (
          <div className="empty-state">
            <p>暂无可用设计师</p>
          </div>
        ) : (
          designers.map(designer => (
            <div key={designer.id} className="designer-card">
              <div className="designer-avatar">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#00d4ff" strokeWidth="2" />
                  <path d="M12 16V12" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="8" r="2" fill="#00d4ff" />
                </svg>
              </div>
              <h3>{designer.name}</h3>
              <div className="designer-skills">
                {designer.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
              <div className="designer-portfolio">
                {designer.portfolio && (
                  <p className="portfolio-link">
                    <a href={designer.portfolio} target="_blank" rel="noopener noreferrer">
                      查看作品集
                    </a>
                  </p>
                )}
                {designer.files && designer.files.length > 0 && (
                  <p className="file-count">{designer.files.length} 个作品文件</p>
                )}
              </div>
              <button 
                className="btn view-btn"
                onClick={() => handleSelectDesigner(designer)}
              >
                查看详情
              </button>
            </div>
          ))
        )}
      </div>

      {/* 设计师详情模态框 */}
      {selectedDesigner && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>×</button>
            <h3>{selectedDesigner.name}</h3>
            <div className="designer-details">
              <div className="detail-section">
                <h4>专业技能</h4>
                <div className="designer-skills">
                  {selectedDesigner.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="detail-section">
                <h4>作品集</h4>
                {selectedDesigner.portfolio && (
                  <p className="portfolio-link">
                    <a href={selectedDesigner.portfolio} target="_blank" rel="noopener noreferrer">
                      {selectedDesigner.portfolio}
                    </a>
                  </p>
                )}
                {selectedDesigner.files && selectedDesigner.files.length > 0 && (
                  <div className="file-list">
                    <h5>上传的作品文件：</h5>
                    {selectedDesigner.files.map((file, index) => (
                      <div key={index} className="file-item">
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
                {!selectedDesigner.portfolio && (!selectedDesigner.files || selectedDesigner.files.length === 0) && (
                  <p className="no-portfolio">暂无作品信息</p>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn cancel-btn" onClick={handleCloseModal}>
                取消
              </button>
              <button 
                className="btn request-btn"
                onClick={() => handleRequestDesigner(selectedDesigner)}
              >
                邀请合作
              </button>
            </div>
          </div>
        </div>
      )}

      <Link to="/" className="btn back-btn">
        返回首页
      </Link>
    </div>
  );
};

export default DesignerList;