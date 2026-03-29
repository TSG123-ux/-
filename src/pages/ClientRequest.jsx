import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClientRequest = () => {
  const [formData, setFormData] = useState({
    type: 'PPT设计',
    budget: '',
    pages: '',
    style: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 模拟提交，将需求保存到本地存储
    const newRequest = {
      id: Date.now(),
      type: formData.type,
      budget: formData.budget,
      pages: formData.pages,
      style: formData.style,
      status: '待派单',
      createdAt: new Date().toISOString()
    };
    
    // 获取现有的需求列表
    const existingRequests = JSON.parse(localStorage.getItem('requests') || '[]');
    // 添加新需求
    existingRequests.push(newRequest);
    // 保存到本地存储
    localStorage.setItem('requests', JSON.stringify(existingRequests));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="client-request">
        <div className="success-message">
          <div className="success-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>需求已发布，等待设计师接单</h2>
          <p>我们会尽快为您匹配合适的设计师</p>
          <Link to="/" className="btn">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="client-request">
      <h2>发布设计需求</h2>
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label>需求类型</label>
          <select 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
            className="form-control"
          >
            <option value="PPT设计">PPT设计</option>
            <option value="3D建模">3D建模</option>
            <option value="UI设计">UI设计</option>
            <option value="插画设计">插画设计</option>
            <option value="动画制作">动画制作</option>
            <option value="海报设计">海报设计</option>
            <option value="广告设计">广告设计</option>
            <option value="视频剪辑">视频剪辑</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>预算（元）</label>
          <input 
            type="number" 
            name="budget" 
            value={formData.budget} 
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        
        {formData.type === 'PPT设计' && (
          <div className="form-group">
            <label>页数</label>
            <input 
              type="number" 
              name="pages" 
              value={formData.pages} 
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        )}
        
        <div className="form-group">
          <label>风格描述</label>
          <textarea 
            name="style" 
            value={formData.style} 
            onChange={handleChange}
            className="form-control"
            rows={4}
            required
          ></textarea>
        </div>
        
        <button type="submit" className="btn submit-btn">
          提交需求
        </button>
      </form>
    </div>
  );
};

export default ClientRequest;