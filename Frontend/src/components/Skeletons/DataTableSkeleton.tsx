import React from 'react';
import './SkeletonStyles.css';

interface DataTableSkeletonProps {
  rows?: number;
  columns?: number;
}

const DataTableSkeleton: React.FC<DataTableSkeletonProps> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="data-table-skeleton">
      <div className="skeleton-table-title"></div>
      <div className="skeleton-table-header">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="skeleton-table-header-cell"></div>
        ))}
      </div>
      <div className="skeleton-table-body">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="skeleton-table-row">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="skeleton-table-cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTableSkeleton;
