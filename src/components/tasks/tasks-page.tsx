"use client";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  DollarSign,
  LayoutGrid,
  Plus,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AppShell } from "@/components/app/app-shell";

type TaskStatus = "open" | "in-progress" | "completed";
type TaskCategory = "Web development" | "UI/UX design" | "Content & media" | "Writing" | "Marketing";

type TaskItem = {
  id: string;
  title: string;
  postedBy: string;
  role: string;
  category: TaskCategory;
  budget: string;
  deadline: string;
  description: string;
  status: TaskStatus;
  applicants: number;
  urgent?: boolean;
};

const categories: Array<TaskCategory | "All tasks"> = [
  "All tasks",
  "Web development",
  "UI/UX design",
  "Content & media",
  "Writing",
  "Marketing",
];

const initialTasks: TaskItem[] = [
  {
    id: "luna-business-site",
    title: "Build a responsive website for a local coffee shop",
    postedBy: "Luna Mercado",
    role: "Small business owner",
    category: "Web development",
    budget: "₱18,000 – ₱25,000",
    deadline: "Dec 14, 2026",
    description: "Need someone to turn our menu, story, and booking flow into a warm, mobile-friendly website.",
    status: "open",
    applicants: 6,
    urgent: true,
  },
  {
    id: "kai-thumbnail-pack",
    title: "Create 12 YouTube thumbnails for a new video series",
    postedBy: "Kai Villanueva",
    role: "Content creator · 240k subscribers",
    category: "Content & media",
    budget: "₱8,000 – ₱12,000",
    deadline: "Dec 6, 2026",
    description: "Looking for a thumbnail designer who can keep a recognizable visual system while making every episode clickable.",
    status: "open",
    applicants: 11,
  },
  {
    id: "northstar-dashboard",
    title: "Design a clean dashboard for a growing SaaS product",
    postedBy: "Northstar Labs",
    role: "Startup team",
    category: "UI/UX design",
    budget: "₱35,000 – ₱50,000",
    deadline: "Jan 8, 2027",
    description: "We need flows and high-fidelity screens for analytics, billing, and team management.",
    status: "open",
    applicants: 9,
  },
  {
    id: "mika-brand-refresh",
    title: "Refresh the visual identity for a personal brand",
    postedBy: "Mika Santos",
    role: "Product designer",
    category: "UI/UX design",
    budget: "₱15,000 – ₱20,000",
    deadline: "Dec 20, 2026",
    description: "Need help shaping a practical color, type, and social template system for a design education brand.",
    status: "in-progress",
    applicants: 4,
  },
  {
    id: "brightpath-copy",
    title: "Write landing page copy for a career coaching service",
    postedBy: "Brightpath Careers",
    role: "Career coaching studio",
    category: "Writing",
    budget: "₱10,000 – ₱15,000",
    deadline: "Dec 12, 2026",
    description: "Help us explain our offer simply and turn visitor questions into a clear conversion path.",
    status: "in-progress",
    applicants: 3,
  },
  {
    id: "pixelwave-launch",
    title: "Plan a launch campaign for an indie mobile app",
    postedBy: "Pixelwave Studio",
    role: "Indie app team",
    category: "Marketing",
    budget: "₱22,000 – ₱30,000",
    deadline: "Completed Nov 18, 2026",
    description: "Launch plan, content calendar, and a small experiment plan for our first public release.",
    status: "completed",
    applicants: 8,
  },
  {
    id: "harbor-frontend",
    title: "Improve the onboarding flow for a membership platform",
    postedBy: "Harbor Collective",
    role: "Community organization",
    category: "Web development",
    budget: "₱28,000 – ₱40,000",
    deadline: "Completed Nov 12, 2026",
    description: "A focused frontend project to make signup, payment, and member welcome steps feel effortless.",
    status: "completed",
    applicants: 5,
  },
];

