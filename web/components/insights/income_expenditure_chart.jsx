import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import { CategoryScale, LinearScale, BarElement } from "chart.js";
Chart.register(CategoryScale, LinearScale, { bar: BarElement });

export default function IncomeSavingsExpenditureChart({ user_data }) {
  const income = user_data["income"];
  const savings = user_data["savings"];
  const get_total_expenditure = () => {
    let spendings = 0;
    Object.keys(user_data["expenditures"]).map((expenditure) => {
      spendings += user_data["expenditures"][expenditure];
    });
    return spendings;
  };

  const data = {
    labels: ["Income", "Savings", "Expenditures"],
    datasets: [
      {
        label: "Amount",
        data: [income, savings, get_total_expenditure()],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            callback: function (value, index, values) {
              return "$" + value.toLocaleString();
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Amount ($)",
          },
        },
      ],
    },
    
    legend: {
      labels: {
        fontColor: "#333",
      },
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var label = data.datasets[tooltipItem.datasetIndex].label || "";
          label += ": $" + tooltipItem.yLabel.toLocaleString();
          return label;
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
