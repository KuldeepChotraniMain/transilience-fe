import { useEffect, useState, Fragment } from 'react';
import { ScatterChart, Scatter, ReferenceLine, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CircularProgress } from '@mui/material';
import { getMonthCount } from '../../api/RestApi';
import { COLORS } from '../constants/Colors';

const ScatterChartComponent = ({ url }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getMonthCount(url); // Pass the URL to the API call method

            // Check if the response is an array and contains more than 8 items
            const limitedData = Array.isArray(response) && response.length > 8
                ? response.slice(-8) // Get the last 8 items
                : response; // Use the entire response if it's less than or equal to 8 items

            setChartData(limitedData);
            setLoading(false); // Set loading to false when data is received
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, [url]); // Include 'url' in the dependency array to re-fetch data when URL changes

  return (
    <Fragment>
      <h4>Advisories Count by Month</h4>
      {loading ? (
        // Display spinner while loading
        <CircularProgress />
      ) : (
<ScatterChart
  width={500}
  height={400}
  margin={{ top: 20, right: 100, left: 20, bottom: 35 }}  // Adjusted bottom margin for labels
>
  <XAxis
    tickLine={false}
    dataKey="month"
    type="category"
    angle={90}
    textAnchor="start"
    interval={0}  // Ensures all labels are shown
  />
  <YAxis tickLine={false} dataKey="count" type="number" />
  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
  <Legend layout="vertical" verticalAlign="top" align="right" />
  <Scatter data={chartData} fill={COLORS[0].color} />
  <ReferenceLine y={0} stroke="#000" />
  <ReferenceLine x={0} stroke="#000" />
</ScatterChart>

      )}
    </Fragment>
  );
};
export default ScatterChartComponent;