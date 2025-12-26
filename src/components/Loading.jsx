import { useEffect, useState } from "react";
import { useLoading } from "../context/loadingContext";
import Quotes from "../../public/Quotes";

export const LoadingScreen = (prop) => {
  const { addColor } = prop;
  const [quoteList, setQuoteList] = useState([]);
  const { isLoading } = useLoading();
  // const isLoading = true;
  
  const quote = quoteList[Math.floor(Math.random() * quoteList.length) + 1] || {
    text: "Preparing your experience...",
    author: "System"
  };

  useEffect(() => {
    // Only fetch if the screen is actually loading
    if (isLoading) {
      const fetchQuote = async () => {
        try {
          // const response = await fetch('https://coqui-server.vercel.app/api/quote');
          // if (!response.ok) throw new Error("API issue");
          // const data = await response.json();
          // setQuoteList(data);


          setQuoteList(Quotes);
        } catch (error) {
          console.log("Error: ", error.message);
          // Fallback if API fails or is sleeping
          setQuoteList([{ 
            text: "The best is yet to come.", 
            author: "Unknown" 
          }]);
        }
      };

      fetchQuote();
    }
  }, [isLoading]);

  if (!isLoading) return null;

  setTimeout(()=>{
    console.log("Doing Nothing!", 1000);
  })

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50 p-6 text-center"
      aria-modal="true"
      role="dialog"
    >
      {/* 1. The Spinner */}
      <svg
        className="w-12 h-12 text-blue-600 animate-spin mb-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      {/* 2. The Quote Section */}
      <div className="max-w-md animate-fade-in">
        <p className="text-xl italic font-medium text-gray-800 mb-2">
          "{quote.text}"
        </p>
        <p className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
          — {quote.author}
        </p>
      </div>
    </div>
  );
};