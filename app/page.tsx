'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Archive,
  ArrowRight,
  Bell,
  BookOpen,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Code2,
  Flame,
  Gift,
  GraduationCap,
  LayoutDashboard,
  Lock,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'

const courses = [
  { name: 'Data Structures', code: 'CS201', progress: 78, color: 'violet', chapter: 'Graph Algorithms', icon: Code2 },
  { name: 'Algorithms', code: 'CS301', progress: 64, color: 'blue', chapter: 'Dynamic Programming', icon: Brain },
  { name: 'Operating Systems', code: 'CS302', progress: 48, color: 'orange', chapter: 'Memory Management', icon: Archive },
  { name: 'Calculus II', code: 'MA102', progress: 36, color: 'green', chapter: 'Multivariable Functions', icon: GraduationCap },
]

const chapters = [
  { title: 'Arrays & Complexity', state: 'complete', xp: '+120 XP', detail: '12 topics mastered' },
  { title: 'Linked Lists', state: 'complete', xp: '+150 XP', detail: '8 topics mastered' },
  { title: 'Stacks & Queues', state: 'complete', xp: '+160 XP', detail: '10 topics mastered' },
  { title: 'Trees', state: 'current', xp: '75%', detail: '2 objectives left' },
  { title: 'Graph Algorithms', state: 'next', xp: 'Start level', detail: 'BFS, DFS, shortest paths' },
  { title: 'Final Boss: Exam Prep', state: 'locked', xp: 'Locked', detail: 'Complete Graph Algorithms' },
]

const resources = [
  { title: 'Graph Algorithms — Exam Notes', type: 'Senior notes', author: 'Alex Chen', rating: '4.9', votes: 48, senior: true, saved: false },
  { title: 'BFS & DFS Problem Set', type: 'Problem set', author: 'Wei Zhang', rating: '4.7', votes: 32, senior: false, saved: true },
  { title: 'Data Structures Past Papers', type: 'Past papers', author: 'Sarah Lin', rating: '4.8', votes: 61, senior: true, saved: false },
]

const mistakes = [
  { topic: 'Binary Search', author: 'Muntaha', time: '12 min ago', title: 'Why is the time complexity O(log n)?', body: 'I thought it was O(n) because we still need to check the array. Where does my reasoning break?', replies: 4, solved: false },
  { topic: 'DFS Backtracking', author: 'Daniel Wu', time: 'Yesterday', title: 'My recursion returns too early', body: 'The solution works for simple trees but fails when a graph has multiple paths.', replies: 8, solved: true },
]

const buddies = [
  { name: 'Alex Chen', initials: 'AC', match: 94, course: 'Algorithms', availability: '8–10 PM', goal: 'Problem solving', status: 'Focusing' },
  { name: 'Yuki Tanaka', initials: 'YT', match: 88, course: 'Data Structures', availability: '9–11 PM', goal: 'Exam preparation', status: 'Focusing' },
  { name: 'Sarah Lin', initials: 'SL', match: 82, course: 'Algorithms', availability: '8–9 PM', goal: 'Review & explain', status: 'Taking a break' },
]

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Courses', icon: BookOpen },
  { label: 'Missions', icon: Target },
  { label: 'Study Buddies', icon: Users },
  { label: 'Debug Corner', icon: MessageCircle },
  { label: 'Resources', icon: Archive },
  { label: 'Weekly Survival', icon: Trophy },
]

function ProgressBar({ value, color = 'violet' }: { value: number; color?: string }) {
  return <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]"><div className={`h-full rounded-full bg-${color}-500 transition-all duration-500`} style={{ width: `${value}%` }} /></div>
}

function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return <div className="mb-4 flex items-end justify-between"><div>{eyebrow && <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-400">{eyebrow}</p>}<h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2></div>{action && <button className="flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-white">{action}<ChevronRight className="h-3.5 w-3.5" /></button>}</div>
}

