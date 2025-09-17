import React from 'react';
import './SkeletonStyles.css';

interface ChartCardSkeletonProps {
  height?: number;
  type?: 'bar' | 'line' | 'pie' | 'area';
}

const ChartCardSkeleton: React.FC<ChartCardSkeletonProps> = ({ height = 300, type = 'bar' }) => {
  const getChartSkeletonClass = () => {
    switch (type) {
      case 'pie':
        return 'chart-skeleton-pie';
      case 'line':
        return 'chart-skeleton-line';
      case 'area':
        return 'chart-skeleton-area';
      default:
        return 'chart-skeleton-bar';
    }
  };

  return (
    <div className="chart-card-skeleton" style={{ height: `${height}px` }}>
      <div className="skeleton-chart-title"></div>
      <div className={`skeleton-chart-content ${getChartSkeletonClass()}`}>
        <div className="skeleton-chart-bars"></div>
        <div className="skeleton-chart-legend"></div>
      </div>
    </div>
  );
};

export default ChartCardSkeleton;
