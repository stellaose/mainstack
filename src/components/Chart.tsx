/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Qualified } from "./Database";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const startMonth = Qualified[0].month;
  const endMonth = Qualified[Qualified.length - 1].month;
  
  const [userData, setUserData] = useState({
    labels: Qualified.map((datei) => datei.month),
    datasets: [
      {
        label: "Qualified",
        data: Qualified.map((x) => x.value),
        borderWidth: 1,
        fill: false,
        lineTension: 0,
        backgroundColor: "#FF5E13",
        borderColor: "#FF5E13",
        borderCapStyle: "butt" as const,
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter" as const,
        pointRadius: 0,
      },
    ],
  });
  


  const legendMargin = {
    id: "legendMargin",
    beforeInit: function (chart: any) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        return (this.height += 20);
      };
    },
  };

  return (
    <>
      <div>
        <Line
          data={userData}
          plugins={[legendMargin]}
          height={250}
          options={{
            maintainAspectRatio: false,
            devicePixelRatio: 1,
            animation: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                border: {
                  width: 0
                },
                grid: {
                  display: false, // Set display to false to remove y-axis grid lines
                },
                ticks: {
                  display: false, // Set display to false to remove y-axis values
                },
                title: {
                  display:false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  callback(value, index, values) {
                    // Display only the start and end month on the x-axis
                    if (value === startMonth || value === endMonth) {
                      console.log(startMonth, endMonth)
                      return value;
                    } else {
                      return ""; // Empty string to hide other tick labels
                    }
                  },
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default Chart;
