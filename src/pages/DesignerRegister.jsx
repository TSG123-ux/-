import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DesignerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    skills: [],
    portfolio: '',
    files: []
  });
  const [submitted, setSubmitted] = useState(false);

  // 可选技能标签
  const availableSkills = [
    'PPT设计', '3D建模', 'UI设计', '插画设计', '动画制作', '海报设计', '广告设计', '视频剪辑'
  ];

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

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
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'video/mp4', 'video/avi', 'video/mov'
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

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 检查名字是否已存在
    const existingDesigners = JSON.parse(localStorage.getItem('designers') || '[]');
    const nameExists = existingDesigners.some(designer => designer.name === formData.name);
    
    if (nameExists) {
      setError('该设计师名字已存在，请使用其他名字');
      return;
    }
    
    // 模拟提交，将设计师信息添加到本地存储
    const newDesigner = {
      id: Date.now(),
      name: formData.name,
      username: formData.username,
      password: formData.password,
      skills: formData.skills,
      portfolio: formData.portfolio,
      status: '待审核'
    };
    
    // 添加新设计师
    existingDesigners.push(newDesigner);
    // 保存到本地存储
    localStorage.setItem('designers', JSON.stringify(existingDesigners));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="designer-register">
        <div className="success-message">
          <div className="success-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>入驻成功，提成比例40%</h2>
          <p>请等待管理员审核通过后登录接单</p>
          <Link to="/designer-login" className="btn">前往登录页面</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="designer-register">
      <h2>设计师入驻</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>姓名</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>账号</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>密码</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        <div className="form-group">
          <label>技能标签（可多选）</label>
          <div className="skill-tags">
            {availableSkills.map(skill => (
              <label key={skill} className="skill-tag">
                <input 
                  type="checkbox" 
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-group">
          <label>作品集链接（可空）</label>
          <input 
            type="url" 
            name="portfolio" 
            value={formData.portfolio} 
            onChange={handleChange}
            className="form-control"
            placeholder="输入作品集网站链接"
          />
        </div>
        
        <div className="form-group">
          <label>上传作品文件（可空，支持图片、文档、PDF、视频）</label>
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
          提交入驻
        </button>
        <Link to="/" className="btn back-btn" style={{ marginTop: '15px', display: 'block', textAlign: 'center' }}>
          返回首页
        </Link>
      </form>
    </div>
  );
};

export default DesignerRegister;