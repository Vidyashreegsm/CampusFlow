
import { useMemo, useState } from 'react'
import { Customizer } from './Customizer'
import GeneratedWebsite, {
  type GeneratedWebsiteProps,
} from './GeneratedWebsite'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  GraduationCap,
  Heart,
  LayoutTemplate,
  Menu,
  Monitor,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
  Zap,
} from 'lucide-react'

type Template = {
  id: number
  name: string
  category: string
  description: string
  initials: string
  color: string
  accent: string
  style: string
  features: string[]
}

const templates: Template[] = [
  {
    id: 1,
    name: 'Northstar Institute',
    category: 'Engineering',
    description: 'Bold typography and a modern technology-first identity.',
    initials: 'NI',
    color: '#123d35',
    accent: '#d5f27b',
    style: 'dark',
    features: ['Departments', 'Admissions', 'Placements'],
  },
  {
    id: 2,
    name: 'Meridian Medical',
    category: 'Medical',
    description: 'A welcoming, trustworthy design for medical institutions.',
    initials: 'MM',
    color: '#e8f5ed',
    accent: '#147d58',
    style: 'light',
    features: ['Programs', 'Faculty', 'Facilities'],
  },
  {
    id: 3,
    name: 'Westbridge University',
    category: 'Arts & Science',
    description: 'An editorial-inspired layout for a vibrant academic community.',
    initials: 'WU',
    color: '#4b286c',
    accent: '#e6b8ff',
    style: 'purple',
    features: ['Academics', 'Campus life', 'Research'],
  },
  {
    id: 4,
    name: 'Aurelius Business School',
    category: 'Management',
    description: 'A refined, premium identity for ambitious future leaders.',
    initials: 'AB',
    color: '#152542',
    accent: '#e8c77d',
    style: 'navy',
    features: ['MBA programs', 'Careers', 'Alumni'],
  },
  {
    id: 5,
    name: 'Vertex Tech University',
    category: 'Engineering',
    description: 'A clean digital experience built around innovation.',
    initials: 'VT',
    color: '#eaf0ff',
    accent: '#315eea',
    style: 'blue',
    features: ['Innovation', 'Courses', 'Admissions'],
  },
  {
    id: 6,
    name: 'Evergreen College',
    category: 'Arts & Science',
    description: 'Warm colors and approachable layouts for modern learning.',
    initials: 'EC',
    color: '#f3eadb',
    accent: '#9a5735',
    style: 'warm',
    features: ['Programs', 'Student life', 'Events'],
  },
]

const categories = [
  'All templates',
  'Engineering',
  'Medical',
  'Arts & Science',
  'Management',
]

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
        <GraduationCap size={24} strokeWidth={2.2} />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-slate-900">
        campus<span className="text-blue-600">flow</span>
      </span>
    </a>
  )
}

