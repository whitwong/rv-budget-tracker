import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
const SimpleBarChart = ({ data }) => {
  const totalData = data.totalCosts;

  return (
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
      <Bar dataKey="cost" fill="#8884d8" />
    </BarChart>
  );
}

export default SimpleBarChart;