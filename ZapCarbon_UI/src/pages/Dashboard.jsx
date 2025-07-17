import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard_image from "../assets/Dashboard_image.png"
import CarbonStatsCard from "../components/CarbonStatsCard";
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import Loader from "../components/Loader";
import { BASE_URL } from '../config';



function Dashboard() {

  const [activityTypes, setActivityTypes] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [inputData, setInputData] = useState("");
  const [emissionResult, setEmissionResult] = useState(null);
  const [error, setError] = useState("");



 

  // Fetch activity types on load
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/activities/types`)
      .then((res) => setActivityTypes(res.data))
      .catch((err) => setError("Failed to load activity types."));
  }, []);

 const {user, loading} = useAuth();
if (loading) return <Loader/>
  
  const handleSubmit = async () => {
    const selected = activityTypes.find(a => a.type === selectedActivity);

    if (!selected) return setError("Please select a valid activity.");

    const value = Number(inputData);
    if (!value || isNaN(value)) return setError("Please enter a valid number.");

    try {
     const res = await axios.post(
      `${BASE_URL}/api/activities/add`,
      {
        type: selectedActivity,
        inputData: { [selected.field]: value }
      },
      { withCredentials: true }
    );

      // ⬇️ Extract emission from response
      setEmissionResult({
        emission: res.data.activity.emission,
        type: res.data.activity.type
      });

      
      setError("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setEmissionResult(null);
      setError(err.response?.data?.error || "Failed to add activity.");
    }
  };


  const handleReset = () => {
  setSelectedActivity("");
  setInputData("");
  setEmissionResult(null);
  setError("");
};


  


return (
  <div className="bg-[#eff1e6] min-h-screen w-full">
    <Navbar className="mb-3" />

    {/* Responsive layout container */}
    <div className="w-full h-full flex flex-col md:relative items-center md:items-start pb-[3rem] md:pb-0 px-4 md:px-0">

      {/* Image */}
      <div className="w-full md:w-auto md:absolute md:right-0 md:top-0 z-10 flex justify-center">
        <img
          className="w-full max-w-[34.2rem]"
          src={Dashboard_image}
          alt=""
        />
      </div>

      {/* Activity Selector */}
      <div className="mt-5 md:mt-[5rem] md:ml-24 z-20 transition-transform duration-500 hover:scale-[1.04] w-full max-w-[45rem]">
        <h1 className="bg-[#bfe2b5] w-full h-[4rem] rounded-xl text-[1.1rem] md:text-[1.3rem] font-serif text-center pt-4 text-slate-700">
          Welcome {user.firstName}, Select your Activity
        </h1>

        <select
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
          className={`p-2 w-full bg-[#e2eedf] h-[3rem] rounded-md  placeholder-slate-600 ${
            selectedActivity === '' ? 'text-slate-600' : 'text-black'
          } focus:outline-none focus:ring-0 focus:border-none`}
        >
          <option value="" className="text-slate-500">
            Your Activity
          </option>
          {activityTypes.map((activity) => (
            <option key={activity.type} value={activity.type}>
              {activity.label}
            </option>
          ))}
        </select>
      </div>

      {/* Input value */}
      <div className="mt-4 md:mt-[1.5rem] md:ml-24 transition-transform duration-500 hover:scale-[1.04] w-full max-w-[45rem]">
        <input
          type="number"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="border p-2 w-full bg-[#e2eedf] h-[3rem] rounded-xl border-[#409576] placeholder-slate-600 focus:outline-none focus:ring-0"
          placeholder={
            selectedActivity
              ? `Enter value in ${
                  activityTypes.find((a) => a.type === selectedActivity)?.field || ''
                }`
              : 'Enter value'
          }
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-[#82b884] text-black font-semibold px-6 py-3 mt-3 md:mt-[1.5rem] md:ml-[25rem] rounded transition-transform duration-500 hover:scale-[1.05] hover:bg-[#126d50] hover:text-white"
      >
        Submit
      </button>

      {/* Carbon Stats Card */}
      <div className="mt-6 md:mt-[1.8rem] md:ml-[10.5rem] w-full max-w-[45rem]">
        {emissionResult ? (
          <CarbonStatsCard
            emission={emissionResult.emission}
            activityType={emissionResult.type}
            onReset={handleReset}
          />
        ) : (
          <CarbonStatsCard
            emission={0}
            activityType="No activity yet"
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  </div>
);


}

export default Dashboard