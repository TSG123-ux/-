import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PlatformRegister = () => {
  const [formData, setFormData] = useState({
    platformName: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    description: '',
    agreement: '',
    files: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // 简单验证文件类型
    const validFiles = files.filter(file => {
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif',
        'application/pdf',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      return allowedTypes.includes(file.type);
    });
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 检查平台名称是否已存在
    const existingPlatforms = JSON.parse(localStorage.getItem('platforms') || '[]');
    const nameExists = existingPlatforms.some(platform => platform.platformName === formData.platformName);
    
    if (nameExists) {
      setError('该平台名称已存在，请使用其他名称');
      return;
    }
    
    // 模拟提交，将平台信息添加到本地存储
    const newPlatform = {
      id: Date.now(),
      platformName: formData.platformName,
      contactPerson: formData.contactPerson,
      contactPhone: formData.contactPhone,
      contactEmail: formData.contactEmail,
      description: formData.description,
      agreement: formData.agreement,
      files: formData.files.map(file => ({ name: file.name, type: file.type })),
      status: '待审核',
      createdAt: new Date().toISOString()
    };
    
    // 获取现有的平台列表
    existingPlatforms.push(newPlatform);
    // 保存到本地存储
    localStorage.setItem('platforms', JSON.stringify(existingPlatforms));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="platform-register">
        <div className="success-message">
          <div className="success-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>申请提交成功</h2>
          <p>请等待管理员审核通过后登录派单</p>
          <Link to="/" className="btn">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="platform-register">
      <h2>平台认证申请</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>平台名称</label>
          <input 
            type="text" 
            name="platformName" 
            value={formData.platformName} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>联系人</label>
          <input 
            type="text" 
            name="contactPerson" 
            value={formData.contactPerson} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>联系电话</label>
          <input 
            type="tel" 
            name="contactPhone" 
            value={formData.contactPhone} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>联系邮箱</label>
          <input 
            type="email" 
            name="contactEmail" 
            value={formData.contactEmail} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>平台描述</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            className="form-control"
            rows="4"
            placeholder="请简要描述您的平台业务"
          />
        </div>
        
        <div className="form-group">
          <label>合作协议链接（可空）</label>
          <input 
            type="url" 
            name="agreement" 
            value={formData.agreement} 
            onChange={handleChange}
            className="form-control"
            placeholder="输入合作协议链接"
          />
        </div>
        
        <div className="form-group">
          <label>上传合作协议文件（可空，支持图片、文档、PDF）</label>
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange}
            className="form-control"
            style={{ padding: '10px' }}
          />
          {formData.files.length > 0 && (
            <div className="uploaded-files">
              {formData.files.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <button 
                    type="button" 
                    className="remove-file-btn"
                    onClick={() => removeFile(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="btn submit-btn">
          提交申请
        </button>
      </form>
    </div>
  );
};

export default PlatformRegister;