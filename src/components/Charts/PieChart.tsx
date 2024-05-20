import React, { Fragment, useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { CircularProgress } from '@mui/material';
import { getVendorSeverityCount } from '../../api/RestApi';
import { COLORS } from '../constants/Colors';

const PieChartComponent = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVendorSeverityCount(url); // Pass the URL to the API call method
        setData(response);
        setLoading(false); // Set loading to false when data is received
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]); // Include 'url' in the dependency array to re-fetch data when URL changes

  const dataWithColors = data.map((entry, index) => {
    // Ensure entry is an object
    const entryObject = typeof entry === 'object' && entry !== null ? entry : { value: entry };
    return {
      ...entryObject,
      color: COLORS[index % COLORS.length].color,
    };
  });

  return (
    <Fragment>
    <h4>Severity Count</h4>
      {loading ? (
        // Display spinner while loading
        <CircularProgress />
      ) : (
        // Display pie chart when data is loaded

          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              data={dataWithColors}
              cx={200}
              cy={200}
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {
                dataWithColors.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
      )}
    </Fragment>
  );
};

export default PieChartComponent;
