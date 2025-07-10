"use client";

import { useRouter } from "next/navigation"; //! for app-router folder useRouter() navigation import from next/navigation (Recommended New)  {(old way) for page-router for useRouter navigation import from next/router}

export default function GoBackButton() {
  const router = useRouter(); //^ Note- Only use in Client component

  const handleGoBack = () => {
    // for edge case handle
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back(); // Goes to previous page
    } else {
      router.push("/"); // Fallback to home page
    }
  };
  return (
    <button
      className="group flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700  font-medium py-2 px-6 rounded-lg  border border-gray-600 hover:border-gray-500 transition-all duration-300 transform hover:scale-105"
      onClick={handleGoBack}
    >
      <span className="relative transition duration-300 hover:text-yellow-400 before:absolute before:bottom-0 before:right-0 before:w-0 before:h-[2px] before:bg-yellow-400 hover:before:w-full before:transition-all before:duration-500 hover:scale-105 transform inline-block">
        Go Back 👈
      </span>
    </button>
  );
}
