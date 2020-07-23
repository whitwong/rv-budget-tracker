import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import formatCurrency from '../helpers';

// Made custom tooltip to format cost value to USD ($10.23)
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip" >
        <p className="label">{`${label}`} Total Cost:</p>
        <p className="cost-value">{formatCurrency.formatCurrency(payload[0].value)}</p>
      </div>
    );
  }

  return null;
};

// Container for displaying data in bar chart format
const SimpleBarChart = ({ data, handleSectorClick, handleChartDataClick }) => {
  const totalData = data.totalCosts;
  const [activeIndex, setActiveIndex] = useState(0);

  // Update activeIndex value and keep table showing on successive bar/sector clicks
  const barClick = (data, index) => {
    handleSectorClick()
    setActiveIndex(index)
  }

  // When activeItem is updated, re-render to show data immediately in CollapsibleTable on onClick of bar/sector of graph
  useEffect(() => {
      const activeItem = totalData[activeIndex];
      handleChartDataClick(activeItem.month)
    }  
  )

  return (
    <BarChart
      width={750}
      height={500}
      data={totalData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} wrapperStyle={{ width: 120, backgroundColor: '#f5f5f5', padding: 10, border: '1px solid #d5d5d5', borderRadius: 3}} />
      <Legend wrapperStyle={{margin: '-0.5em'}} />
      <Bar dataKey="cost" fill="#8884d8" onClick={barClick} >
        {
          totalData.map((entry, index) => (
            <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
          ))
        }
      </Bar>
    </BarChart>
  );
}

export default SimpleBarChart;