const statusColumns: Array<{ id: TaskStatus; label: string; tone: string }> = [
  { id: "open", label: "Open offers", tone: "blue" },
  { id: "in-progress", label: "In progress", tone: "yellow" },
  { id: "completed", label: "Completed", tone: "green" },
];

export function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All tasks");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [appliedTasks, setAppliedTasks] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState({ title: "", category: "Web development" as TaskCategory, budget: "", deadline: "", description: "" });

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesCategory = activeCategory === "All tasks" || task.category === activeCategory;
      const matchesSearch = !query || `${task.title} ${task.postedBy} ${task.role} ${task.description}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, tasks]);

  function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.budget.trim() || !draft.deadline.trim() || !draft.description.trim()) return;
    setTasks((current) => [{
      id: `task-${Date.now()}`,
      title: draft.title.trim(),
      postedBy: "Alex Rivera",
      role: "SIКAP member",
      category: draft.category,
      budget: draft.budget.trim(),
      deadline: draft.deadline.trim(),
      description: draft.description.trim(),
      status: "open",
      applicants: 0,
    }, ...current]);
    setDraft({ title: "", category: "Web development", budget: "", deadline: "", description: "" });
    setShowForm(false);
    setNotice("Your task offer is now visible in the Open offers column.");
  }

  function offerHelp(task: TaskItem) {
    if (appliedTasks.includes(task.id)) return;
    setAppliedTasks((current) => [...current, task.id]);
    setNotice(`Your offer to help with “${task.title}” has been sent.`);
  }

  return (
    <AppShell activePage="tasks" onSearchChange={setSearch} rightRail={<TaskRail />} searchValue={search}>
      <div className="tasks-page">
        <header className="tasks-heading">
          <div>
            <p className="eyebrow"><Sparkles size={13} /> OPPORTUNITIES · TODAY</p>
            <h1>Tasks</h1>
            <p>Find projects to work on, or post an offer when you need the right person.</p>
          </div>
          <button className="button button--primary tasks-create-button" onClick={() => setShowForm((current) => !current)} type="button">
            {showForm ? <X size={15} /> : <Plus size={15} />}
            {showForm ? "Close form" : "Create task"}
          </button>
        </header>

        {showForm ? (
          <form className="task-form" onSubmit={createTask}>
            <div className="task-form__heading">
              <div>
                <h2>Post a project or offer</h2>
                <p>Tell the SIКAP community what you need help with.</p>
              </div>
              <span className="task-form__hint"><DollarSign size={14} /> Agree on payment directly</span>
            </div>
            <div className="task-form__grid">
              <label><span>Task title</span><input onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} placeholder="e.g. Build a website for my business" value={draft.title} /></label>
              <label><span>Category</span><select onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value as TaskCategory }))} value={draft.category}>{categories.slice(1).map((category) => <option key={category}>{category}</option>)}</select></label>
              <label><span>Budget or offer</span><input onChange={(event) => setDraft((current) => ({ ...current, budget: event.target.value }))} placeholder="e.g. ₱10,000 – ₱15,000" value={draft.budget} /></label>
              <label><span>Deadline</span><input onChange={(event) => setDraft((current) => ({ ...current, deadline: event.target.value }))} placeholder="e.g. December 20, 2026" value={draft.deadline} /></label>
            </div>
            <label><span>What do you need?</span><textarea onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} placeholder="Describe the project, expected output, and the kind of collaborator you need." value={draft.description} /></label>
            <div className="task-form__actions"><button className="button button--primary button--sm" disabled={!draft.title.trim() || !draft.budget.trim() || !draft.deadline.trim() || !draft.description.trim()} type="submit">Publish task <ArrowUpRight size={14} /></button><span>New tasks appear as open offers for the community.</span></div>
          </form>
        ) : null}

        {notice ? <p className="feed-notice task-notice" role="status"><CheckCircle2 size={15} />{notice}</p> : null}

        <div className="tasks-toolbar">
          <div className="tasks-view-tabs"><button className="tasks-view-tab tasks-view-tab--active" type="button"><LayoutGrid size={15} /> Overview</button><button className="tasks-view-tab" type="button"><Clock3 size={15} /> My activity <span>0</span></button></div>
          <button className="tasks-sort" type="button"><span>Latest opportunities</span><ChevronDown size={14} /></button>
        </div>

        <div className="task-categories" aria-label="Filter tasks by category">
          {categories.map((category) => <button aria-pressed={activeCategory === category} className={activeCategory === category ? "task-category task-category--active" : "task-category"} key={category} onClick={() => setActiveCategory(category)} type="button">{category}</button>)}
        </div>

        <div className="task-board">
          {statusColumns.map((column) => {
            const columnTasks = filteredTasks.filter((task) => task.status === column.id);
            return <section className="task-column" key={column.id}>
              <header className="task-column__heading"><span><i className={`task-status-dot task-status-dot--${column.tone}`} />{column.label}</span><strong>{columnTasks.length}</strong></header>
              <div className="task-column__list">
                {columnTasks.map((task) => <TaskCard applied={appliedTasks.includes(task.id)} key={task.id} onOffer={() => offerHelp(task)} task={task} />)}
                {column.id === "open" ? <button className="task-add-button" onClick={() => setShowForm(true)} type="button"><Plus size={15} /> Add task</button> : null}
                {!columnTasks.length && column.id !== "open" ? <p className="task-column__empty">No tasks here yet.</p> : null}
              </div>
            </section>;
          })}
        </div>
      </div>
    </AppShell>
  );
}

function TaskCard({ applied, onOffer, task }: { applied: boolean; onOffer: () => void; task: TaskItem }) {
  return <article className="task-card">
    <div className="task-card__topline"><span className={`task-priority${task.urgent ? " task-priority--urgent" : ""}`}>{task.urgent ? "Urgent" : task.category}</span><button aria-label={`More options for ${task.title}`} className="task-more" type="button">•••</button></div>
    <h2>{task.title}</h2>
    <p>{task.description}</p>
    <div className="task-card__meta"><span><DollarSign size={13} />{task.budget}</span><span><CalendarDays size={13} />{task.deadline}</span></div>
    <div className="task-card__footer"><div className="task-card__author"><span className="task-card__avatar">{task.postedBy.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span><span><strong>{task.postedBy}</strong><small>{task.role}</small></span></div><span className="task-applicants"><Users size={13} />{task.applicants}</span></div>
    {task.status === "open" ? <button className={applied ? "task-offer task-offer--sent" : "task-offer"} disabled={applied} onClick={onOffer} type="button">{applied ? <><CheckCircle2 size={14} /> Offer sent</> : <><Send size={14} /> Offer help</>}</button> : null}
  </article>;
}

function TaskRail() {
  return <>
    <section className="rail-section task-rail-section"><div className="rail-heading"><h2>Task categories</h2><LayoutGrid size={16} /></div><p className="rail-caption">Find work that matches your strengths</p>{["Web development", "UI/UX design", "Content & media", "Writing", "Marketing"].map((category, index) => <button className="task-rail-link" key={category} type="button"><span className={`task-rail-icon task-rail-icon--${index}`}>{index === 0 ? "</>" : index === 1 ? "✦" : index === 2 ? "▶" : index === 3 ? "Aa" : "↗"}</span><span>{category}</span><ArrowUpRight size={13} /></button>)}</section>
    <section className="rail-section task-rail-section"><div className="rail-heading"><h2>How tasks work</h2><Sparkles size={16} /></div><ol className="task-how-list"><li><span>1</span><p>Post what you need and include a clear budget.</p></li><li><span>2</span><p>Review offers from people in the community.</p></li><li><span>3</span><p>Agree on the details and start building together.</p></li></ol></section>
    <section className="rail-note"><span className="rail-note__icon"><DollarSign size={16} /></span><p>Payment terms are agreed directly between the people involved. SIКAP helps you find the right collaborator.</p></section>
  </>;
}
