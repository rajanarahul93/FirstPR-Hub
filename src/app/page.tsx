"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { fetchIssues } from "../../lib/github";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";

interface Issue {
  id: number;
  title: string;
  html_url: string;
  repository_url: string;
  user: { login: string } | null; // Allow null values
}

export default function Home() {
  const [language, setLanguage] = useState("JavaScript");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [user, router]);

  const handleFetchIssues = async (reset: boolean = false) => {
    setLoading(true);
    const newPage = reset ? 1 : page;
    const data = await fetchIssues(language, newPage);

    setIssues(reset ? data : [...issues, ...data]); // Append if not reset
    setPage(newPage + 1);
    setLoading(false);
  };

  if (!user) {
    return (
      <p className="text-center text-white mt-10">Redirecting to login...</p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-[#5e5d5c] to-gray-900 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg viewBox=%220 0 2000 1500%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3ClinearGradient id=%22a%22 gradientUnits=%22userSpaceOnUse%22 x1=%22-23%22 y1=%22-15%22 x2=%222023%22 y2=%221485%22%3E%3Cstop offset=%220%22 stop-color=%22%23ffffff%22/%3E%3Cstop offset=%221%22 stop-color=%22%23ffffff%22/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill=%22url(%23a)%22 d=%22M0 0h2000v1500H0z%22/%3E%3Cpath d=%22M0 0v1500h2000V0zm1000 750l-500 250 500-250 500 250z%22 fill-opacity=%22.05%22/%3E%3C/svg%3E')] opacity-10"></div>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto relative z-10">
        <motion.h1
          className="text-5xl font-bold text-center text-white mb-4 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Open Source Contributor Hub
        </motion.h1>
        <motion.p
          className="text-gray-300 text-center mt-2 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find beginner-friendly open-source issues.
        </motion.p>

        {/* Language Input */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border p-4 w-full text-black sm:w-96 rounded-lg shadow-lg focus:ring-4 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 bg-white/90 backdrop-blur-sm"
            placeholder="Enter programming language (e.g., JavaScript, Python)"
          />
          <button
            onClick={() => handleFetchIssues(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 font-medium cursor-pointer"
          >
            Find Issues
          </button>
        </motion.div>

        {/* Issue Cards Grid */}
        <motion.ul
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {issues.map((issue, index) => (
            <motion.li
              key={issue.id}
              className="border border-gray-200/20 p-6 rounded-xl shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold text-lg block truncate hover:text-blue-800 transition-colors duration-200"
              >
                {issue.title}
              </a>
              <p className="text-gray-600 text-sm mt-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM5.904 9.304a.75.75 0 011.392-.608A3.5 3.5 0 0110 11.5a3.5 3.5 0 012.704-2.804.75.75 0 011.392.608A5 5 0 0110 13a5 5 0 01-4.096-3.696z"
                    clipRule="evenodd"
                  />
                </svg>
                Repo:{" "}
                <span className="font-medium">
                  {issue.repository_url.split("/").slice(-1)[0]}
                </span>
              </p>
              <p className="text-gray-600 text-sm mt-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                User:{" "}
                <span className="font-medium">
                  {issue.user?.login ?? "Unknown"}
                </span>
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* Load More Button */}
        <motion.div
          className="flex justify-center mt-12 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={() => handleFetchIssues()}
            className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 font-medium ${
              loading ? "animate-pulse" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-3">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                Loading...
              </div>
            ) : (
              "Load More"
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
