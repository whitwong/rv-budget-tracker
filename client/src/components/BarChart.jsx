import React, { useState }from 'react';
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
  const activeItem = totalData[activeIndex];

  const barClick = (data, index) => {
    console.log("Hello Whitney ", index)
    handleSectorClick()
    setActiveIndex(index)
    handleChartDataClick(activeItem.month) //🚨🚨🚨 Need to figure out how to send over activeItem on initial click
  }

  return (
    <div>
    <BarChart
      width={1000}
      height={600}
      data={totalData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} wrapperStyle={{ width: 120, backgroundColor: '#f5f5f5', padding: 10, border: '1px solid #d5d5d5', borderRadius: 3}} />
      <Legend />
      <Bar dataKey="cost" fill="#8884d8" onClick={barClick} >
        {
          totalData.map((entry, index) => (
            <Cell cursor="pointer" fill={index === activeIndex ? '#82ca9d' : '#8884d8'} key={`cell-${index}`} />
          ))
        }
      </Bar>
    </BarChart>
    <p className="content">{`Uv of "${activeItem.month}": ${activeItem.cost}`}</p>
    </div>
  );
}

export default SimpleBarChart;