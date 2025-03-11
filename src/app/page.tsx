"use client";
import { useState } from "react";
import { fetchIssues } from "../../lib/github";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

interface Issue {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  user: { login: string };
}

export default function Home() {
  const [language, setLanguage] = useState("JavaScript");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleFetchIssues = async (reset: boolean = false) => {
    setLoading(true);
    const newPage = reset ? 1 : page;
    const data = await fetchIssues(language, newPage);

    setIssues(reset ? data : [...issues, ...data]); // Append if not reset
    setPage(newPage + 1);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#5e5d5c]">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white">
          Open Source Contributor Hub
        </h1>
        <p className="text-white text-center mt-2">
          Find beginner-friendly open-source issues.
        </p>

        {/* Language Input */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-3 w-full text-black sm:w-80 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Enter programming language (e.g., JavaScript, Python)"
          />
          <button
            onClick={() => handleFetchIssues(true)} // Reset page count
            className="bg-green-500 text-white px-6 py-3 rounded shadow-md hover:bg-green-600 transition cursor-pointer"
          >
            Find Issues
          </button>
        </div>

        {/* Issue Cards Grid */}
        <motion.ul
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {issues.map((issue) => (
            <motion.li
              key={issue.id}
              className="border p-5 rounded-lg shadow-md bg-white hover:shadow-lg transition transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold text-lg block truncate"
              >
                {issue.title}
              </a>
              <p className="text-gray-600 text-sm mt-2">
                Repo:{" "}
                <span className="font-medium">
                  {issue.repository_url.split("/").slice(-1)[0]}
                </span>
              </p>
              <p className="text-gray-600 text-sm">
                User: <span className="font-medium">{issue.user.login}</span>
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handleFetchIssues()}
            className={`bg-blue-500 text-white px-6 py-3 rounded cursor-pointer shadow-md hover:bg-blue-600 transition ${
              loading ? "animate-pulse" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
}
