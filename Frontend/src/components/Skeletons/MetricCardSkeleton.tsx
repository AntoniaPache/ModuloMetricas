import React from 'react';
import './SkeletonStyles.css';

interface MetricCardSkeletonProps {
  count?: number;
}

const MetricCardSkeleton: React.FC<MetricCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="metric-card-skeleton">
          <div className="skeleton-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-change"></div>
          </div>
          <div className="skeleton-value"></div>
          <div className="skeleton-unit"></div>
        </div>
      ))}
    </>
  );
};

export default MetricCardSkeleton;
