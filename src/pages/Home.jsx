import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stats, setStats] = useState([
    { label: '设计师总人数', value: 0 },
    { label: '累计订单数', value: 0 },
    { label: '合作平台数', value: 0 },
    { label: '客户满意度', value: '0%' },
    { label: '未完订单量', value: 0 },
    { label: '本月累计成交金额（元）', value: '¥0' }
  ]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // 从本地存储读取实际数据
    const updateStats = () => {
      // 读取设计师数据
      const designers = JSON.parse(localStorage.getItem('designers') || '[]');
      const approvedDesigners = designers.filter(d => d.status === '已通过');

      // 读取需求数据
      const requests = JSON.parse(localStorage.getItem('requests') || '[]');
      const pendingRequests = requests.filter(r => r.status === '待派单' || r.status === '已接单');

      // 读取平台数据
      const platforms = JSON.parse(localStorage.getItem('platforms') || '[]');
      const approvedPlatforms = platforms.filter(p => p.status === '已通过');

      // 计算本月成交金额
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      const monthlyRequests = requests.filter(r => {
        const reqDate = new Date(r.createdAt);
        return reqDate.getMonth() === currentMonth && reqDate.getFullYear() === currentYear && r.status === '已完成';
      });
      const monthlyAmount = monthlyRequests.reduce((sum, req) => sum + Number(req.budget || 0), 0);

      // 计算客户满意度（基于客户评价）
      const reviewedRequests = requests.filter(req => req.review);
      let satisfactionRate = '0%';
      if (reviewedRequests.length > 0) {
        const totalRating = reviewedRequests.reduce((sum, req) => sum + req.review.rating, 0);
        const averageRating = totalRating / reviewedRequests.length;
        // 将5星制转换为百分比
        satisfactionRate = `${Math.round((averageRating / 5) * 100)}%`;
      } else {
        satisfactionRate = '0%';
      }

      // 更新统计数据
      setStats([
        { label: '设计师总人数', value: approvedDesigners.length },
        { label: '累计订单数', value: requests.length },
        { label: '合作平台数', value: approvedPlatforms.length },
        { label: '客户满意度', value: satisfactionRate },
        { label: '未完订单量', value: pendingRequests.length },
        { label: '本月累计成交金额（元）', value: `${monthlyAmount.toLocaleString()}元` }
      ]);

      // 加载评价数据
      const reviewsData = requests
        .filter(req => req.review)
        .map(req => ({
          id: req.id,
          type: req.type,
          rating: req.review.rating,
          comment: req.review.comment,
          createdAt: req.review.createdAt
        }));
      setReviews(reviewsData);
    };

    updateStats();

    // 监听本地存储变化
    window.addEventListener('storage', updateStats);

    return () => {
      window.removeEventListener('storage', updateStats);
    };
  }, []);

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">无界设计：创意管理系统</h1>
        <p className="home-subtitle">为创意破壁，让价值无界</p>
      </div>
      
      <div className="home-services">
        <div className="service-card">
          <h3>高端设计</h3>
        </div>
        <div className="service-card">
          <h3>个性定制</h3>
        </div>
        <div className="service-card">
          <h3>多维服务</h3>
        </div>
      </div>
      
      <div className="home-features">
        <div className="feature-card">
          <div className="feature-images scroll-left">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20tech%20design%20interface%20with%20blue%20holographic%20elements%20and%20neon%20glows&image_size=landscape_4_3" alt="创意设计1" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3d%20digital%20art%20creation%20with%20tech%20blue%20glow%20and%20holographic%20projections&image_size=landscape_4_3" alt="创意设计2" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ai%20assisted%20design%20process%20with%20tech%20interface%20and%20neon%20elements&image_size=landscape_4_3" alt="创意设计3" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20tech%20design%20interface%20with%20blue%20holographic%20elements%20and%20neon%20glows&image_size=landscape_4_3" alt="创意设计1" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=3d%20digital%20art%20creation%20with%20tech%20blue%20glow%20and%20holographic%20projections&image_size=landscape_4_3" alt="创意设计2" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=ai%20assisted%20design%20process%20with%20tech%20interface%20and%20neon%20elements&image_size=landscape_4_3" alt="创意设计3" />
          </div>
        </div>
        <div className="feature-card">
          <div className="feature-images scroll-right">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=real-time%20collaboration%20tech%20platform%20with%20blue%20holograms%20and%20neon%20lines&image_size=landscape_4_3" alt="高效协作1" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloud%20based%20teamwork%20tools%20with%20tech%20interface%20and%20holographic%20displays&image_size=landscape_4_3" alt="高效协作2" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=virtual%20design%20studio%20with%20tech%20blue%20atmosphere%20and%20neon%20accents&image_size=landscape_4_3" alt="高效协作3" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=real-time%20collaboration%20tech%20platform%20with%20blue%20holograms%20and%20neon%20lines&image_size=landscape_4_3" alt="高效协作1" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cloud%20based%20teamwork%20tools%20with%20tech%20interface%20and%20holographic%20displays&image_size=landscape_4_3" alt="高效协作2" />
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=virtual%20design%20studio%20with%20tech%20blue%20atmosphere%20and%20neon%20accents&image_size=landscape_4_3" alt="高效协作3" />
          </div>
        </div>
      </div>
      
      <div className="home-stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="home-buttons">
        <Link to="/client-login" className="btn client-btn">
          我是客户（发布需求）
        </Link>
        <Link to="/designer-list" className="btn client-btn">
          我是客户（挑选设计师）
        </Link>
        <Link to="/designer-register" className="btn client-btn">
          我是设计师（入驻接单）
        </Link>
        <Link to="/platform-register" className="btn client-btn">
          我是平台（申请合作）
        </Link>
      </div>
      
      <div className="home-reviews">
        <h3>客户评价</h3>
        <div className="reviews-container">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-rating">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <div className="review-comment">{review.comment}</div>
                <div className="review-order">订单类型：{review.type}</div>
                <div className="review-date">{new Date(review.createdAt).toLocaleString()}</div>
              </div>
            ))
          ) : (
            <div className="no-reviews">暂无评价</div>
          )}
        </div>
      </div>
      
      <div className="home-developer">
        开发者：唐顺国
      </div>
    </div>
  );
};

export default Home;