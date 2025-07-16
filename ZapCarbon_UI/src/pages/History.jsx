import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const History = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // You can change this

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:2707/api/activities/history?page=${page}&limit=${limit}`,
          { withCredentials: true }
        );
        setActivities(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching activity history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  return (
    <div className="bg-[#cde3c7] min-h-screen w-full pb-[4rem] ">
      <Navbar />
      <div className="pt-[4.5rem] px-4">
        <h1 className="text-3xl font-semibold mb-6 text-[#2f3e46] text-center">
          Your Activity History
        </h1>

        {activities.length === 0 && loading ? (
          <p className="text-gray-600 text-lg text-center">Loading activities...</p>
        ) : activities.length === 0 ? (
          <p className="text-gray-600 text-lg text-center">No activity history found.</p>
        ) : (
          <>
            <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl bg-gradient-to-br h-[29rem] from-[#a1dbb2] to-[#4d9f7b] shadow-lg p-6">
              <table className="w-full text-sm text-left text-[#2f3e46]">
                <thead className="text-xs uppercase bg-[#d3f3df] text-[#2f3e46] rounded-md">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Activity</th>
                    <th className="py-3 px-4">Input</th>
                    <th className="py-3 px-4">Emission</th>
                    <th className="py-3 px-4">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr
                      key={activity._id}
                      className="border-b border-[#cceadf] hover:bg-[#eaf9f0] transition"
                    >
                      <td className="py-2 px-4">
                        {activity.date
                          ? new Date(activity.date).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4 capitalize">
                        {(activity.type ?? "unknown").replace(/_/g, " ")}
                      </td>
                      <td className="py-2 px-4">
                        {typeof activity.inputData === "object"
                          ? Object.entries(activity.inputData)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")
                          : activity.inputData ?? "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {typeof activity.emission === "number"
                          ? activity.emission.toFixed(2)
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4">{activity.unit ?? "kg CO2e"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-md bg-[#4d9f7b] text-white hover:bg-[#3e8466] disabled:opacity-50 transition"
              >
                Previous
              </button>
              <span className="text-[#2f3e46] font-medium">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-md bg-[#4d9f7b] text-white hover:bg-[#3e8466] disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default History;
