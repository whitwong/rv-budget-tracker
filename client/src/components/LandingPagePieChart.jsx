import React from 'react';
import { PieChart, Pie, Cell, } from 'recharts';

const COLORS = ['#BE375F', '#ED8554', '#429fA3',];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, payload } = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const p = (percent * 100).toFixed(0);
  const name = payload.category.match('_') ? payload.category.replace('_', '/') : payload.category.match(/([A-Z])/g).length > 1 ? payload.category.replace(/([A-Z])/g, ` $1`).trim() : payload.category;

  return (
    <text x={x} cx={cx} y={y} cy={cy} fill="white" textAnchor={x > cx ? 'start' : 'middle'} dominantBaseline="central" fontSize={'55%'}>
    {/* <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central"> */}
      {`${p}% ${name}`}
    </text>
  );
}

export default function LandingPagePieChart({ totalsList }) {
  return (
    <PieChart style={{margin: '0 auto'}} width={400} height={400}>
      <Pie
        data={totalsList}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={160}
        fill="#8884d8"
        dataKey="total"
      >
        {
          totalsList.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  );
}
