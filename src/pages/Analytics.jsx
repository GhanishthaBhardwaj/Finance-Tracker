import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Analytics({ expenses = [] }) {
  const [currency, setCurrency] = useState("INR");
  const [rate, setRate] = useState(1);

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/INR")
      .then(res => res.json())
      .then(data => setRate(data?.rates?.USD || 1))
      .catch(() => setRate(1));
  }, []);

  const convert = (amount) =>
    currency === "USD"
      ? Number((amount * rate).toFixed(2))
      : amount;

  if (!expenses || expenses.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="text-center bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">📊 No Data Yet</h2>
          <p className="text-gray-500 text-sm">
            Add expenses to unlock analytics 🚀
          </p>
        </div>
      </div>
    );
  }

  const categoryData = {};
  const paymentData = {};
  const dateData = {};

  expenses.forEach(e => {
    categoryData[e.category || "Other"] =
      (categoryData[e.category || "Other"] || 0) + e.amount;

    paymentData[e.payment || "Other"] =
      (paymentData[e.payment || "Other"] || 0) + e.amount;

    const d = e.date || "Unknown";
    dateData[d] = (dateData[d] || 0) + e.amount;
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6B7280",
          font: { size: 12 }
        }
      }
    }
  };

  return (
    <div className="w-full px-10 py-12 space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
            📊 Analytics Overview
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Visualize your spending insights
          </p>
        </div>

        {/* CURRENCY */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {["INR", "USD"].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-1 rounded-md text-sm font-medium transition ${
                currency === c
                  ? "bg-[#4F8CFF] text-white shadow-sm"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-2 gap-6">

        {/* CATEGORY */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition h-[320px]">
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            🍔 Category Breakdown
          </h3>

          <Doughnut
            data={{
              labels: Object.keys(categoryData),
              datasets: [{
                data: Object.values(categoryData).map(convert),
                backgroundColor: [
                  "#4F8CFF",
                  "#6EA8FE",
                  "#A5C8FF",
                  "#D6E6FF"
                ],
                borderWidth: 0
              }]
            }}
            options={chartOptions}
          />
        </div>

        {/* PAYMENT */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition h-[320px]">
          <h3 className="text-sm font-medium text-gray-600 mb-3">
            💳 Payment Methods
          </h3>

          <Doughnut
            data={{
              labels: Object.keys(paymentData),
              datasets: [{
                data: Object.values(paymentData).map(convert),
                backgroundColor: [
                  "#6366F1",
                  "#8B5CF6",
                  "#EC4899",
                  "#F59E0B"
                ],
                borderWidth: 0
              }]
            }}
            options={chartOptions}
          />
        </div>
      </div>

      {/* ROW 2 */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition h-[350px]">
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          📅 Daily Spending Trend
        </h3>

        <Bar
          data={{
            labels: Object.keys(dateData),
            datasets: [{
              label: `Spending (${currency})`,
              data: Object.values(dateData).map(convert),

              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, "#4F8CFF");
                gradient.addColorStop(1, "#A5C8FF");
                return gradient;
              },

              borderRadius: 10
            }]
          }}
          options={chartOptions}
        />
      </div>

    </div>
  );
}

export default Analytics;