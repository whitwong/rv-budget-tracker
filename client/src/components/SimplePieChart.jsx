import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';

// Container to display expenses via Pie Chart
const ExpensePieChart = ({ data }) => {
  const totalData = data.totalCosts;
  console.log(totalData)

  return (
    <div style={{ width: '100%', height: 800 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie dataKey="totalCost" data={totalData} fill="#8884d8" label />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensePieChart;