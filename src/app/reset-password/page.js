"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  CheckSquare,
  Eye,
  EyeOff,
  LockKeyhole,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import api from "@/lib/axios";
import ThemeToggle from "@/components/layout/ThemeToggle";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password.length < 7) {
      setError("Password must be at least 7 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/users/reset-password", {
        token,
        password,
      });

      setMessage(
        response.data.message || "Your password has been reset successfully.",
      );

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to reset password. Please try again.",
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

          <h1 className="text-2xl font-bold">Reset Password</h1>

          <p className="mt-2 text-sm text-muted">
            Create a new password for your account.
          </p>
        </div>

        {!token ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-danger/20 bg-danger/10 p-3 text-sm text-danger"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>Invalid or missing reset token. Please request a new link.</p>
          </div>
        ) : message ? (
          <div className="space-y-5">
            <div
              role="status"
              className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm text-primary"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <p>{message}</p>
            </div>

            <Link
              href="/login"
              className="block w-full rounded-lg bg-primary px-4 py-3 text-center font-medium text-primary-foreground transition hover:opacity-90"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            {/* Reset Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  New Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    minLength={7}
                    required
                    className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted transition hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-muted">
                  Password must contain at least 7 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />

                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    minLength={7}
                    required
                    className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-12 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted transition hover:text-foreground"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Reset Password"}
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
          </>
        )}
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center bg-background">
          <p className="text-sm text-muted">Loading...</p>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
