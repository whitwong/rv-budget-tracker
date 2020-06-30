import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Chart parameters when displayed
const ExpenseChart = ({ data }) => {
  return (
    <LineChart
      display="flex"
      width={1000}
      height={700}
      data={data}
      margin={{
        top: 20, right: 40, left: 80, bottom: 100,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="purchase_date" angle={-30} textAnchor="end" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="cost" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}

export default ExpenseChart;