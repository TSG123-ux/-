import React from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, ScatterChart, Scatter, ZAxis,
  FunnelChart, Funnel
} from 'recharts';

const Analytics = () => {
  // 模拟订单趋势数据
  const orderTrendData = [
    { month: '1月', orders: 120, revenue: 60000 },
    { month: '2月', orders: 190, revenue: 95000 },
    { month: '3月', orders: 300, revenue: 150000 },
    { month: '4月', orders: 250, revenue: 125000 },
    { month: '5月', orders: 320, revenue: 160000 },
    { month: '6月', orders: 400, revenue: 200000 },
  ];

  // 模拟需求类型分布数据
  const requestTypeData = [
    { name: 'PPT设计', value: 35 },
    { name: '3D建模', value: 25 },
    { name: 'UI设计', value: 15 },
    { name: '平面设计', value: 10 },
    { name: '插画设计', value: 10 },
    { name: '动画制作', value: 5 },
  ];

  // 模拟设计师技能分布数据
  const designerSkillData = [
    { name: 'PPT设计', value: 45 },
    { name: '3D建模', value: 30 },
    { name: 'UI设计', value: 40 },
    { name: '平面设计', value: 35 },
    { name: '插画设计', value: 25 },
    { name: '动画制作', value: 20 },
  ];

  // 模拟月度收入数据
  const monthlyRevenueData = [
    { month: '1月', revenue: 60000 },
    { month: '2月', revenue: 95000 },
    { month: '3月', revenue: 150000 },
    { month: '4月', revenue: 125000 },
    { month: '5月', revenue: 160000 },
    { month: '6月', revenue: 200000 },
  ];

  // 模拟设计师活跃度数据
  const designerActivityData = [
    { month: '1月', active: 45, total: 80 },
    { month: '2月', active: 55, total: 85 },
    { month: '3月', active: 65, total: 95 },
    { month: '4月', active: 70, total: 105 },
    { month: '5月', active: 85, total: 115 },
    { month: '6月', active: 100, total: 128 },
  ];

  // 模拟需求完成率数据
  const completionRateData = [
    { month: '1月', rate: 85 },
    { month: '2月', rate: 88 },
    { month: '3月', rate: 92 },
    { month: '4月', rate: 90 },
    { month: '5月', rate: 95 },
    { month: '6月', rate: 96 },
  ];

  // 模拟客户满意度数据
  const satisfactionData = [
    { month: '1月', score: 4.5 },
    { month: '2月', score: 4.6 },
    { month: '3月', score: 4.7 },
    { month: '4月', score: 4.8 },
    { month: '5月', score: 4.9 },
    { month: '6月', score: 4.9 },
  ];

  // 模拟设计领域性能数据（雷达图）
  const designPerformanceData = [
    { subject: 'PPT设计', A: 80, B: 90, fullMark: 100 },
    { subject: '3D建模', A: 70, B: 65, fullMark: 100 },
    { subject: 'UI设计', A: 90, B: 85, fullMark: 100 },
    { subject: '平面设计', A: 75, B: 80, fullMark: 100 },
    { subject: '插画设计', A: 85, B: 75, fullMark: 100 },
    { subject: '动画制作', A: 65, B: 70, fullMark: 100 },
  ];

  // 模拟累积收入数据（面积图）
  const cumulativeRevenueData = [
    { month: '1月', revenue: 60000, cumulative: 60000 },
    { month: '2月', revenue: 95000, cumulative: 155000 },
    { month: '3月', revenue: 150000, cumulative: 305000 },
    { month: '4月', revenue: 125000, cumulative: 430000 },
    { month: '5月', revenue: 160000, cumulative: 590000 },
    { month: '6月', revenue: 200000, cumulative: 790000 },
  ];

  // 模拟设计师技能与接单量数据（散点图）
  const designerSkillOrderData = [
    { skill: 80, orders: 45, name: '设计师A' },
    { skill: 90, orders: 60, name: '设计师B' },
    { skill: 70, orders: 30, name: '设计师C' },
    { skill: 85, orders: 50, name: '设计师D' },
    { skill: 65, orders: 25, name: '设计师E' },
    { skill: 95, orders: 65, name: '设计师F' },
    { skill: 75, orders: 35, name: '设计师G' },
    { skill: 88, orders: 55, name: '设计师H' },
  ];

  // 模拟季度对比数据（组合图表）
  const quarterlyComparisonData = [
    { quarter: 'Q1', revenue: 305000, orders: 610, designers: 95 },
    { quarter: 'Q2', revenue: 485000, orders: 970, designers: 128 },
  ];

  // 模拟订单转化漏斗数据（漏斗图）
  const funnelData = [
    { name: '需求提交', value: 500 },
    { name: '设计师接单', value: 400 },
    { name: '开始设计', value: 350 },
    { name: '初稿交付', value: 300 },
    { name: '修改完成', value: 280 },
    { name: '订单完成', value: 250 },
  ];

  // 模拟设计师工作效率数据
  const designerEfficiencyData = [
    { name: '设计师A', completed: 45, pending: 5, efficiency: 90 },
    { name: '设计师B', completed: 38, pending: 7, efficiency: 84 },
    { name: '设计师C', completed: 42, pending: 3, efficiency: 93 },
    { name: '设计师D', completed: 35, pending: 10, efficiency: 78 },
    { name: '设计师E', completed: 40, pending: 6, efficiency: 87 },
    { name: '设计师F', completed: 48, pending: 2, efficiency: 96 },
  ];

  // 模拟平台关键指标数据
  const keyMetricsData = [
    { name: '订单完成率', value: 96 },
    { name: '客户满意度', value: 98 },
    { name: '设计师活跃度', value: 85 },
    { name: '平台利用率', value: 92 },
  ];

  // 模拟设计师技能极坐标图数据
  const polarData = [
    { subject: 'PPT设计', A: 85, fullMark: 100 },
    { subject: '3D建模', A: 75, fullMark: 100 },
    { subject: 'UI设计', A: 90, fullMark: 100 },
    { subject: '平面设计', A: 80, fullMark: 100 },
    { subject: '插画设计', A: 70, fullMark: 100 },
    { subject: '动画制作', A: 65, fullMark: 100 },
  ];

  // 优化的颜色配置 - 科技蓝色系渐变
  const COLORS = ['#00d4ff', '#00a8ff', '#0076ff', '#0044ff', '#0012ff', '#66b2ff'];
  
  // 渐变色配置
  const GRADIENT_COLORS = {
    primary: {
      start: '#00d4ff',
      end: '#0076ff'
    },
    secondary: {
      start: '#0099cc',
      end: '#0044ff'
    }
  };

  return (
    <div className="analytics">
      <h2>数据可视化</h2>
      
      <div className="analytics-cards">
        <div className="analytics-card">
          <h3>订单与收入趋势</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={orderTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#a8cfff" />
                <YAxis yAxisId="left" stroke="#a8cfff" />
                <YAxis yAxisId="right" orientation="right" stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  cursor={{ stroke: 'rgba(0, 122, 255, 0.3)', strokeWidth: 2 }}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="orders" 
                  name="订单数" 
                  stroke={GRADIENT_COLORS.primary.start} 
                  strokeWidth={3}
                  dot={{ fill: GRADIENT_COLORS.primary.start, r: 4, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 8, fill: GRADIENT_COLORS.primary.start, stroke: '#ffffff', strokeWidth: 2 }}
                  animationDuration={1500}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  name="收入(元)" 
                  stroke={GRADIENT_COLORS.secondary.start} 
                  strokeWidth={3}
                  dot={{ fill: GRADIENT_COLORS.secondary.start, r: 4, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 8, fill: GRADIENT_COLORS.secondary.start, stroke: '#ffffff', strokeWidth: 2 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>需求类型分布</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {requestTypeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="rgba(10, 25, 41, 0.8)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value, name) => [`${value} 个`, name]}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>设计师技能分布</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={designerSkillData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="name" stroke="#a8cfff" />
                <YAxis stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value) => [`${value} 人`, '设计师数量']}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Bar 
                  dataKey="value" 
                  name="设计师数量" 
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={300}
                >
                  {designerSkillData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="rgba(0, 122, 255, 0.3)"
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>月度收入</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#a8cfff" />
                <YAxis stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value) => [`¥${value.toLocaleString()}`, '收入']}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Bar 
                  dataKey="revenue" 
                  name="收入(元)" 
                  fill={GRADIENT_COLORS.primary.start}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={400}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>设计师活跃度</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={designerActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#a8cfff" />
                <YAxis stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  cursor={{ stroke: 'rgba(0, 122, 255, 0.3)', strokeWidth: 2 }}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  name="活跃设计师" 
                  stroke={GRADIENT_COLORS.primary.start} 
                  strokeWidth={3}
                  dot={{ fill: GRADIENT_COLORS.primary.start, r: 4, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 8, fill: GRADIENT_COLORS.primary.start, stroke: '#ffffff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationBegin={500}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  name="总设计师" 
                  stroke={GRADIENT_COLORS.secondary.start} 
                  strokeWidth={3}
                  dot={{ fill: GRADIENT_COLORS.secondary.start, r: 4, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 8, fill: GRADIENT_COLORS.secondary.start, stroke: '#ffffff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationBegin={600}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>需求完成率</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completionRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#a8cfff" />
                <YAxis domain={[80, 100]} stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value) => [`${value}%`, '完成率']}
                  cursor={{ stroke: 'rgba(0, 122, 255, 0.3)', strokeWidth: 2 }}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  name="完成率" 
                  stroke={GRADIENT_COLORS.primary.start} 
                  strokeWidth={3}
                  dot={{ fill: GRADIENT_COLORS.primary.start, r: 4, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 8, fill: GRADIENT_COLORS.primary.start, stroke: '#ffffff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationBegin={700}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>客户满意度</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#a8cfff" />
                <YAxis domain={[4, 5]} stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value) => [`${value}/5`, '满意度']}
                  cursor={{ stroke: 'rgba(0, 122, 255, 0.3)', strokeWidth: 2 }}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  name="满意度" 
                  stroke={GRADIENT_COLORS.secondary.start} 
                  strokeWidth={3}
                  dot={{ fill: GRADIENT_COLORS.secondary.start, r: 4, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 8, fill: GRADIENT_COLORS.secondary.start, stroke: '#ffffff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationBegin={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>设计领域性能对比</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={designPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <PolarGrid stroke="rgba(0, 122, 255, 0.3)" />
                <PolarAngleAxis dataKey="subject" stroke="#a8cfff" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#a8cfff" />
                <Radar 
                  name="团队A" 
                  dataKey="A" 
                  stroke={GRADIENT_COLORS.primary.start} 
                  fill={GRADIENT_COLORS.primary.start} 
                  fillOpacity={0.3}
                  animationDuration={1500}
                  animationBegin={900}
                />
                <Radar 
                  name="团队B" 
                  dataKey="B" 
                  stroke={GRADIENT_COLORS.secondary.start} 
                  fill={GRADIENT_COLORS.secondary.start} 
                  fillOpacity={0.3}
                  animationDuration={1500}
                  animationBegin={1000}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>累积收入趋势</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={cumulativeRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="month" stroke="#a8cfff" />
                <YAxis stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value) => [`¥${value.toLocaleString()}`, '金额']}
                  cursor={{ stroke: 'rgba(0, 122, 255, 0.3)', strokeWidth: 2 }}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="月度收入" 
                  stroke={GRADIENT_COLORS.primary.start} 
                  fill={GRADIENT_COLORS.primary.start} 
                  fillOpacity={0.3}
                  animationDuration={1500}
                  animationBegin={1100}
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulative" 
                  name="累积收入" 
                  stroke={GRADIENT_COLORS.secondary.start} 
                  fill={GRADIENT_COLORS.secondary.start} 
                  fillOpacity={0.3}
                  animationDuration={1500}
                  animationBegin={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>设计师技能与接单量关系</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis type="number" dataKey="skill" name="技能评分" stroke="#a8cfff" />
                <YAxis type="number" dataKey="orders" name="接单量" stroke="#a8cfff" />
                <ZAxis type="number" range={[60, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  cursor={{ stroke: 'rgba(0, 122, 255, 0.3)', strokeWidth: 2 }}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Scatter 
                  name="设计师" 
                  data={designerSkillOrderData} 
                  fill={GRADIENT_COLORS.primary.start}
                  animationDuration={1500}
                  animationBegin={1300}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>季度对比分析</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quarterlyComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="quarter" stroke="#a8cfff" />
                <YAxis yAxisId="left" stroke="#a8cfff" />
                <YAxis yAxisId="right" orientation="right" stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Bar 
                  yAxisId="left" 
                  dataKey="revenue" 
                  name="收入(元)" 
                  fill={GRADIENT_COLORS.primary.start}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={1400}
                />
                <Bar 
                  yAxisId="left" 
                  dataKey="orders" 
                  name="订单数" 
                  fill={GRADIENT_COLORS.secondary.start}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={1500}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="designers" 
                  name="设计师数量" 
                  stroke="#66b2ff" 
                  strokeWidth={3}
                  dot={{ fill: '#66b2ff', r: 4, stroke: '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 8, fill: '#66b2ff', stroke: '#ffffff', strokeWidth: 2 }}
                  animationDuration={1500}
                  animationBegin={1600}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>订单转化漏斗</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart>
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  animationDuration={1500}
                  animationBegin={1700}
                >
                  {funnelData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      stroke="rgba(10, 25, 41, 0.8)"
                      strokeWidth={2}
                    />
                  ))}
                </Funnel>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value) => [`${value} 个`, '数量']}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>设计师工作效率</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={designerEfficiencyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis dataKey="name" stroke="#a8cfff" />
                <YAxis stroke="#a8cfff" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Bar 
                  dataKey="completed" 
                  name="已完成订单" 
                  stackId="a" 
                  fill={GRADIENT_COLORS.primary.start}
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  animationBegin={1800}
                />
                <Bar 
                  dataKey="pending" 
                  name="待处理订单" 
                  stackId="a" 
                  fill={GRADIENT_COLORS.secondary.start}
                  animationDuration={1500}
                  animationBegin={1900}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>平台关键指标</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={keyMetricsData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 122, 255, 0.1)" />
                <XAxis type="number" domain={[0, 100]} stroke="#a8cfff" />
                <YAxis type="category" dataKey="name" stroke="#a8cfff" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                  formatter={(value) => [`${value}%`, '指标值']}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Bar 
                  dataKey="value" 
                  name="指标值" 
                  fill={GRADIENT_COLORS.primary.start}
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                  animationBegin={2100}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analytics-card">
          <h3>设计师技能极坐标图</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={polarData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <PolarGrid stroke="rgba(0, 122, 255, 0.3)" />
                <PolarAngleAxis dataKey="subject" stroke="#a8cfff" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#a8cfff" />
                <Radar 
                  name="技能水平" 
                  dataKey="A" 
                  stroke={GRADIENT_COLORS.primary.start} 
                  fill={GRADIENT_COLORS.primary.start} 
                  fillOpacity={0.3}
                  animationDuration={1500}
                  animationBegin={2200}
                />
                <Legend wrapperStyle={{ color: '#a8cfff' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(10, 25, 41, 0.9)', 
                    border: '1px solid rgba(0, 122, 255, 0.5)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <Link to="/admin" className="btn back-btn">
        返回管理后台
      </Link>
    </div>
  );
};

export default Analytics;