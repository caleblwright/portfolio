import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

export default function ForeclosureProject() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Caleb's Portfolio | Foreclosure Scraper";
  }, []);

  const handleRunScraper = async () => {
    setLoading(true);
    setError(null);
    setDownloadUrl(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        "https://6vc1ndwzie.execute-api.us-east-2.amazonaws.com/PROD/scrapeBrockAndScottNC",
        {
          method: "POST",
          headers: { "x-api-key": apiKey },
        }
      );

      if (!response.ok) throw new Error("Scraper failed or timed out.");

      const result = await response.json();
      setDownloadUrl(result.body);
    } catch (err: any) {
      setError(err.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="mb-4 text-2xl font-bold text-blue-700">
        Foreclosure Scraper
      </h1>
      <h2 className="text-gray-700 mb-4">
        Welcome back, <span className="font-semibold">{user?.email}</span>!
      </h2>
      <p className="mb-6 text-gray-600">
        Click the button below to run the foreclosure data scraper for North
        Carolina.
      </p>

      <button
        onClick={handleRunScraper}
        disabled={loading}
        className="px-4 py-2 mb-4 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Scraping..." : "Run Scraper"}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Download Excel File
        </a>
      )}

      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}
