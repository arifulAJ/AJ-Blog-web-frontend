"use client";
import React from "react";

const GlobalError = ({ error, reset }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-4xl text-red-600 mb-8">Error: {error.message}</h2>
        <div className="space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => reset()}
          >
            Try Again Later
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;
