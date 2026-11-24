"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { X, Loader2, Save } from "lucide-react";

import { saveGeneratedTasks, clearGeneratedPlan } from "@/features/ai/aiSlice";
import { fetchTasks } from "@/features/tasks/taskSlice";

export default function GeneratedTaskList({ onClose }) {
  const dispatch = useDispatch();

  const { generatedPlan, saving } = useSelector((state) => state.ai);

  const [selectedTasks, setSelectedTasks] = useState([]);

  const tasks = generatedPlan?.tasks || [];

  const handleSelectTask = (index) => {
    setSelectedTasks((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index],
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map((_, index) => index));
    }
  };

  const handleSave = async () => {
    if (selectedTasks.length === 0) {
      toast.error("Please select at least one task.");
      return;
    }

    try {
      const tasksToSave = selectedTasks.map((index) => tasks[index]);

      await dispatch(saveGeneratedTasks(tasksToSave)).unwrap();

      await dispatch(fetchTasks()).unwrap();

      toast.success(`${selectedTasks.length} tasks saved successfully!`);

      dispatch(clearGeneratedPlan());
      onClose?.();
    } catch (error) {
      toast.error(error || "Unable to save tasks.");
    }
  };

  if (!generatedPlan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Generated Task Plan
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {generatedPlan.goal} · {generatedPlan.durationDays} days
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedTasks.length} of {tasks.length} selected
          </p>

          <button
            type="button"
            onClick={handleSelectAll}
            className="text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            {selectedTasks.length === tasks.length
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {tasks.map((task, index) => (
            <label
              key={index}
              className="flex cursor-pointer gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-purple-400 dark:border-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedTasks.includes(index)}
                onChange={() => handleSelectTask(index)}
                className="mt-1 h-4 w-4 accent-purple-600"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </h3>

                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                    Day {task.day}
                  </span>

                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs capitalize text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {task.priority}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {task.description}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Estimated time: {task.estimatedHours} hours
                </p>
              </div>
            </label>
          ))}
        </div>

        <div className="border-t border-gray-200 p-5 dark:border-gray-700">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || selectedTasks.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving Tasks...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Selected Tasks
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
