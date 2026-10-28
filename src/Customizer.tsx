
import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  GraduationCap,
  Monitor,
  RotateCcw,
  Save,
  Smartphone,
  Sparkles,
  X,
  Globe,
} from 'lucide-react'

import type { GeneratedWebsiteProps } from './GeneratedWebsite'

type TemplateData = {
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

type CustomizerProps = {
  template: TemplateData
  onClose: () => void
  onPreview: (settings: Omit<GeneratedWebsiteProps, 'onBack'>) => void
}

type Draft = {
  templateId: number
  templateName: string
  collegeName: string
  tagline: string
  description: string
  primaryColor: string
  accentColor: string
  departments: string[]
  buttonText: string
  updatedAt: string
}

const defaults = {
  collegeName: '',
  tagline: 'Discover your potential. Shape your future.',
  description: '',
  primaryColor: '#123d35',
  accentColor: '#d5f27b',
  departments:
    'Computer Science and Engineering\nArtificial Intelligence and Machine Learning\nElectronics and Communication',
  buttonText: 'Explore programs',
}

function loadDraft(templateId: number): Draft | null {
  try {
    const saved = localStorage.getItem(`campusflow-draft-${templateId}`)
    if (!saved) return null

    const parsed: unknown = JSON.parse(saved)
    if (!parsed || typeof parsed !== 'object') return null

    const draft = parsed as Partial<Draft>

    if (
      draft.templateId !== templateId ||
      typeof draft.collegeName !== 'string' ||
      typeof draft.tagline !== 'string' ||
      typeof draft.description !== 'string' ||
      typeof draft.primaryColor !== 'string' ||
      typeof draft.accentColor !== 'string' ||
      !Array.isArray(draft.departments) ||
      !draft.departments.every((item) => typeof item === 'string') ||
      typeof draft.buttonText !== 'string'
    ) {
      return null
    }

    return {
      templateId,
      templateName:
        typeof draft.templateName === 'string' ? draft.templateName : '',
      collegeName: draft.collegeName,
      tagline: draft.tagline,
      description: draft.description,
      primaryColor: draft.primaryColor,
      accentColor: draft.accentColor,
      departments: draft.departments,
      buttonText: draft.buttonText,
      updatedAt:
        typeof draft.updatedAt === 'string' ? draft.updatedAt : '',
    }
  } catch {
    return null
  }
}

export function Customizer({
  template,
  onClose,
  onPreview,
}: CustomizerProps) {
  const initialValues = {
    ...defaults,
    collegeName: template.name,
    description: template.description,
    primaryColor: template.color,
    accentColor: template.accent,
  }

  const [restoredDraft] = useState<Draft | null>(() =>
    loadDraft(template.id),
  )

  const [collegeName, setCollegeName] = useState(
    restoredDraft?.collegeName ?? initialValues.collegeName,
  )
  const [tagline, setTagline] = useState(
    restoredDraft?.tagline ?? initialValues.tagline,
  )
  const [description, setDescription] = useState(
    restoredDraft?.description ?? initialValues.description,
  )
  const [primaryColor, setPrimaryColor] = useState(
    restoredDraft?.primaryColor ?? initialValues.primaryColor,
  )
  const [accentColor, setAccentColor] = useState(
    restoredDraft?.accentColor ?? initialValues.accentColor,
  )
  const [departments, setDepartments] = useState(
    restoredDraft?.departments.join('\n') ?? initialValues.departments,
  )
  const [buttonText, setButtonText] = useState(
    restoredDraft?.buttonText ?? initialValues.buttonText,
  )
  const [saved, setSaved] = useState(Boolean(restoredDraft))
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')

  const departmentList = departments
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)

  const getWebsiteSettings = (): Omit<
    GeneratedWebsiteProps,
    'onBack'
  > => ({
    collegeName: collegeName.trim() || 'Your College Name',
    tagline: tagline.trim() || 'Discover your future with us.',
    description:
      description.trim() || 'Welcome to our college website.',
    primaryColor,
    accentColor,
    departments: departmentList,
    buttonText: buttonText.trim() || 'Explore programs',
  })

  const reset = () => {
    setCollegeName(initialValues.collegeName)
    setTagline(initialValues.tagline)
    setDescription(initialValues.description)
    setPrimaryColor(initialValues.primaryColor)
    setAccentColor(initialValues.accentColor)
    setDepartments(initialValues.departments)
    setButtonText(initialValues.buttonText)
    setSaved(false)
  }

  const saveDraft = () => {
    const draft: Draft = {
      templateId: template.id,
      templateName: template.name,
      collegeName,
      tagline,
      description,
      primaryColor,
      accentColor,
      departments: departmentList,
      buttonText,
      updatedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(
        `campusflow-draft-${template.id}`,
        JSON.stringify(draft),
      )
      setSaved(true)
    } catch {
      window.alert(
        'Unable to save this draft in your browser. Check your browser storage settings.',
      )
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-slate-100">
      <header className="flex min-h-[68px] items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50"
            aria-label="Back to templates"
          >
            <ArrowLeft size={19} />
          </button>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <GraduationCap size={21} />
          </span>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-extrabold text-slate-900 sm:text-base">
              CampusFlow Studio
            </h1>
            <p className="truncate text-xs text-slate-500">
              Editing {template.name}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={reset}
            className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 sm:flex"
          >
            <RotateCcw size={14} /> Reset
          </button>

          <button
            onClick={saveDraft}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 sm:px-4"
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            {saved ? 'Saved locally' : 'Save draft'}
          </button>

          <button
            onClick={() => onPreview(getWebsiteSettings())}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-slate-700 sm:px-4"
            title="Preview your complete college website"
          >
            <Globe size={15} />
            <span className="hidden sm:inline">Preview Website</span>
            <span className="sm:hidden">Preview</span>
          </button>

          <button
            onClick={onClose}
            aria-label="Close editor"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="min-h-0 overflow-y-auto border-b border-slate-200 bg-white p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
              WEBSITE SETTINGS
            </span>

            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
              Make it yours.
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Change the details and see your college website update instantly.
            </p>

            {restoredDraft && (
              <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                Your saved draft was restored from this browser.
              </p>
            )}
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-700">
                College name
              </span>
              <input
                value={collegeName}
                onChange={(event) => {
                  setCollegeName(event.target.value)
                  setSaved(false)
                }}
                maxLength={80}
                placeholder="Enter your college name"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-700">
                Tagline
              </span>
              <input
                value={tagline}
                onChange={(event) => {
                  setTagline(event.target.value)
                  setSaved(false)
                }}
                maxLength={120}
                placeholder="Your inspiring college tagline"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-700">
                About your college
              </span>
              <textarea
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                  setSaved(false)
                }}
                maxLength={600}
                rows={4}
                placeholder="Write a short introduction..."
                className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
              <span className="mt-1 block text-right text-[10px] text-slate-400">
                {description.length}/600
              </span>
            </label>

            <div>
              <span className="mb-3 block text-xs font-bold text-slate-700">
                Brand colors
              </span>

              <div className="grid grid-cols-2 gap-3">
                <label className="rounded-xl border border-slate-200 p-3">
                  <span className="mb-2 block text-[11px] text-slate-500">
                    Primary
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(event) => {
                        setPrimaryColor(event.target.value)
                        setSaved(false)
                      }}
                      aria-label="Primary brand color"
                      className="h-9 w-9 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                    />
                    <span className="text-xs font-semibold uppercase text-slate-700">
                      {primaryColor}
                    </span>
                  </div>
                </label>

                <label className="rounded-xl border border-slate-200 p-3">
                  <span className="mb-2 block text-[11px] text-slate-500">
                    Accent
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(event) => {
                        setAccentColor(event.target.value)
                        setSaved(false)
                      }}
                      aria-label="Accent brand color"
                      className="h-9 w-9 cursor-pointer rounded-lg border-0 bg-transparent p-0"
                    />
                    <span className="text-xs font-semibold uppercase text-slate-700">
                      {accentColor}
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-700">
                Departments
              </span>
              <span className="mb-2 block text-xs leading-5 text-slate-500">
                Enter one department per line.
              </span>
              <textarea
                value={departments}
                onChange={(event) => {
                  setDepartments(event.target.value)
                  setSaved(false)
                }}
                rows={5}
                maxLength={1500}
                placeholder={'Computer Science\nMechanical Engineering'}
                className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold text-slate-700">
                Main button text
              </span>
              <input
                value={buttonText}
                onChange={(event) => {
                  setButtonText(event.target.value)
                  setSaved(false)
                }}
                maxLength={40}
                placeholder="Explore programs"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </label>

            <button
              onClick={reset}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:hidden"
            >
              <RotateCcw size={15} /> Reset to template defaults
            </button>

            <button
              onClick={() => onPreview(getWebsiteSettings())}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 sm:hidden"
            >
              <Globe size={16} /> Preview Complete Website
            </button>

            <p className="rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
              Demo mode: drafts are saved in this browser only. No public
              website is published yet.
            </p>
          </div>
        </aside>

        <main className="min-h-0 overflow-y-auto p-4 sm:p-7 lg:p-9">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Live website preview
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Changes appear as you type.
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${
                    device === 'desktop'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Monitor size={14} /> Desktop
                </button>

                <button
                  onClick={() => setDevice('mobile')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold ${
                    device === 'mobile'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Smartphone size={14} /> Mobile
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
              <div
                className={`mx-auto overflow-hidden rounded-xl border border-slate-200 transition-all duration-300 ${
                  device === 'mobile' ? 'max-w-[375px]' : 'w-full'
                }`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-7">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black"
                      style={{
                        backgroundColor: primaryColor,
                        color: accentColor,
                      }}
                    >
                      {collegeName.trim().slice(0, 2).toUpperCase() || 'CF'}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-sm font-extrabold text-slate-900">
                        {collegeName || 'Your College Name'}
                      </span>
                      <span className="block text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                        Excellence in education
                      </span>
                    </span>
                  </div>

                  {device === 'desktop' && (
                    <nav className="flex items-center gap-4 text-[11px] font-semibold text-slate-500">
                      <span>About</span>
                      <span>Academics</span>
                      <span>Campus</span>
                    </nav>
                  )}
                </div>

                <section
                  className="relative overflow-hidden px-5 py-10 sm:px-9 sm:py-14"
                  style={{
                    backgroundColor: primaryColor,
                    color: '#ffffff',
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] opacity-10"
                    style={{ borderColor: accentColor }}
                  />

                  <div
                    className="pointer-events-none absolute -bottom-20 right-20 h-48 w-48 rounded-full border opacity-20"
                    style={{ borderColor: accentColor }}
                  />

                  <div className="relative max-w-xl">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: accentColor,
                        color: primaryColor,
                      }}
                    >
                      <Sparkles size={12} /> Welcome to our campus
                    </span>

                    <h1 className="mt-6 break-words text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                      {collegeName || 'Your College Name'}
                    </h1>

                    <p
                      className="mt-4 max-w-lg text-sm leading-7 sm:text-base"
                      style={{ color: '#ffffffd9' }}
                    >
                      {tagline || 'Discover your future with us.'}
                    </p>

                    <p
                      className="mt-3 max-w-lg text-xs leading-6 sm:text-sm"
                      style={{ color: '#ffffffbd' }}
                    >
                      {description || 'Add your college introduction here.'}
                    </p>

                    <button
                      className="mt-6 rounded-lg px-5 py-3 text-xs font-extrabold transition hover:opacity-90"
                      style={{
                        backgroundColor: accentColor,
                        color: primaryColor,
                      }}
                    >
                      {buttonText || 'Explore programs'} →
                    </button>
                  </div>
                </section>

                <section className="grid grid-cols-3 border-b border-slate-100 px-3 py-5 sm:px-7">
                  {[
                    ['25+', 'Academic programs'],
                    ['40+', 'Expert faculty'],
                    ['95%', 'Student success'],
                  ].map(([value, label]) => (
                    <div key={label} className="px-2 text-center">
                      <p
                        className="text-xl font-black sm:text-2xl"
                        style={{ color: primaryColor }}
                      >
                        {value}
                      </p>
                      <p className="mt-1 text-[9px] leading-4 text-slate-500 sm:text-xs">
                        {label}
                      </p>
                    </div>
                  ))}
                </section>

                <section className="bg-white px-5 py-8 sm:px-8 sm:py-10">
                  <div className="text-center">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-[0.18em]"
                      style={{ color: primaryColor }}
                    >
                      OUR ACADEMICS
                    </span>

                    <h2 className="mt-2 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                      Explore our departments
                    </h2>

                    <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-500">
                      Discover the subjects and opportunities that shape your
                      future.
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {departmentList.slice(0, 8).map((department, index) => (
                      <div
                        key={`${department}-${index}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5"
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-black"
                          style={{
                            backgroundColor: `${accentColor}40`,
                            color: primaryColor,
                          }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="text-xs font-bold leading-5 text-slate-700">
                          {department}
                        </span>
                      </div>
                    ))}
                  </div>

                  {departmentList.length === 0 && (
                    <p className="mt-5 text-center text-xs text-slate-400">
                      Add departments in the editor to display them here.
                    </p>
                  )}
                </section>

                <footer
                  className="px-5 py-5 text-center text-xs"
                  style={{
                    backgroundColor: primaryColor,
                    color: '#ffffff',
                  }}
                >
                  © {new Date().getFullYear()} {collegeName || 'Your College'}.
                  <span className="ml-1 opacity-70">
                    Demo website preview.
                  </span>
                </footer>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
              <Check size={15} className="mt-0.5 shrink-0 text-green-600" />
              This preview uses your current settings. Save draft stores the
              configuration locally in this browser.
            </p>

            <button
              onClick={() => onPreview(getWebsiteSettings())}
              className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              <Globe size={17} />
              Open Complete College Website
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
