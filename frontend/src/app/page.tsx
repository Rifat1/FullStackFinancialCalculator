"use client";

import { useState } from "react";

export default function Home() {
  const [startingValue, setStartingValue] = useState("");
  const [endingValue, setEndingValue] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    setResult(null);
    setError(null);
    try {
      const res = await fetch(
      `/api/cagr?startingValue=${startingValue}&endingValue=${endingValue}&years=${years}`
      );
      const data = await res.json();
      if (res.ok && data.cagr !== undefined) {
        setResult(data.cagr.toFixed(2) + "%");
      } else {
        setError(data.error || "Invalid input");
      }
    } catch (err) {
      setError("Unable to connect to server");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-100 shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">CAGR Calculator</h1>

        <div className="space-y-4">
          <input
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Starting Value"
            value={startingValue}
            onChange={(e) => setStartingValue(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Ending Value"
            value={endingValue}
            onChange={(e) => setEndingValue(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded text-gray-900"
            placeholder="Years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={calculate}
          >
            Calculate CAGR
          </button>

          {result && <p className="mt-4 text-green-700 font-semibold">CAGR: {result}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
