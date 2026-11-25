"use client";

import { useState } from "react";
import Link from "next/link";

import { CheckSquare, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

import api from "@/lib/axios";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post("/users/forgot-password", {
        email: email.trim().toLowerCase(),
      });

      setMessage(
        response.data.message ||
          "If an account exists with this email, a password reset link has been sent.",
      );
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-background px-4 py-8 sm:py-10">
      {/* Theme Toggle */}
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-lg sm:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-xl bg-primary/10 p-3">
              <CheckSquare size={32} className="text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold">Forgot Password?</h1>

          <p className="mt-2 text-sm text-muted">
            No worries! Enter your registered email address and we will send you
            a password reset link.
          </p>
        </div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-danger/20 bg-danger/10 p-3 text-sm text-danger"
            >
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Success */}
          {message && (
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm text-primary"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <p>{message}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-center text-sm text-muted">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}
