import React, { useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import formatCurrency from '../helpers';

// Function to render custom/active shape for Pie Chart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name.match('_') ? payload.name.replace('_', '/') : payload.name.match(/([A-Z])/g).length > 1 ? payload.name.replace(/([A-Z])/g, ` $1`).trim() : payload.name}</text>
      {/* Main Wedges - fill cover activated on-hover */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"#D1BCE3"}
      />
      {/* Ring around main wedges */}
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={"#A46597"}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Cost ${formatCurrency.formatCurrency(value)}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

// Main container for displaying data in Pie Chart form
const CustomPieChart = ({ data, handleSectorClick, handleChartDataClick }) => {
  const totalData = data.totalCosts;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = totalData[activeIndex];

  const onPieEnter = (data, index) => {
    setActiveIndex(index)
  };

  const sectorClick = () => {
    handleSectorClick()
    handleChartDataClick(activeItem.name)
  }

  return (
    <PieChart width={800} height={500}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={totalData}
        cx={400}
        cy={250}
        innerRadius={100}
        outerRadius={200}
        fill="#585481"
        dataKey="cost"
        onMouseEnter={onPieEnter}
        onClick={sectorClick}
      />
    </PieChart>
  );
}

export default CustomPieChart;