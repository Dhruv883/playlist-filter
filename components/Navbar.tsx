"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className="bg-black text-white flex justify-between items-center px-8 h-1/6">
      <a href="/" className="text-lg sm:text-3xl font-medium tracking-wide">
        Spoti-Filter
      </a>

      {!token ? (
        <Link
          href="/login"
          className="sm:text-lg border-2 border-white px-3 sm:px-6 py-1 rounded-md flex items-center justify-center bg-white text-black hover:bg-white/85"
        >
          Sign in
        </Link>
      ) : (
        <button
          className="sm:text-lg border-2 border-white px-3 sm:px-6 py-1 rounded-md flex items-center justify-center bg-white text-black hover:bg-white/85"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Navbar;
