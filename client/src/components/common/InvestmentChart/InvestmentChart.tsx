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

interface InvestmentChartProps {
  history: number[]; // np. [10000, 10500, 11000, 11500, 12000, 12450]
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ history }) => {
  const labels = ["1", "2", "3", "4", "5", "6"]; // miesiące / okresy

  const data = {
    labels,
    datasets: [
      {
        label: "Wartość inwestycji",
        data: history,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: { beginAtZero: false }
    }
  };

  return <Line data={data} options={options} />;
};

export default InvestmentChart;