import React from 'react';
import { RouteData, CountryData } from '../data/mockData';
import './DataTable.css';

interface Column {
  key: string;
  title: string;
  render?: (value: any, record: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  data: RouteData[] | CountryData[] | any[];
  columns: Column[];
  maxRows?: number;
}

const DataTable: React.FC<DataTableProps> = ({ title, data, columns, maxRows = 8 }) => {
  const displayData = maxRows ? data.slice(0, maxRows) : data;

  const formatValue = (value: any, type?: string): string => {
    if (type === 'currency') {
      return `$${value.toFixed(1)}M`;
    }
    if (type === 'number') {
      return value.toLocaleString('es-ES');
    }
    return value;
  };

  return (
    <div className="data-table-card card">
      <h3 className="table-title">{title}</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="table-header">
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => (
              <tr key={index} className="table-row">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : formatValue(row[column.key])
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
