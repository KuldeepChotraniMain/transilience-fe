import React, { Fragment, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CircularProgress } from '@mui/material';
import { getVendorCount, getVendorSeverityCount } from "../../api/RestApi";
import { COLORS } from "../constants/Colors";

const BarChartVerticalComponent = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVendorCount(url); // Pass the URL to the API call method
        setData(response);
        setLoading(false); // Set loading to false when data is received
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]); // Include 'url' in the dependency array to re-fetch data when URL changes

  console.log(data);

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
    <h4>Vendor Count</h4>
      {loading ? (
        // Display spinner while loading
        <CircularProgress />
      ) : (
        // Display chart when data is loaded
        <BarChart width={400} height={400} data={dataWithColors}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      )}
    </Fragment>
  );
};

export default BarChartVerticalComponent;