function TemplatePreview({ template }: { template: Template }) {
  return (
    <div
      className={`template-art template-${template.style} relative overflow-hidden rounded-t-2xl`}
      style={
        {
          '--template-bg': template.color,
          '--template-accent': template.accent,
        } as React.CSSProperties
      }
    >
      <div className="preview-window">
        <div className="preview-topbar">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          </div>
          <span className="preview-url">yourcollege.edu</span>
          <Monitor size={12} />
        </div>

        <div className="preview-page">
          <div className="preview-nav">
            <div className="flex items-center gap-1.5">
              <div className="preview-logo">{template.initials}</div>
              <div>
                <div className="preview-brand">YOUR COLLEGE</div>
                <div className="preview-subbrand">LEARN · LEAD · GROW</div>
              </div>
            </div>
            <div className="preview-links">
              <span>About</span>
              <span>Courses</span>
              <span>Campus</span>
            </div>
          </div>

          <div className="preview-hero">
            <div className="preview-copy">
              <span className="preview-kicker">YOUR FUTURE STARTS HERE</span>
              <div className="preview-heading">
                Discover
                <br />
                what&apos;s <span>possible.</span>
              </div>
              <div className="preview-description">
                An extraordinary place to learn, grow and make a difference.
              </div>
              <div className="preview-cta">Explore programs ↗</div>
            </div>

            <div className="preview-visual">
              <div className="preview-orbit orbit-one" />
              <div className="preview-orbit orbit-two" />
              <div className="preview-monogram">{template.initials}</div>
              <div className="preview-stat">
                <span>EXCELLENCE</span>
                <strong>Since 1998</strong>
              </div>
            </div>
          </div>

          <div className="preview-bottom">
            <div>
              <strong>25+</strong>
              <span>Programs</span>
            </div>
            <div>
              <strong>40+</strong>
              <span>Faculty</span>
            </div>
            <div>
              <strong>95%</strong>
              <span>Success</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-14 rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-slate-700 shadow-sm backdrop-blur">
        <Sparkles size={11} className="mr-1 inline text-blue-600" />
        Live preview
      </div>
    </div>
  )
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All templates')
  const [search, setSearch] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null,
  )
  const [customizingTemplate, setCustomizingTemplate] =
    useState<Template | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFavorites, setShowFavorites] = useState(false)

  // Holds the settings used by the complete generated website.
  const [generatedWebsite, setGeneratedWebsite] =
    useState<GeneratedWebsiteProps | null>(null)

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategory =
        activeCategory === 'All templates' ||
        template.category === activeCategory

      const matchesSearch =
        `${template.name} ${template.category} ${template.description}`
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesFavorites =
        !showFavorites || favorites.includes(template.id)

      return matchesCategory && matchesSearch && matchesFavorites
    })
  }, [activeCategory, search, favorites, showFavorites])

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const startCustomization = (template: Template) => {
    setSelectedTemplate(null)
    setCustomizingTemplate(template)
  }

  // Show the full website instead of the studio when preview is requested.
  if (generatedWebsite) {
    return (
      <GeneratedWebsite
        {...generatedWebsite}
        onBack={() => setGeneratedWebsite(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a className="transition hover:text-blue-600" href="#templates">
              Templates
            </a>
            <a className="transition hover:text-blue-600" href="#features">
              Features
            </a>
            <a className="transition hover:text-blue-600" href="#how-it-works">
              How it works
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => {
                setShowFavorites(!showFavorites)
                document
                  .getElementById('templates')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Saved ({favorites.length})
            </button>
            <a
              href="#templates"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Explore templates <ArrowRight className="ml-1 inline" size={16} />
            </a>
          </div>

          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {mobileMenu && (
          <nav className="flex flex-col gap-1 border-t border-slate-100 bg-white p-4 md:hidden">
            {[
              ['Templates', '#templates'],
              ['Features', '#features'],
              ['How it works', '#how-it-works'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenu(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero-grid relative overflow-hidden border-b border-slate-100">
          <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-violet-100/60 blur-3xl" />

          <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24">
            <div className="max-w-[600px]">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-xs font-semibold text-blue-700 shadow-sm">
                <Sparkles size={14} />
                A smarter way to build college websites
                <ArrowUpRight size={13} />
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[64px]">
                Your college.
                <br />
                Your identity.
                <br />
                <span className="text-blue-600">Your website.</span>
              </h1>

              <p className="mt-6 max-w-[490px] text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Beautiful college websites, without the complexity. Explore
                ready-made designs, make them your own, and bring your
                institution online.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#templates"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  Find your template <ArrowRight className="ml-2" size={17} />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  See how it works <ArrowDownRight size={17} />
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Check size={15} className="text-green-600" /> Easy to
                  customize
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={15} className="text-green-600" /> Mobile
                  friendly
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={15} className="text-green-600" /> Made for
                  colleges
                </span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-blue-100 via-violet-100 to-cyan-100 opacity-80 blur-2xl" />
              <div className="relative rounded-[24px] border border-white bg-white/80 p-3 shadow-2xl shadow-slate-300/40 sm:p-4">
                <div className="flex items-center justify-between px-2 pb-4 pt-1">
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Your next college website
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      A first look at what&apos;s possible
                    </p>
                  </div>
                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">
                    DESIGN PREVIEW
                  </span>
                </div>

                <TemplatePreview template={templates[0]} />

                <div className="flex items-center justify-between gap-3 px-2 pb-1 pt-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <LayoutTemplate size={18} />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Northstar Institute
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        Engineering template
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => startCustomization(templates[0])}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    Try it <ArrowUpRight className="ml-1 inline" size={13} />
                  </button>
                </div>
              </div>

              <div className="absolute -left-3 top-24 hidden items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xl sm:flex lg:-left-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <Palette size={18} />
                </span>
                <div>
                  <p className="text-xs font-bold">Your colors</p>
                  <p className="text-[10px] text-slate-500">
                    Your brand, your way
                  </p>
                </div>
              </div>

              <div className="absolute -right-2 bottom-20 hidden items-center gap-2 rounded-xl border border-slate-100 bg-white p-3 shadow-xl sm:flex lg:-right-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <p className="text-xs font-bold">Made to fit</p>
                  <p className="text-[10px] text-slate-500">
                    Desktop & mobile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-7 px-5 py-8 sm:px-8 md:grid-cols-4">
            {[
              { value: '01', label: 'Choose a design' },
              { value: '02', label: 'Add your identity' },
              { value: '03', label: 'Preview every page' },
              { value: '04', label: 'Share your demo' },
            ].map((item) => (
              <div key={item.value} className="flex items-center gap-3">
                <span className="text-sm font-extrabold text-blue-600">
                  {item.value}
                </span>
                <span className="text-xs font-semibold text-slate-600 sm:text-sm">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="templates"
          className="scroll-mt-24 bg-[#f8fafc] px-5 py-16 sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  THE TEMPLATE LIBRARY
                </span>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  Find your college&apos;s look.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Explore different visual styles, each designed around the
                  way an institution wants to present itself.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 md:self-auto">
                <LayoutTemplate size={16} className="text-blue-600" />
                {templates.length} design concepts
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2.5 text-xs font-bold transition sm:text-sm ${
                      activeCategory === category
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <label className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 lg:w-[230px]">
                  <Search size={17} className="shrink-0 text-slate-400" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search templates..."
                    aria-label="Search templates"
                    className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </label>

                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-3 text-xs font-bold transition ${
                    showFavorites
                      ? 'border-pink-200 bg-pink-50 text-pink-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Heart
                    size={15}
                    fill={showFavorites ? 'currentColor' : 'none'}
                  />
                  Saved
                  <ChevronDown size={13} />
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredTemplates.map((template) => (
                <article
                  key={template.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div className="relative">
                    <TemplatePreview template={template} />
                    <button
                      onClick={() => toggleFavorite(template.id)}
                      aria-label={
                        favorites.includes(template.id)
                          ? 'Remove saved template'
                          : 'Save template'
                      }
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-slate-500 shadow-sm backdrop-blur transition hover:scale-105 hover:text-pink-600"
                    >
                      <Heart
                        size={16}
                        fill={
                          favorites.includes(template.id)
                            ? 'currentColor'
                            : 'none'
                        }
                        className={
                          favorites.includes(template.id)
                            ? 'text-pink-600'
                            : ''
                        }
                      />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-700">
                        {template.category}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400">
                        Concept {String(template.id).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900">
                      {template.name}
                    </h3>
                    <p className="mt-2 min-h-[42px] text-sm leading-6 text-slate-500">
                      {template.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {template.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                      <button
                        onClick={() => setSelectedTemplate(template)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        Preview <ArrowUpRight size={14} />
                      </button>
                      <button
                        onClick={() => startCustomization(template)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
                      >
                        Customize <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                <Search className="mx-auto text-slate-400" size={30} />
                <h3 className="mt-4 text-lg font-bold text-slate-800">
                  No templates found
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try another search or clear your filters.
                </p>
                <button
                  onClick={() => {
                    setSearch('')
                    setActiveCategory('All templates')
                    setShowFavorites(false)
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="features" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[1240px]">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                WHY CAMPUSFLOW
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Everything starts with a better website.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                A simple starting point for colleges that want to present their
                identity clearly and professionally.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Palette,
                  title: 'Make it your own',
                  description:
                    'Customize your college identity, colors, content and visual style.',
                  color: 'bg-violet-50 text-violet-600',
                },
                {
                  icon: Monitor,
                  title: 'Responsive by design',
                  description:
                    'Create layouts intended to work across desktop, tablet and mobile.',
                  color: 'bg-blue-50 text-blue-600',
                },
                {
                  icon: Zap,
                  title: 'Start with a template',
                  description:
                    'Skip the blank page and begin with a structured website design.',
                  color: 'bg-amber-50 text-amber-600',
                },
                {
                  icon: Code2,
                  title: 'Built for the web',
                  description:
                    'Explore modern web design patterns in a clean, organized experience.',
                  color: 'bg-green-50 text-green-600',
                },
                {
                  icon: Stethoscope,
                  title: 'Made for institutions',
                  description:
                    'Explore concepts for engineering, medical, management and other colleges.',
                  color: 'bg-pink-50 text-pink-600',
                },
                {
                  icon: ShieldCheck,
                  title: 'A clear preview',
                  description:
                    'Review the design concept before making it your own.',
                  color: 'bg-cyan-50 text-cyan-700',
                },
              ].map((feature) => {
                const Icon = feature.icon

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-slate-200/80 bg-white p-6 transition hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/40"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                    >
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-base font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-24"
        >
          <div className="mx-auto max-w-[1240px]">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                  SIMPLE BY DESIGN
                </span>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                  From an idea to
                  <br />
                  a college website.
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
                  Start with a design that fits your institution. The next
                  step is making the content and identity your own.
                </p>
                <a
                  href="#templates"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-blue-50"
                >
                  Explore the gallery <ArrowRight size={16} />
                </a>
              </div>

              <div className="space-y-4">
                {[
                  {
                    number: '01',
                    title: 'Choose your design',
                    description:
                      'Browse layouts for different kinds of institutions.',
                  },
                  {
                    number: '02',
                    title: 'Add your college identity',
                    description:
                      'Set the college name, branding and institutional details.',
                  },
                  {
                    number: '03',
                    title: 'Preview and share',
                    description:
                      'Review your customized website and prepare it for sharing.',
                  },
                ].map((step) => (
                  <div
                    key={step.number}
                    className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.07] sm:p-6"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-sm font-extrabold text-blue-300">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full border-[45px] border-white/10" />
            <div className="relative">
              <Sparkles className="mx-auto mb-5" size={28} />
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Your next great website starts here.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                Find a design that fits your college and explore what your
                digital presence could look like.
              </p>
              <a
                href="#templates"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Browse templates <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Logo />
          <p className="text-xs leading-5 text-slate-500">
            A college website design platform concept.
            <br className="sm:hidden" /> Built with care for modern campuses.
          </p>
          <a
            href="#"
            className="text-xs font-semibold text-slate-500 transition hover:text-blue-600"
          >
            Back to top ↑
          </a>
        </div>
      </footer>

      {selectedTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-dialog-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-xs font-semibold text-blue-600">
                  TEMPLATE PREVIEW
                </p>
                <h2
                  id="template-dialog-title"
                  className="mt-1 text-lg font-bold text-slate-900"
                >
                  {selectedTemplate.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTemplate(null)}
                aria-label="Close preview"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <TemplatePreview template={selectedTemplate} />
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {selectedTemplate.description} This is a demo design concept,
                ready for the next customization step.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selectedTemplate.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <button
                onClick={() => startCustomization(selectedTemplate)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Choose this template <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {customizingTemplate && (
        <Customizer
          key={customizingTemplate.id}
          template={customizingTemplate}
          onClose={() => setCustomizingTemplate(null)}
          onPreview={(settings) => setGeneratedWebsite(settings)}
        />
      )}
    </div>
  )
}

export default App
