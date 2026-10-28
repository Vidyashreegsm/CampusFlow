
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Menu,
  X,
  Users,
  Award,
  Building2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export type GeneratedWebsiteProps = {
  collegeName: string;
  tagline: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  departments: string[];
  buttonText: string;
  onBack?: () => void;
};

export default function GeneratedWebsite({
  collegeName,
  tagline,
  description,
  primaryColor,
  accentColor,
  departments,
  buttonText,
  onBack,
}: GeneratedWebsiteProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const openEnquiryForm = () => {
    setSubmitted(false);
    setShowEnquiryForm(true);
  };

  const closeEnquiryForm = () => {
    setShowEnquiryForm(false);
    setSubmitted(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      department: "",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const safeDepartments =
    departments?.length > 0
      ? departments
      : ["Computer Science", "Electronics", "Mechanical"];

  return (
    <div
      className="min-h-screen bg-white text-slate-900"
      style={
        {
          "--college-primary": primaryColor || "#172554",
          "--college-accent": accentColor || "#f59e0b",
        } as React.CSSProperties
      }
    >
      <style>{`
        .college-primary {
          background-color: var(--college-primary);
        }
        .college-primary-text {
          color: var(--college-primary);
        }
        .college-accent {
          background-color: var(--college-accent);
        }
        .college-accent-text {
          color: var(--college-accent);
        }
        .college-border {
          border-color: var(--college-primary);
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Top announcement bar */}
      <div className="college-primary px-5 py-3 text-center text-sm text-white">
        Admissions are open — Start your journey with us today.
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <button
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 text-left"
          >
            <div className="college-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
              <GraduationCap size={27} />
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-tight">
                {collegeName || "Your College"}
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Education · Excellence · Innovation
              </p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {["Home", "About", "Departments", "Admissions"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                {item}
              </button>
            ))}
            <button
              onClick={openEnquiryForm}
              className="college-primary rounded-xl px-5 py-3 text-sm font-bold text-white transition hover:opacity-90"
            >
              Apply Now
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 sm:block"
              >
                Back to Editor
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-xl border border-slate-200 p-2 md:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-slate-200 bg-white p-5 md:hidden">
            {["Home", "About", "Departments", "Admissions"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="block w-full rounded-lg px-3 py-3 text-left font-semibold hover:bg-slate-50"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                openEnquiryForm();
              }}
              className="college-primary mt-3 w-full rounded-xl px-4 py-3 font-bold text-white"
            >
              Apply Now
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-semibold"
              >
                Back to Editor
              </button>
            )}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(120deg, #0f172a 0%, #1e293b 55%, #334155 100%)",
        }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-2 lg:px-8">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: accentColor || "#f59e0b" }}
              />
              Building tomorrow's leaders
            </div>

            <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover Your Potential.
              <span
                className="mt-2 block"
                style={{ color: accentColor || "#f59e0b" }}
              >
                Define Your Future.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              {tagline ||
                "A place where ambition meets opportunity and futures take shape."}
            </p>

            <p className="mt-4 max-w-xl leading-7 text-slate-400">
              {description ||
                "Discover exceptional learning, inspiring mentors, and opportunities to turn your ambitions into achievements."}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={openEnquiryForm}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-4 font-bold text-slate-950 transition hover:opacity-90"
                style={{ backgroundColor: accentColor || "#f59e0b" }}
              >
                {buttonText || "Explore Admissions"}
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => scrollTo("departments")}
                className="rounded-xl border border-white/30 px-6 py-4 font-bold text-white transition hover:bg-white/10"
              >
                Explore Courses
              </button>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-5 border-t border-white/15 pt-7">
              <div>
                <p className="text-3xl font-black text-white">20+</p>
                <p className="mt-1 text-sm text-slate-400">Years of learning</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">15+</p>
                <p className="mt-1 text-sm text-slate-400">Departments</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">95%</p>
                <p className="mt-1 text-sm text-slate-400">Career focus</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-5 rounded-3xl opacity-20 blur-3xl"
              style={{ backgroundColor: accentColor || "#f59e0b" }}
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
                alt="University campus building"
                className="h-[320px] w-full rounded-2xl object-cover sm:h-[430px]"
              />
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-white/95 p-5 shadow-xl backdrop-blur">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{
                      backgroundColor: primaryColor || "#172554",
                    }}
                  >
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">
                      Learn without limits
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Knowledge for a brighter tomorrow.
                    </p>
                  </div>
                  <ArrowUpRight
                    className="ml-auto shrink-0 text-slate-500"
                    size={22}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="college-accent-text text-sm font-extrabold uppercase tracking-[0.2em]">
              Welcome to {collegeName || "Our College"}
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
              More than a college.
              <span className="college-primary-text block">
                A place to belong.
              </span>
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              {description ||
                "We believe education is about more than a degree. It is about building confidence, developing practical skills, and preparing students to make a difference."}
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              Our learning environment encourages curiosity, collaboration,
              creativity, and lifelong learning. Students are supported as they
              explore their interests and prepare for the world ahead.
            </p>
            <button
              onClick={() => scrollTo("departments")}
              className="college-primary mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold text-white hover:opacity-90"
            >
              Discover Our Programs <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                icon: Users,
                title: "Student First",
                text: "A supportive learning community",
              },
              {
                icon: Award,
                title: "Excellence",
                text: "A culture of continuous improvement",
              },
              {
                icon: Building2,
                title: "Modern Campus",
                text: "Spaces designed for collaboration",
              },
              {
                icon: BookOpen,
                title: "Future Ready",
                text: "Skills for tomorrow's opportunities",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                    style={{
                      backgroundColor: primaryColor || "#172554",
                    }}
                  >
                    <Icon size={23} />
                  </div>
                  <h3 className="font-extrabold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section
        id="departments"
        className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="college-accent-text text-sm font-extrabold uppercase tracking-[0.2em]">
              Academic Programs
            </p>
            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Find Your Path
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Explore our departments and find a program that matches your
              interests, strengths, and future ambitions.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {safeDepartments.map((department, index) => (
              <article
                key={`${department}-${index}`}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white transition group-hover:scale-105"
                  style={{
                    backgroundColor: index % 2 === 0
                      ? primaryColor || "#172554"
                      : accentColor || "#f59e0b",
                  }}
                >
                  <GraduationCap size={27} />
                </div>
                <h3 className="text-xl font-extrabold">{department}</h3>
                <p className="mt-3 leading-7 text-slate-500">
                  Build your knowledge, gain practical experience, and prepare
                  for new opportunities in your chosen field.
                </p>
                <button
                  onClick={openEnquiryForm}
                  className="college-primary-text mt-5 inline-flex items-center gap-2 font-bold"
                >
                  Enquire now <ArrowRight size={17} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section
        id="admissions"
        className="scroll-mt-24 px-5 py-20 lg:px-8"
      >
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-3xl px-7 py-12 text-white sm:px-12 sm:py-16"
          style={{
            background: `linear-gradient(120deg, ${primaryColor || "#172554"}, #0f172a)`,
          }}
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p
                className="text-sm font-extrabold uppercase tracking-[0.2em]"
                style={{ color: accentColor || "#f59e0b" }}
              >
                Your future starts here
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-black sm:text-4xl">
                Take the first step toward your dream career.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Tell us a little about yourself. Our demo enquiry form will
                help you explore the next step in your college journey.
              </p>
            </div>

            <button
              onClick={openEnquiryForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-extrabold text-slate-950 transition hover:opacity-90"
              style={{ backgroundColor: accentColor || "#f59e0b" }}
            >
              {buttonText || "Explore Admissions"}
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="college-primary px-5 py-12 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <GraduationCap size={32} />
              <h2 className="text-xl font-extrabold">
                {collegeName || "Your College"}
              </h2>
            </div>
            <p className="mt-4 max-w-sm leading-7 text-white/70">
              {tagline ||
                "Inspiring minds, creating opportunities, and shaping the future."}
            </p>
          </div>

          <div>
            <h3 className="font-extrabold">Quick Links</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/70">
              {["Home", "About", "Departments", "Admissions"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-left transition hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-extrabold">Contact Information</h3>
            <p className="mt-4 flex items-center gap-3 text-sm text-white/70">
              <MapPin size={17} /> Your College Campus, India
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm text-white/70">
              <Mail size={17} /> admissions@example.com
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm text-white/70">
              <Phone size={17} /> +91 98765 43210
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-6 text-center text-sm text-white/60">
          © {new Date().getFullYear()} {collegeName || "Your College"}. Demo
          website template.
        </div>
      </footer>

      {/* Admissions enquiry modal */}
      {showEnquiryForm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEnquiryForm();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white"
                  style={{
                    backgroundColor: primaryColor || "#172554",
                  }}
                >
                  {submitted ? (
                    <CheckCircle2 size={26} />
                  ) : (
                    <GraduationCap size={26} />
                  )}
                </div>
                <h2
                  id="enquiry-title"
                  className="text-2xl font-black text-slate-900"
                >
                  {submitted ? "Enquiry Submitted!" : "Admissions Enquiry"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {submitted
                    ? "Your demo enquiry has been completed successfully."
                    : `Interested in studying at ${collegeName || "our college"}? Fill in the details below.`}
                </p>
              </div>

              <button
                onClick={closeEnquiryForm}
                aria-label="Close enquiry form"
                className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={22} />
              </button>
            </div>

            {submitted ? (
              <div className="mt-7">
                <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                  <CheckCircle2
                    className="mb-3 text-green-600"
                    size={30}
                  />
                  <p className="font-bold text-green-900">
                    Thank you, {formData.fullName}!
                  </p>
                  <p className="mt-2 text-sm leading-6 text-green-800">
                    Your enquiry for{" "}
                    <strong>{formData.department}</strong> has been recorded
                    in this demo session.
                  </p>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Demo only: this form does not send an email or save data to a
                  server.
                </p>

                <button
                  onClick={closeEnquiryForm}
                  className="college-primary mt-6 w-full rounded-xl px-5 py-4 font-bold text-white transition hover:opacity-90"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Full Name
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        fullName: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    minLength={10}
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        phone: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-department"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Interested Department
                  </label>
                  <select
                    id="enquiry-department"
                    required
                    value={formData.department}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        department: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  >
                    <option value="">Select a department</option>
                    {safeDepartments.map((department, index) => (
                      <option key={`${department}-${index}`} value={department}>
                        {department}
                      </option>
                    ))}
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="college-primary flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 font-extrabold text-white transition hover:opacity-90"
                >
                  Submit Enquiry <ArrowRight size={18} />
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  This is a frontend demo. Your information is not sent to a
                  college or saved to a database.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
