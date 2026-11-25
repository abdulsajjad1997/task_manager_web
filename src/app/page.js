import Link from "next/link";
import ThemeToggle from "@/components/layout/ThemeToggle";

import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Target,
  CalendarDays,
  BrainCircuit,
  ListChecks,
  Zap,
  Clock3,
  Flag,
  WandSparkles,
} from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-Powered Task Generation",
    description:
      "Describe your goal and let AI create a structured, actionable task plan for you.",
  },
  {
    icon: ClipboardList,
    title: "Smart Task Management",
    description:
      "Create, update, organize, and manage all your tasks from one dashboard.",
  },
  {
    icon: Flag,
    title: "Priority Management",
    description:
      "Keep important work in focus with task priorities and organized workflows.",
  },
  {
    icon: CalendarDays,
    title: "Deadline Tracking",
    description:
      "Stay aware of your schedules and manage tasks according to your deadlines.",
  },
];

const workflow = [
  {
    number: "01",
    icon: Target,
    title: "Describe Your Goal",
    description:
      "Tell AI what you want to achieve and how much time you can dedicate.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Generate Your Plan",
    description:
      "AI breaks your goal into specific tasks with priorities and estimated time.",
  },
  {
    number: "03",
    icon: ListChecks,
    title: "Track Your Progress",
    description:
      "Manage your generated tasks and monitor your progress from one place.",
  },
];

const previewTasks = [
  {
    title: "Understand React fundamentals",
    priority: "High",
    completed: true,
  },
  {
    title: "Build reusable components",
    priority: "Medium",
    completed: false,
  },
  {
    title: "Practice API integration",
    priority: "High",
    completed: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CheckCircle2 size={21} />
            </div>

            <span className="text-xl font-bold tracking-tight">TaskFlow</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted sm:px-4"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:px-4"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-10 -z-0 size-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles size={16} />
            AI-Powered Task Management
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Turn your goals into
            <span className="mt-2 block text-primary">
              actionable tasks with AI.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Stop wondering where to start. Describe what you want to achieve,
            let AI create a structured task plan, and manage your progress with
            TaskFlow.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start Planning with AI
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-border px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" />
              AI-generated task plans
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" />
              Smart task organization
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-primary" />
              Progress tracking
            </span>
          </div>

          {/* AI Dashboard Preview */}
          <div className="mx-auto mt-20 max-w-5xl rounded-2xl border border-border bg-card p-3 shadow-2xl sm:p-5">
            <div className="rounded-xl border border-border bg-background p-4 text-left sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">AI Workspace</p>

                  <h2 className="mt-1 text-xl font-bold">Your Learning Plan</h2>
                </div>

                <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                  <Sparkles size={14} />
                  AI Generated Plan
                </span>
              </div>

              {/* Goal Input Preview */}
              <div className="mt-7 rounded-xl border border-border bg-muted/20 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <WandSparkles size={18} className="text-primary" />
                  Your Goal
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  I want to learn React and build projects over the next 30
                  days, dedicating 2 hours every day.
                </p>

                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                    <Sparkles size={14} />
                    Generate with AI
                  </span>
                </div>
              </div>

              {/* Plan Overview */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold">Generated Tasks</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    A structured plan to achieve your goal
                  </p>
                </div>

                <span className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-muted-foreground">
                  30 Days Plan
                </span>
              </div>

              {/* Task Stats */}
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  { label: "Total Tasks", value: "30" },
                  { label: "Completed", value: "12" },
                  { label: "Remaining", value: "18" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border bg-muted/30 p-3 sm:p-5"
                  >
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {item.label}
                    </p>

                    <p className="mt-2 text-2xl font-bold sm:text-3xl">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Task List */}
              <div className="mt-6 space-y-3">
                {previewTasks.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 sm:p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <CheckCircle2
                        size={19}
                        className={
                          task.completed
                            ? "shrink-0 text-primary"
                            : "shrink-0 text-muted-foreground"
                        }
                      />

                      <span
                        className={
                          task.completed
                            ? "truncate text-sm text-muted-foreground line-through"
                            : "truncate text-sm font-medium"
                        }
                      >
                        {task.title}
                      </span>
                    </div>

                    <span
                      className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${
                        task.priority === "High"
                          ? "bg-danger/10 text-danger"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Illustrative AI workspace preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/20 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Powerful Features
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Work smarter with AI and TaskFlow
            </h2>

            <p className="mt-4 text-muted-foreground">
              From turning ideas into actionable plans to tracking your daily
              work, everything stays organized in one place.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 font-semibold">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From goal to action in three steps
            </h2>

            <p className="mt-4 text-muted-foreground">
              A simpler way to plan your work and make consistent progress.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {workflow.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-border bg-card p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={24} />
                    </div>

                    <span className="text-3xl font-bold text-primary/20">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Productivity Section */}
      <section className="border-t border-border bg-muted/20 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Built for Productivity
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Spend less time planning. More time doing.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Big goals can feel overwhelming when you do not know where to
              begin. TaskFlow helps break them into manageable tasks so you can
              focus on taking the next step.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap size={23} />
              </div>

              <h3 className="mt-5 font-semibold">AI Assistance</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Turn your goals into structured task plans.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 sm:mt-10">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 size={23} />
              </div>

              <h3 className="mt-5 font-semibold">Time Management</h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Plan your work around your available time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
          <div className="mb-5 flex justify-center">
            <div className="rounded-2xl bg-primary-foreground/10 p-3">
              <Sparkles size={30} />
            </div>
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Your next goal starts here.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 opacity-90 sm:text-base">
            Let AI help you plan your work. Create your account and start
            turning your goals into actionable tasks.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-background px-6 py-3 font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            Start Planning with AI
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CheckCircle2 size={18} className="text-primary" />
            TaskFlow
          </Link>

          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>

          <p>Plan smarter. Work better.</p>
        </div>
      </footer>
    </main>
  );
}
