//! not-found.jsx File :- root folder of error page that appear automatic when hit wrong path/url in browser

import GoBackButton from "@/Components/GoBackButton";
import Link from "next/link";

export default function notFoundPage() {
  return (
    <section className="min-h-screen flex justify-center items-center bg-black ">
      <div className="mx-auto max-w-lg w-full text-center p-10">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
            404
          </h1>
          <div className="w-40 h-1 bg-gradient-to-br from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          The page you are looking for doesn't exist or has been moved to
          another location.
        </p>
        {/* Action Button */}
        <div className="flex flex-col sm:flex-row  gap-6 justify-center mt-10">
          <button className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-400 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            <Link href="/">
              <span className="relative transition duration-300 hover:text-yellow-400 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-yellow-400 hover:before:w-full before:transition-all before:duration-500 hover:scale-105 transform inline-block">
                Go to Home 🏠
              </span>
            </Link>
          </button>
          <GoBackButton />
          {/*GoBackButton use only Client Component because of useRouter() */}
        </div>
      </div>
    </section>
  );
}
