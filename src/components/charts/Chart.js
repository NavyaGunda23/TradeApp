import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
function Chart(props) {
  const [chartData, setChartData] = useState(props.data.price);
  useEffect(() => {
    convertData()
  }, [])
  const convertData = () => {
    var rv = [];
    chartData.forEach((element, index) => {
      rv.push({ "price": element })
    });
    console.log(rv);
    setChartData(rv)
  }
  return (
    <div>
      <LineChart
        width={300}
        height={100}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <YAxis
          domain={[chartData[9].price, chartData[0].price]}
          allowDecimals={true}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="price" stroke="#82ca9d" />
      </LineChart>
    </div>
  )
}

export default Chart;