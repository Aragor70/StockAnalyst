import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

export interface ChartPoint {
  timestamp: number;
  price: number;
}

const InvestmentChart: React.FC<{ data: ChartPoint[] }> = ({ data }) => {

  const labels = data.map((p) =>
    new Date(p.timestamp).toLocaleTimeString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit"
    })
  );

  const values = data.map((p) => p.price);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Price",
        data: values,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false }
      },
      y: {
        ticks: { display: false },
        grid: { display: false }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default InvestmentChart;