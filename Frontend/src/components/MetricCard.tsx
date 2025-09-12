import React from 'react';
import { MetricCard as MetricCardType } from '../data/mockData';
import './MetricCard.css';

interface MetricCardProps {
  metric: MetricCardType;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const changeColor = metric.change && metric.change > 0 ? 'positive' : 'negative';
  const changeSymbol = metric.change && metric.change > 0 ? '+' : '';

  return (
    <div className="metric-card card">
      <div className="metric-header">
        <h3 className="metric-title">{metric.title}</h3>
      </div>
      
      <div className="metric-value-container">
        <div className="metric-value">
          {metric.value}
          {metric.unit && <span className="metric-unit">{metric.unit}</span>}
        </div>
        
        {metric.change !== undefined && (
          <div className={`metric-change ${changeColor}`}>
            <span className="change-icon">
              {metric.change > 0 ? '↗' : '↘'}
            </span>
            {changeSymbol}{metric.change}%
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
