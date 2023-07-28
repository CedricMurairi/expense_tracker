import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { useSelector } from "react-redux";
import formatNumber from "@helpers/format_number";

Chart.register(CategoryScale, LinearScale, BarElement);

export default function IncomeSavingsExpenditureChart({
  expenditures,
  currency,
}) {
  const stateData = useSelector((state) => state.data.value);
  const expenses = expenditures?.reduce((acc, cur) => {
    return acc + Number.parseInt(cur.data.amount);
  }, 0);

  let intended_savings = 0;

  if (!stateData?.goals || stateData?.goals.length === 0) {
    console.log("No goals");
  }
  else {
    intended_savings = stateData?.goals?.reduce((acc, cur) => {
      if (cur.data.installments) {
        const currentInstallment = cur.data.payments.find(
          (installment) =>
            installment.paymentDue === new Date().getMonth()
        );
        if (currentInstallment !== undefined) {
          return acc + Number.parseInt(currentInstallment.amountPaid);
        }
      }
      return acc + Number.parseInt(cur.data.amount);
    }, 0);
  }

  const data = {
    labels: ["Income", "Savings", "Expenses"],
    datasets: [
      {
        label: "Amount",
        // TODO: Fix this | Use the data from the state to populate the chart [Income, Savings][To change when month changes]
        data: [stateData?.settings?.income?.amount, intended_savings, expenses],
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
            return `${currency || ""} ` + formatNumber(value);
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
