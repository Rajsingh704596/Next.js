//! FetchApi Data in React Client Component -  {when hit url http://localhost:3000/fetch-api-data/client-comp?name=rohit}
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, use } from "react";

//* Here In Client Component first we get URL query string(?name=...) using  (1st way)useSearchParams() /(2nd way)searchParams,
//* and pass it into the Genderize API to show name, gender, and probability

const DataFetchClient = (props) => {
  const [userData, setUserData] = useState({});

  //? 1 st way- Recommend way [useSearchParams() hook method of next js for get url query string in client component]
  const userName = useSearchParams().get("name");

  //? 2 nd way - [react useApi hook handle Promise of props.searchParams , searchParams get url query string]
  // const userName = use(props.searchParams).name; // it's return promise

  //^ Handle case where no name is provided
  // !userName will handle: undefined, null, "", false, 0
  // .trim() removes spaces from both sides and checks for empty string
  if (!userName || userName.trim() === "") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-100 to-indigo-200">
        <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl shadow-lg p-8 text-center max-w-md w-full text-gray-800">
          <h1 className="text-2xl font-bold mb-4">No Name Provided</h1>
          <p>
            Please add <code>?name=yourname</code> to the URL
          </p>
        </div>
      </div>
    );
  }

  //? API Call Function
  const fetchApiData = async () => {
    try {
      const res = await fetch(`https://api.genderize.io/?name=${userName}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("API fetch failed");

      const data = await res.json();
      console.log("Fetched Data:", data);
      setUserData(data);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  //^ Fetch data when userName changes
  useEffect(() => {
    if (userName) {
      fetchApiData();
    }
  }, [userName]);

  //^ Show loading state
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  //? Compute display values
  //todo we get any undefined value at first time b/c React (especially in dev. mode), components often run twice due to Strict Mode, which is enabled by default in Next.js client component for development  so prevent this fallback we use { OR operator where we pass Null / "N/A" }
  const name = userData?.name?.toUpperCase() || "N/A"; //if (!userData.name) return null;
  const gender = userData?.gender
    ? userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)
    : "Unknown";
  const probability = userData?.probability
    ? (userData?.probability * 100).toFixed(2)
    : "0.00";
  const readableForm = userData?.count?.toLocaleString() || "N/A" || null;

  //? UI conditional styles
  const accuracyLevel =
    probability >= 90
      ? "High Accuracy"
      : probability >= 70
      ? "Moderate Accuracy"
      : "Low Accuracy";

  const accuracyColor =
    accuracyLevel === "High Accuracy"
      ? "bg-green-300 text-green-600"
      : accuracyLevel === "Moderate Accuracy"
      ? "bg-yellow-300 text-yellow-600"
      : "bg-red-300 text-red-600";

  const themeColor = gender === "Male" ? "text-blue-500" : "text-pink-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-700 via-purple-700 to-sky-700 px-4">
      <div className="w-full max-w-md rounded-[2rem] p-8 space-y-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:shadow-[0_0_40px_0_rgba(255,255,255,0.2)] transition duration-500 ease-in-out">
        {/* Heading */}
        <h1 className="text-2xl font-extrabold text-center text-white drop-shadow-md tracking-wide">
          ✨ Gender Prediction Result (Fetch Api Data in Client Component)
        </h1>

        {/* Info Grid */}
        <div className={`space-y-6 ${themeColor} text-base`}>
          {/* Name Display */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <span className="text-white/80 font-medium flex items-center gap-1">
              👤 Name
            </span>
            <span className="font-bold tracking-wider text-white">{name}</span>
          </div>

          {/* Gender Display */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <span className="text-white/80 font-medium flex items-center gap-1">
              🚻 Gender
            </span>
            <span className="font-bold text-white">{gender}</span>
          </div>

          {/* Count Sample Display */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <span className="text-white/80 font-medium flex items-center gap-1">
              📅 Sample Size
            </span>
            <span className="font-bold text-white">{readableForm}</span>
          </div>

          {/* Probability Display */}
          <div className="flex justify-between items-center pb-2">
            <span className="text-white/80 font-medium flex items-center gap-1">
              📊 Probability
            </span>
            <span className="font-bold text-white">{probability}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/40 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                gender === "Male"
                  ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700"
                  : "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700"
              }`}
              style={{ width: `${probability}%` }}
            ></div>
          </div>

          {/* Accuracy Badge */}
          <div className="flex justify-center pt-4">
            <span
              className={`px-6 py-2 rounded-full text-sm font-semibold border border-white/30 backdrop-blur-md shadow-md ${accuracyColor}`}
            >
              {accuracyLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFetchClient;
