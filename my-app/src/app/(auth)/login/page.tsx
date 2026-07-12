"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    // Handle mock login success
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-950 px-6 py-12 relative overflow-hidden font-sans">
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-yellow-600/5 blur-3xl" />
      
      {/* Content Card */}
      <div className="relative w-full max-w-md bg-stone-900 border border-amber-500/10 p-10 rounded-2xl shadow-2xl backdrop-blur-md">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
            <div className="text-left">
              <h2 className="text-xl font-bold tracking-wide text-white leading-tight">Ziad Al-Shakhshir</h2>
              <span className="block text-[10px] tracking-[0.2em] font-semibold text-amber-500 uppercase">Furniture</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mt-8 tracking-tight">Welcome Back</h1>
          <p className="text-sm text-neutral-400 mt-2">Sign in to your premium client account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700/50 rounded-xl text-white text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300" htmlFor="login-password">
                Password
              </label>
              <a href="#" className="text-xs text-amber-500 hover:text-amber-400 transition font-medium">
                Forgot Password?
              </a>
            </div>
            <input
              id="login-password"
              type="password"
              className="w-full px-4 py-3 bg-stone-800 border border-stone-700/50 rounded-xl text-white text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 rounded border-stone-700 bg-stone-850 text-amber-500 focus:ring-amber-500/20"
            />
            <label htmlFor="remember-me" className="ml-2 text-xs text-neutral-300 cursor-pointer">
              Remember my session
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold rounded-xl text-sm transition tracking-wider uppercase shadow-lg shadow-amber-500/10"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center border-t border-stone-800 pt-6">
          <p className="text-xs text-neutral-400">
            Don&apos;t have an account?{" "}
            <Link href="/contact" className="text-amber-500 hover:text-amber-400 font-bold transition">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
