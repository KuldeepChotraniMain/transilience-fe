import React from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

const LineChartComponent = () => {
const data = [
{ name: "Jan", uv: 4000, pv: 2400,rv: 2400, amt: 2400 },
{ name: "Feb", uv: 3000, pv: 1398,rv: 2400, amt: 2210 },
{ name: "Mar", uv: 2000, pv: 9800,rv: 2400, amt: 2290 },
{ name: "Apr", uv: 2780, pv: 3908,rv: 2400, amt: 2000 },
{ name: "May", uv: 1890, pv: 4800,rv: 2400, amt: 2181 },
{ name: "Jun", uv: 2390, pv: 3800,rv: 2400, amt: 2500 }
];

return (
<LineChart width={400} height={400} data={data}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Legend />
<Line type="monotone" dataKey="pv" stroke="#b66fdd" />
<Line type="monotone" dataKey="uv" stroke="#8d46d5" />
<Line type="monotone" dataKey="rv" stroke="#2c5cc5" />
</LineChart>
);
};

export default LineChartComponent;