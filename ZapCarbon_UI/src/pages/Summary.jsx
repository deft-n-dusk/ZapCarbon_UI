import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../config";
import { Line, Pie } from "react-chartjs-2";
import {
  TimeScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  TimeScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  CategoryScale
);

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/summary`, {
          withCredentials: true,
        });
        console.log("Summary data:", res.data);
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching summary", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <Loader/>;
  if (!summary)
    return (
      <div className="text-center mt-10 text-red-400">
        Error loading data. Please try again later.
      </div>
    );

  const activityColors = {
    car_travel: "#5C7AEA",
    flight: "#8ECAE6",
    electricity_usage: "#FFCF56",
    natural_gas_usage: "#B5E48C",
    public_transport: "#9D75CB",
    meat_consumption: "#F6BD60",
    waste_generated: "#FFB5A7",
    water_usage: "#6EC4DB",
    bus_travel: "#7BDFF2",
    train_travel: "#A1C6EA",
    motorcycle_travel: "#B28DFF",
    lpg_usage: "#F4A259",
    coal_usage: "#C3AED6",
    paper_usage: "#FDC5F5",
    recycling: "#81C784",
  };

  
  // ✅ Prepare Emissions Over Time Data
  const validTimeData = summary.emissionsOverTime
    .filter(item => item.month && item.day && typeof item.totalEmission === "number")
    .map(item => ({
      x: new Date(2025, item.month - 1, item.day), // Assuming year = 2025
      y: item.totalEmission,
    }));

  
  

  const emissionOverTimeData = {
    datasets: [
      {
        label: "Emissions Over Time (kg CO₂e)",
        data: validTimeData,
        borderColor: "#155239",
        backgroundColor: "#a7dbc5",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const emissionOverTimeOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "dd MMM yyyy",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Emissions (kg CO₂e)",
        },
      },
    },
  };

  const emissionByTypeData = {
    labels: summary.breakdownByType.map(item => item._id.replace(/_/g, " ")),
    datasets: [
      {
        label: "Emissions (kg CO₂e)",
        data: summary.breakdownByType.map(item => item.totalEmission),
        backgroundColor: summary.breakdownByType.map(
          item => activityColors[item._id] || "#d3d3d3"
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-[#eff1e6] min-h-screen w-full">
      <Navbar />

      <div className="w-full h-full relative px-6 pt-[4.5rem]">
        <div className="bg-gradient-to-br from-[#87bc71] to-[#447c62] rounded-xl shadow-md p-6 mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Your Total Emissions</h2>
          <p className="text-4xl font-bold text-[#f0f2e7] hover:text-white transition-transform duration-500 hover:scale-[1.06]">
            {summary?.totalEmissions?.toFixed(2)} kg CO₂e
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`bg-[#bfe2b5] p-6 rounded-xl w-full transition-transform duration-500 ${
              hovered ? "scale-[1.04]" : "scale-[0.96]"
            }`}
            >
            <h2 className="text-lg font-semibold mb-4 ">
              Emission by Type
            </h2>
            {summary.breakdownByType.length === 0 ? (
              <p className="text-center text-gray-600">
                No activity submitted yet.
              </p>
            ) : (
              <div className="w-[400px] h-[400px] mx-auto transition-transform duration-500 hover:scale-[1.04]">
                <Pie data={emissionByTypeData} />
              </div>
            )}
          </div>

          <div
            className={`bg-[#bfe2b5] p-6 rounded-xl transition-transform duration-500 ${
              hovered ? "scale-[0.96]" : "hover:scale-[1.04]"
            }`}
          >
            <h2 className="text-lg font-semibold mb-4 ">Emissions Over Time</h2>
            {summary.emissionsOverTime.length === 0 ? (
              <p className="text-center text-gray-600">
                No activity submitted yet.
              </p>
            ) : (
              <Line data={emissionOverTimeData} options={emissionOverTimeOptions} className=" transition-transform duration-500 hover:scale-[1.02]"/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
