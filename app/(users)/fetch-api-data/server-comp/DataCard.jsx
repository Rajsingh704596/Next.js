//! Server Child component

const DataCard = async ({ userName }) => {
  //? Fetch data from Genderize API based on the userName
  const res = await fetch(`https://api.genderize.io/?name=${userName}`, {
    cache: "no-store", //^ Prevent caching to always get fresh result
  });

  const data = await res.json();

  console.log("Fetch data", data); //> Example output server: { name: "rohit", gender: "male", probability: 0.99, count: ... }

  //? Compute clean values
  const name = data.name?.toUpperCase() || "N/A";
  const gender = data.gender
    ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1)
    : "Unknown";
  const probability = (data.probability * 100).toFixed(2); // Rounded to 2 decimals
  const readableForm = data.count.toLocaleString() || "N/A";

  //? Determine accuracy level based on probability
  const accuracyLevel =
    probability >= 90
      ? "High Accuracy"
      : probability >= 70
      ? "Moderate Accuracy"
      : "Low Accuracy";

  const accuracyColor =
    accuracyLevel === "High Accuracy"
      ? "bg-green-100 text-green-700"
      : accuracyLevel === "Moderate Accuracy"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-200 text-red-700";

  const themeColor = gender === "Male" ? "text-blue-500" : "text-rose-400";

  //  3sec wait then return data (so we easily show loading )
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-md bg-white border border-indigo-200 hover:shadow-xl rounded-3xl p-8 space-y-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-neutral-400 text-center">
          Gender Prediction Result (Data Fetch in Sever Component)
        </h1>

        {/* Info Grid */}
        <div className={`space-y-6 ${themeColor} text-base`}>
          {/* Name Display */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">👤 Name</span>
            <span className="font-semibold">{name}</span>
          </div>

          {/* Gender Display */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">🚻 Gender</span>
            <span className="font-semibold">{gender}</span>
          </div>

          {/* Count Sample Display */}
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">📅 Data Sample Size </span>
            <span className="font-semibold">{readableForm}</span>
          </div>

          {/* Probability Display */}
          <div className="flex justify-between pb-2">
            <span className="font-medium">📊 Probability</span>
            <span className="font-semibold">{probability}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500  ${
                gender === "Male"
                  ? "bg-gradient-to-r from-blue-400 to-blue-600"
                  : "bg-gradient-to-r from-pink-400 to-pink-400"
              }  `}
              style={{ width: `${probability}%` }}
            ></div>
          </div>

          {/* Accuracy Label */}
          <div className="flex justify-center pt-4">
            <span
              className={`px-5 py-2 rounded-full text-sm font-semibold ${accuracyColor}`}
            >
              {accuracyLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
