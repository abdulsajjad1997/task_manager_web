"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Sparkles, Loader2, X } from "lucide-react";

import { generateTasks } from "@/features/ai/aiSlice";
import { clearGeneratedPlan } from "@/features/ai/aiSlice";

export default function AITaskGenerator({ onClose, onGenerated }) {
  const dispatch = useDispatch();

  const { generating, error } = useSelector((state) => state.ai);

  const [prompt, setPrompt] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error("Please describe your goal first.");
      return;
    }

    try {
      await dispatch(generateTasks(prompt.trim())).unwrap();
      onGenerated?.();
      toast.success("Task plan generated successfully!");
    } catch (error) {
      toast.error(error || "Unable to generate tasks.");
    }
  };

  const handleClose = () => {
    dispatch(clearGeneratedPlan());
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI Task Generator
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Describe your goal and let AI create a task plan.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleGenerate}>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            What do you want to achieve?
          </label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I want to learn Node.js in 30 days, studying 2 hours daily..."
            rows={5}
            maxLength={1000}
            className="w-full resize-none rounded-xl border border-gray-300 bg-transparent p-3 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-gray-700 dark:text-white"
          />

          <div className="mt-1 text-right text-xs text-gray-400">
            {prompt.length}/1000
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={generating || !prompt.trim()}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Tasks
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