export default function Page() {
  const [active, setActive] = useState('Dashboard')
  const [course, setCourse] = useState(courses[0])
  const [xp, setXp] = useState(1840)
  const [mission, setMission] = useState(6)
  const [saved, setSaved] = useState(resources.map((r) => r.saved))
  const [votes, setVotes] = useState(resources.map((r) => r.votes))
  const [solved, setSolved] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [sessionOpen, setSessionOpen] = useState(false)
  const [seconds, setSeconds] = useState(47 * 60 + 23)
  const [checklist, setChecklist] = useState([true, true, false, false])
  const [status, setStatus] = useState('Focusing')

  useEffect(() => {
    if (!sessionOpen || seconds <= 0) return
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000)
    return () => window.clearInterval(timer)
  }, [sessionOpen, seconds])

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  const levelProgress = Math.min((xp / 2000) * 100, 100)
  const missionDone = mission >= 10
  const rewardUnlocked = xp >= 2000
  const currentNav = active === 'Dashboard' ? 'Dashboard' : active

  function completeMission() {
    if (!missionDone) {
      setMission(10)
      setXp((value) => Math.min(2000, value + 100))
    }
  }

  function solveMistake() {
    if (!solved) {
      setSolved(true)
      setXp((value) => Math.min(2000, value + 40))
    }
  }

  function handleNav(label: string) {
    setActive(label)
    setMobileNav(false)
  }

  const pageContent = useMemo(() => active, [active])

  return (
    <main className="min-h-screen bg-[#0c0d14] text-slate-200 selection:bg-indigo-500/30">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[246px] flex-col border-r border-white/[0.07] bg-[#11121c] px-3 py-5 transition-transform duration-200 lg:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex items-center gap-3 px-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20"><ShieldCheck className="h-5 w-5" /></div><div><div className="text-[13px] font-bold tracking-wide text-white">SURVIVE</div><div className="text-[10px] font-medium tracking-[0.18em] text-slate-500">THE COURSE</div></div><button onClick={() => setMobileNav(false)} className="ml-auto rounded-lg p-1 text-slate-500 hover:bg-white/5 lg:hidden" aria-label="Close navigation"><X className="h-4 w-4" /></button></div>
        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Your workspace</div>
        <nav className="space-y-1" aria-label="Main navigation">{navItems.map(({ label, icon: Icon }) => <button key={label} onClick={() => handleNav(label)} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${currentNav === label ? 'bg-indigo-500/15 font-medium text-indigo-300' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'}`}><Icon className={`h-4 w-4 ${currentNav === label ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />{label}{label === 'Missions' && <span className="ml-auto rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] text-indigo-300">3</span>}</button>)}</nav>
        <div className="my-6 border-t border-white/[0.06]" />
        <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-600">Quick access</div>
        <button onClick={() => setActive('Study Session')} className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200"><Timer className="h-4 w-4 text-slate-500" />Study session</button>
        <button onClick={() => setActive('Rewards')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200"><Gift className="h-4 w-4 text-slate-500" />Rewards</button>
        <div className="mt-auto space-y-1"><button onClick={() => setNotifications(!notifications)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200"><Bell className="h-4 w-4 text-slate-500" />Notifications<span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" /></button><button onClick={() => setActive('Settings')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-200"><Settings className="h-4 w-4 text-slate-500" />Settings</button><div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] px-3 pt-4"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 text-xs font-bold text-white">MF</div><div className="min-w-0"><div className="truncate text-xs font-medium text-slate-200">Muntaha Fayez</div><div className="text-[10px] text-slate-500">Level 8 · 1,840 XP</div></div><MoreHorizontal className="ml-auto h-4 w-4 text-slate-600" /></div></div>
      </aside>

      <section className="min-h-screen lg:pl-[246px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#0c0d14]/90 px-5 backdrop-blur-xl lg:px-8"><div className="flex items-center gap-3"><button onClick={() => setMobileNav(true)} className="rounded-lg p-2 text-slate-400 hover:bg-white/5 lg:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button><div className="relative hidden sm:block"><Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" /><input className="h-9 w-64 rounded-lg border border-white/[0.07] bg-white/[0.03] pl-9 pr-3 text-xs text-slate-300 outline-none placeholder:text-slate-600 focus:border-indigo-500/50" placeholder="Search courses, resources..." /></div><div className="text-sm font-medium text-slate-300 sm:hidden">{pageContent}</div></div><div className="relative flex items-center gap-3"><div className="hidden items-center gap-2 border-r border-white/[0.08] pr-4 text-xs text-slate-500 md:flex"><Flame className="h-4 w-4 text-orange-400" />6 day streak</div><button onClick={() => setNotifications(!notifications)} className="relative rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white" aria-label="Notifications"><Bell className="h-[18px] w-[18px]" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400" /></button><button onClick={() => setActive('Profile')} className="flex items-center gap-2 rounded-lg p-1 transition hover:bg-white/5"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 text-[11px] font-bold text-white">MF</div><ChevronRight className="hidden h-3.5 w-3.5 rotate-90 text-slate-500 md:block" /></button>{notifications && <div className="absolute right-0 top-12 w-80 rounded-xl border border-white/10 bg-[#181925] p-4 shadow-2xl shadow-black/40"><div className="mb-3 flex items-center justify-between"><span className="text-sm font-semibold text-white">Notifications</span><span className="text-[10px] text-indigo-300">3 new</span></div><div className="space-y-3 text-xs"><div className="flex gap-3"><Sparkles className="h-4 w-4 shrink-0 text-indigo-400" /><p className="text-slate-300">Your weekly challenge is 80% complete.<span className="mt-1 block text-[10px] text-slate-600">2 hours ago</span></p></div><div className="flex gap-3"><BookOpen className="h-4 w-4 shrink-0 text-emerald-400" /><p className="text-slate-300">A senior recommended a resource for Algorithms.<span className="mt-1 block text-[10px] text-slate-600">Yesterday</span></p></div><div className="flex gap-3"><Users className="h-4 w-4 shrink-0 text-blue-400" /><p className="text-slate-300">Alex wants to study with you tonight.<span className="mt-1 block text-[10px] text-slate-600">Yesterday</span></p></div></div></div>}</div></header>

        <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-8 lg:py-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-medium text-indigo-400">MONDAY, SEPTEMBER 12, 2026</p><h1 className="text-2xl font-semibold tracking-tight text-white lg:text-3xl">Good evening, Muntaha <span className="text-indigo-400">.</span></h1><p className="mt-1 text-sm text-slate-500">Ready to survive another chapter?</p></div><div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5"><div className="rounded-lg bg-indigo-500/15 p-2"><Zap className="h-4 w-4 text-indigo-400" /></div><div><div className="text-[10px] uppercase tracking-wider text-slate-500">Your level</div><div className="text-sm font-semibold text-white">Course Survivor <span className="ml-1 text-indigo-400">LVL 8</span></div></div></div></div>

          <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
            <section className="relative overflow-hidden rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-[#1a1d3a] via-[#151731] to-[#151622] p-6 shadow-xl shadow-indigo-950/20 lg:p-7"><div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" /><div className="relative"><div className="mb-5 flex items-start justify-between"><div><div className="mb-2 flex items-center gap-2"><span className="rounded-md bg-indigo-400/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300">Current campaign</span><span className="text-xs text-slate-500">CS201</span></div><h2 className="text-xl font-semibold text-white">Data Structures</h2><p className="mt-1 text-sm text-slate-400">Chapter 8 — Graph Algorithms</p></div><div className="text-right"><div className="text-3xl font-semibold tracking-tight text-white">{course.progress}<span className="text-lg text-indigo-300">%</span></div><div className="text-[10px] uppercase tracking-wider text-slate-500">survived</div></div></div><ProgressBar value={course.progress} /><div className="mt-5 flex items-end justify-between gap-4"><div><p className="mb-1 text-xs text-slate-500">Next recommended action</p><p className="text-sm font-medium text-slate-200">Solve 5 BFS & DFS problems</p></div><button onClick={() => setActive('My Courses')} className="flex shrink-0 items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400">Continue mission<ArrowRight className="h-3.5 w-3.5" /></button></div></div></section>

            <section className="rounded-2xl border border-white/[0.08] bg-[#12131d] p-6"><div className="mb-4 flex items-center justify-between"><div className="flex items-center gap-2"><div className="rounded-lg bg-orange-400/10 p-2"><Target className="h-4 w-4 text-orange-400" /></div><div><p className="text-[10px] font-semibold uppercase tracking-wider text-orange-300">Today&apos;s mission</p><h3 className="text-sm font-semibold text-white">Daily Survival Run</h3></div></div><span className="rounded-md bg-indigo-500/10 px-2 py-1 text-[10px] font-semibold text-indigo-300">+100 XP</span></div><div className="mb-2 flex items-center justify-between text-xs"><span className="text-slate-400">Solve 10 problems</span><span className="font-medium text-white">{mission} / 10</span></div><ProgressBar value={mission * 10} color="orange" /><div className="mt-5 flex items-center justify-between"><span className="text-[11px] text-slate-500">Resets in 8h 24m</span><button onClick={completeMission} disabled={missionDone} className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${missionDone ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.07] text-slate-200 hover:bg-white/[0.12]'}`}>{missionDone ? 'Mission complete' : 'Continue'}</button></div></section>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.6fr_1fr]">
            <div><SectionTitle eyebrow="Keep moving" title="Continue your journey" action="View all courses" /><div className="grid gap-3 sm:grid-cols-2">{courses.slice(0, 4).map((item) => { const Icon = item.icon; return <button key={item.name} onClick={() => { setCourse(item); setActive('My Courses') }} className="group rounded-xl border border-white/[0.07] bg-[#12131d] p-4 text-left transition hover:border-white/15 hover:bg-[#161724]"><div className="mb-4 flex items-start justify-between"><div className="flex items-center gap-3"><div className={`rounded-lg bg-${item.color}-500/10 p-2.5`}><Icon className={`h-4 w-4 text-${item.color}-400`} /></div><div><div className="text-sm font-medium text-slate-200">{item.name}</div><div className="mt-0.5 text-[10px] text-slate-600">{item.code} · {item.chapter}</div></div></div><ChevronRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-slate-300" /></div><div className="flex items-center justify-between text-[11px] text-slate-500"><span>Progress</span><span className="font-semibold text-slate-300">{item.progress}%</span></div><div className="mt-2"><ProgressBar value={item.progress} color={item.color} /></div></button> })}</div></div>
            <div><SectionTitle eyebrow="This week" title="Weekly survival" action="See challenges" /><div className="rounded-xl border border-white/[0.07] bg-[#12131d] p-5"><div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold text-white">Consistency challenge</p><p className="mt-1 text-xs text-slate-500">Complete 4 study sessions this week</p></div><div className="rounded-full border border-orange-400/20 bg-orange-400/10 px-2 py-1 text-xs font-semibold text-orange-300">3 / 4</div></div><ProgressBar value={75} color="orange" /><div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4"><div className="flex -space-x-2"><div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#12131d] bg-indigo-500 text-[9px] font-bold text-white">AC</div><div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#12131d] bg-emerald-600 text-[9px] font-bold text-white">SL</div><div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#12131d] bg-slate-600 text-[9px] font-bold text-white">+8</div></div><span className="text-[11px] text-slate-500">+250 XP reward</span></div></div></div>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_1fr]">
            <section><SectionTitle eyebrow="Community knowledge" title="Recommended for you" action="Browse resources" /><div className="space-y-3">{resources.map((resource, index) => <div key={resource.title} className="group rounded-xl border border-white/[0.07] bg-[#12131d] p-4 transition hover:border-white/15"><div className="flex gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"><BookOpen className="h-4 w-4" /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><h3 className="truncate text-sm font-medium text-slate-200">{resource.title}</h3><p className="mt-1 text-[11px] text-slate-500">{resource.type} · by {resource.author}</p></div>{resource.senior && <span className="flex shrink-0 items-center gap-1 rounded-md bg-emerald-400/10 px-2 py-1 text-[9px] font-semibold text-emerald-400"><ShieldCheck className="h-3 w-3" />Senior pick</span>}</div><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-3 text-[11px] text-slate-500"><span className="flex items-center gap-1 text-amber-300"><span>★</span>{resource.rating}</span><button onClick={() => setVotes((v) => v.map((n, i) => i === index ? n + 1 : n))} className="transition hover:text-indigo-300">{votes[index]} upvotes</button></div><div className="flex gap-1"><button onClick={() => setSaved((v) => v.map((s, i) => i === index ? !s : s))} className={`rounded-md px-2.5 py-1.5 text-[10px] font-medium transition ${saved[index] ? 'bg-indigo-500/15 text-indigo-300' : 'bg-white/[0.05] text-slate-400 hover:text-white'}`}>{saved[index] ? 'Saved' : 'Save'}</button><button className="rounded-md bg-white/[0.05] px-2.5 py-1.5 text-[10px] font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">Open</button></div></div></div></div></div>)}</div></section>
            <section><SectionTitle eyebrow="Learn together" title="Study buddies" action="Find a buddy" /><div className="rounded-xl border border-white/[0.07] bg-[#12131d] p-4"><div className="mb-3 flex items-center justify-between text-[11px] text-slate-500"><span>Best matches for Algorithms tonight</span><span className="flex items-center gap-1 text-emerald-400"><CircleDot className="h-3 w-3" />3 online</span></div><div className="space-y-1">{buddies.map((buddy) => <div key={buddy.name} className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-white/[0.04]"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-[10px] font-semibold text-slate-200">{buddy.initials}</div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="text-xs font-medium text-slate-200">{buddy.name}</span><span className="text-[10px] font-bold text-emerald-400">{buddy.match}% match</span></div><p className="mt-1 truncate text-[10px] text-slate-500">{buddy.course} · {buddy.availability}</p></div><button onClick={() => { setSessionOpen(true); setActive('Study Session') }} className="rounded-md bg-indigo-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-indigo-300 transition hover:bg-indigo-500/20">Study together</button></div>)}</div></div></section>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_1fr]">
            <section><SectionTitle eyebrow="Reflect & improve" title="Mistake debugging corner" action="View all mistakes" /><div className="space-y-3">{mistakes.map((mistake) => <div key={mistake.title} className={`rounded-xl border p-4 transition ${mistake.solved || (solved && mistake.author === 'Muntaha') ? 'border-emerald-400/20 bg-emerald-400/[0.04]' : 'border-red-400/15 bg-[#12131d]'}`}><div className="mb-2 flex items-center justify-between"><div className="flex items-center gap-2"><span className="rounded bg-red-400/10 px-2 py-1 text-[10px] font-medium text-red-300">{mistake.topic}</span><span className="text-[10px] text-slate-600">{mistake.time}</span></div>{(mistake.solved || (solved && mistake.author === 'Muntaha')) ? <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400"><CheckCircle2 className="h-3 w-3" />Solved</span> : <span className="text-[10px] text-slate-600">{mistake.replies} replies</span>}</div><h3 className="text-sm font-medium text-slate-200">{mistake.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{mistake.body}</p>{mistake.author === 'Muntaha' && !solved && <button onClick={solveMistake} className="mt-3 flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-300 transition hover:bg-emerald-500/20">Mark concept understood<Check className="h-3 w-3" /></button>}</div>)}</div></section>
            <section><SectionTitle eyebrow="Your progress" title="Experience & rewards" action="Open profile" /><div className="rounded-xl border border-white/[0.07] bg-[#12131d] p-5"><div className="mb-5 flex items-center justify-between"><div><div className="flex items-center gap-2"><span className="text-lg font-semibold text-white">Level 8</span><span className="rounded bg-indigo-500/15 px-2 py-1 text-[10px] font-semibold text-indigo-300">Course Survivor</span></div><p className="mt-1 text-xs text-slate-500">{xp.toLocaleString()} / 2,000 XP to level 9</p></div><div className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10"><Zap className="h-5 w-5 text-indigo-400" /></div></div><ProgressBar value={levelProgress} /><div className="mt-6 grid grid-cols-3 gap-2 text-center"><div><div className="text-lg font-semibold text-white">43</div><div className="text-[10px] text-slate-600">Sessions</div></div><div><div className="text-lg font-semibold text-white">187</div><div className="text-[10px] text-slate-600">Problems</div></div><div><div className="text-lg font-semibold text-white">9</div><div className="text-[10px] text-slate-600">Debugs</div></div></div><div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4"><div className={`flex h-9 w-9 items-center justify-center rounded-lg ${rewardUnlocked ? 'bg-emerald-400/10' : 'bg-slate-500/10'}`}>{rewardUnlocked ? <Gift className="h-4 w-4 text-emerald-400" /> : <Lock className="h-4 w-4 text-slate-500" />}</div><div className="flex-1"><div className="text-xs font-medium text-slate-300">{rewardUnlocked ? 'Senior Exam Notes unlocked' : 'Senior Exam Notes'}</div><div className="mt-0.5 text-[10px] text-slate-500">{rewardUnlocked ? 'New reward available to read' : 'Unlock at 2,000 XP'}</div></div>{rewardUnlocked && <span className="text-[10px] font-semibold text-emerald-400">UNLOCKED</span>}</div></div></section>
          </div>
        </div>
      </section>

      {active === 'My Courses' && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#151622] p-6 shadow-2xl"><div className="mb-6 flex items-start justify-between"><div><p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Survival campaign</p><h2 className="text-2xl font-semibold text-white">{course.name}</h2><p className="mt-1 text-sm text-slate-500">{course.code} · {course.chapter} · {course.progress}% complete</p></div><button onClick={() => setActive('Dashboard')} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white" aria-label="Close course"><X className="h-5 w-5" /></button></div><div className="mb-6 flex items-center justify-between rounded-xl border border-indigo-400/15 bg-indigo-500/[0.06] p-4"><div><p className="text-[10px] uppercase tracking-wider text-indigo-300">Current level</p><p className="mt-1 text-sm font-semibold text-white">{course.chapter}</p></div><div className="text-right"><p className="text-2xl font-semibold text-indigo-300">{course.progress}%</p><p className="text-[10px] text-slate-500">survived</p></div></div><div className="space-y-2">{chapters.map((chapter, index) => <div key={chapter.title} className="flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${chapter.state === 'complete' ? 'bg-emerald-400/15 text-emerald-400' : chapter.state === 'current' ? 'bg-indigo-400/15 text-indigo-300 ring-2 ring-indigo-400/20' : chapter.state === 'next' ? 'bg-orange-400/10 text-orange-300' : 'bg-white/5 text-slate-600'}`}>{chapter.state === 'complete' ? <Check className="h-4 w-4" /> : chapter.state === 'locked' ? <Lock className="h-4 w-4" /> : <span className="text-xs font-semibold">{index + 1}</span>}</div><div className="flex-1"><p className={`text-sm font-medium ${chapter.state === 'locked' ? 'text-slate-600' : 'text-slate-200'}`}>{chapter.title}</p><p className="mt-1 text-[11px] text-slate-500">{chapter.detail}</p></div><span className={`text-[11px] font-medium ${chapter.state === 'complete' ? 'text-emerald-400' : chapter.state === 'current' ? 'text-indigo-300' : 'text-slate-600'}`}>{chapter.xp}</span></div>)}</div></div></div>}
      {active === 'Study Session' && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#151622] p-6 shadow-2xl"><div className="mb-6 flex items-start justify-between"><div><p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Shared study mission</p><h2 className="text-xl font-semibold text-white">Algorithms · Graph Algorithms</h2><p className="mt-1 text-sm text-slate-500">Solve 10 BFS/DFS problems with Alex Chen</p></div><button onClick={() => setActive('Dashboard')} className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white" aria-label="Close study session"><X className="h-5 w-5" /></button></div><div className="mb-5 flex items-center justify-between rounded-xl bg-[#0d0e16] p-5"><div><p className="text-[10px] uppercase tracking-wider text-slate-500">Shared timer</p><p className="mt-1 font-mono text-4xl font-medium tracking-tight text-white">{formattedTime}</p></div><button onClick={() => setSessionOpen(!sessionOpen)} className={`rounded-lg px-4 py-2.5 text-xs font-semibold ${sessionOpen ? 'bg-orange-400/10 text-orange-300' : 'bg-indigo-500 text-white'}`}>{sessionOpen ? 'Pause' : 'Start session'}</button></div><div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-wider text-slate-500">Mission progress</p><p className="mt-1 text-sm font-semibold text-white">6 / 10 problems</p></div><div className="h-2 w-32 overflow-hidden rounded-full bg-white/10"><div className="h-full w-3/5 rounded-full bg-indigo-500" /></div></div><div className="mb-5 rounded-xl border border-white/[0.06] p-4"><p className="mb-3 text-xs font-semibold text-slate-300">Shared checklist</p>{['Review BFS', 'Review DFS', 'Solve 10 problems', 'Compare mistakes'].map((item, i) => <button onClick={() => setChecklist((v) => v.map((checked, index) => index === i ? !checked : checked))} key={item} className="flex w-full items-center gap-3 py-2 text-left text-xs text-slate-400">{checklist[i] ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <CircleDot className="h-4 w-4 text-slate-600" />}<span className={checklist[i] ? 'text-slate-300 line-through' : ''}>{item}</span></button>)}</div><div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-[10px] text-slate-500">Your status</span><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-md border border-white/10 bg-white/5 px-2 py-1.5 text-[10px] text-slate-300 outline-none"><option>Focusing</option><option>Taking a break</option><option>Stuck</option><option>Finished</option></select></div><div className="flex -space-x-2"><div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#151622] bg-indigo-500 text-[9px] font-bold">MF</div><div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#151622] bg-blue-500 text-[9px] font-bold">AC</div></div></div></div></div>}
    </main>
  )
}
