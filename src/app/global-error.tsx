"use client";

import Image from "next/image";
import "./globals.css";

export default function GlobalError() {
  return (
    <html className="bg-black h-full w-full">
      <body className="bg-black text-white h-screen w-full flex flex-col items-center justify-center relative">
        <div className="flex flex-col items-center p-8 rounded-xl shadow-2xl max-w-md mx-auto">
          <div className="relative w-full mb-6">
            <Image
              src="/error-404.webp"
              alt="Person with magnifying glass"
              width={300}
              height={300}
              className="object-contain mx-auto"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-4 text-white">
            Page Not Found
          </h2>

          <p className="text-gray-400 text-center mb-8">
            The page you are looking for might have been removed or is
            temporarily unavailable.
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 bg-white text-center text-black w-24 h-9 text-xs font-semibold rounded-lg  flex items-center"
            >
              <svg
                className="w-3 h-3 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Refresh
            </button>

            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="px-3 bg-neutral-800 text-center text-white w-32 h-10 text-xs font-semibold rounded-lg flex items-center"
            >
              <svg
                className="w-3 h-3 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7m-7-7v18"
                ></path>
              </svg>
              Go Dashboard
            </button>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} • All rights reserved
        </div>
      </body>
    </html>
  );
}
