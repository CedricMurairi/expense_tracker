import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useSelector } from "react-redux";
import formatNumber from "@helpers/format_number";

Chart.register(CategoryScale, LinearScale, BarElement);

export default function IncomeSavingsExpenditureChart({ expenditures }) {
  // const stateData = useSelector((state) => state.data.value);
  const expenses = expenditures?.reduce((acc, cur) => {
    return acc + Number.parseInt(cur.data.amount);
  }, 0);

  const data = {
    labels: ["Income", "Savings", "Expenses"],
    datasets: [
      {
        label: "Amount",
        // TODO: Fix this | Use the data from the state to populate the chart [Income, Savings][To change when month changes]
        data: [2000000, 800000, expenses],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return "RWF " + formatNumber(value);
          },
        },
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            label += ": $" + context.parsed.y.toLocaleString();
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
