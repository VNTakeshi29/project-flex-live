"use client";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

export default function Home() {
  const [bgmActive, setBgmActive] = useState(false);
  const [logoText, setLogoText] = useState("TAKESHI.exe");
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Logo hover effect
  const handleLogoHover = () => {
    if (intervalRef.current !== null) return;

    const originalText = "TAKESHI.exe";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%";
    let iterations = 0;

    intervalRef.current = window.setInterval(() => {
      setLogoText((prev) =>
        prev
          .split("")
          .map((letter, index) => {
            if (index < iterations) return originalText[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iterations >= originalText.length) {
        if (intervalRef.current !== null) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
      iterations += 1 / 3;
    }, 30);
  };

  const toggleBgm = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (bgmActive) {
      audio.pause();
      setBgmActive(false);
    } else {
      audio.volume = 0.3;
      audio.play().then(() => {
        setBgmActive(true);
      }).catch(() => {
        console.warn("Audio play blocked by browser");
      });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      audio.pause();
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#070912] text-[#dce4f1] font-sans antialiased selection:bg-[#ff4fd8] selection:text-white">
      <div className="pointer-events-none absolute left-[-10%] top-16 h-96 w-96 rounded-full bg-[#46f3ff]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#ff4fd8]/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-16 bottom-0 h-96 rounded-full bg-[#8b5cff]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(70,243,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,79,216,0.05),transparent_25%)] opacity-70" />

      {/* Background BGM Track */}
      <audio ref={audioRef} loop playsInline src="/music.mp3" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#090b12]/80 backdrop-blur-xl shadow-soft md:px-16">
        <div 
          className="font-mono text-xl font-bold tracking-[0.24em] text-[#7dd3fc] drop-shadow-[0_0_12px_rgba(70,243,255,0.4)] cursor-pointer transition hover:text-[#46f3ff]"
          onMouseEnter={handleLogoHover}
        >
          {logoText}
        </div>
        <ul className="hidden items-center space-x-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#cbd5e1] md:flex">
          <li><a href="#about" className="transition hover:text-[#ff4fd8]">/about</a></li>
          <li><a href="#projects" className="transition hover:text-[#ff4fd8]">/projects</a></li>
          <li><a href="#contact" className="transition hover:text-[#ff4fd8]">/contact</a></li>
        </ul>
        <button 
          onClick={toggleBgm}
          className={`px-4 py-2 font-bold transition-all border rounded border-[#ff007f] text-[#ff007f] hover:bg-[#ff007f] hover:text-white ${bgmActive ? 'bg-[#ff007f] text-white shadow-[0_0_15px_#ff007f]' : ''}`}
        >
          {bgmActive ? "🎵 BGM: ON" : "🔇 BGM: OFF"}
        </button>
      </nav>

      {/* HERO SECTION */}
      <header id="about" className="flex flex-col-reverse items-center justify-between px-6 py-16 min-h-[85vh] md:flex-row md:px-16 gap-12 sm:gap-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#46f3ff]/20 bg-[#46f3ff]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#46f3ff] shadow-[0_0_24px_rgba(70,243,255,0.12)]">
            🚀 SYSTEM READY
          </span>
          <h1 className="relative my-6 font-display text-5xl font-extrabold tracking-tight text-white md:text-7xl">
            TAKE<span className="text-[#7dd3fc]">SHI</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-xl leading-snug text-[#d1d9e6]/90">
            Software engineer building refined tooling, community operations, and sleek web experiences.
          </p>
          <p className="text-[#a0aec0] leading-relaxed mb-8 max-w-2xl">
            "Spring will be here soon. Spring, the season I met you, is coming. A Spring without you…is coming." - <span className="italic text-[#7dd3fc]">Kousei Arima</span>
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="inline-flex items-center justify-center rounded-full bg-[#ff4fd8] px-6 py-3 text-sm font-semibold text-white shadow-glow transition duration-200 hover:-translate-y-1 hover:bg-[#ff70b5]">
              View Projects
            </a>
            <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-[#7dd3fc]/20 bg-[#0f172a]/80 px-6 py-3 text-sm font-semibold text-[#7dd3fc] transition duration-200 hover:border-[#7dd3fc] hover:bg-[#7dd3fc]/10">
              Contact Me
            </a>
          </div>
        </div>
        
        {/* Avatar frame */}
        <div className="w-64 h-64 md:w-80 md:h-80 relative animate-float transition-transform duration-700 hover:-translate-y-2">
          <div className="absolute inset-0 rounded-3xl border border-[#46f3ff]/10 bg-[#ffffff08] shadow-[0_0_45px_rgba(70,243,255,0.12)] blur-2xl" />
          <div className="relative h-full overflow-hidden rounded-[2rem] border border-[#46f3ff]/20 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#090b12] shadow-soft">
            <img
              src="/avatar.jpg"
              alt="Profile avatar"
              className="object-cover w-full h-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#07070b]/95 via-transparent to-transparent" />
          </div>
        </div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-6 py-20 md:px-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#7dd3fc]">
              selected projects
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Featured work
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#c9d2e5]/90">
              Expand each section to see exact community work, live evidence links, and archived projects.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-5">
          {projects.map((project) => {
            const isOpen = openProjectId === project.id;

            return (
              <div
                key={project.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a] shadow-[0_15px_50px_-30px_rgba(0,0,0,0.6)]"
              >
                <button
                  type="button"
                  onClick={() => setOpenProjectId(isOpen ? null : project.id)}
                  className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-300 hover:bg-white/5"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                          project.status === "active"
                            ? "bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/20"
                            : "bg-white/10 text-slate-200 border border-white/10"
                        }`}
                      >
                        {project.status === "active" ? "Active" : "Archived"}
                      </span>
                    </div>
                    {project.role ? (
                      <p className="mt-2 text-sm text-[#a0aec0]">{project.role}</p>
                    ) : null}
                  </div>
                  <span className="text-3xl font-bold text-[#00f0ff]">{isOpen ? "−" : "+"}</span>
                </button>
                <div
                  className={`overflow-hidden px-6 transition-all duration-300 ${
                    isOpen ? "max-h-[900px] py-5 opacity-100" : "max-h-0 py-0 opacity-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-[#c9d2e5]">{project.description}</p>
                  {project.items ? (
                    <div className="mt-5 space-y-5">
                      {project.items.map((item) => (
                        <div key={item.label} className="rounded-3xl border border-white/10 bg-[#111827] p-4 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-[#7dd3fc]/20">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h4 className="text-base font-semibold text-white">{item.label}</h4>
                              <p className="mt-2 text-sm text-[#c9d2e5]/90">{item.description}</p>
                            </div>
                            <span className="inline-flex rounded-full bg-[#1f2937]/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#7dd3fc]">
                              {item.links.length} links
                            </span>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-3">
                            {item.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-2xl border border-[#ffffff1a] bg-[#0f172a]/90 px-4 py-2 text-sm text-[#cbd5e1] transition duration-200 hover:-translate-y-0.5 hover:border-[#7dd3fc]/40 hover:bg-[#151d2f] hover:text-white"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-2xl border border-[#ffffff1a] bg-white/5 px-4 py-2 text-sm text-[#cbd5e1] transition hover:bg-[#121827] hover:text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <footer id="contact" className="text-center py-16 px-6 bg-[#090a0f] border-t border-[#00f0ff]/10">
        <h2 className="font-mono text-2xl text-[#ff007f] mb-4">{"// CONTACT"}</h2>
        <p className="text-[#c9d2e5]/80 max-w-md mx-auto mb-8">Reach out on Discord or GitHub for project work, moderation questions, or collaboration.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <a href="https://discord.com/users/645512630244605983" target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-[#7dd3fc]/20 bg-[#0d1220]/90 px-5 py-4 text-sm font-semibold text-[#c9d2e5] transition duration-200 hover:-translate-y-0.5 hover:border-[#7dd3fc]/50 hover:bg-[#121827] hover:text-white shadow-soft">
            Discord: vntakeshii
          </a>
          <a href="http://github.com/VNTakeshi29/" target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-[#7dd3fc]/20 bg-[#0d1220]/90 px-5 py-4 text-sm font-semibold text-[#c9d2e5] transition duration-200 hover:-translate-y-0.5 hover:border-[#7dd3fc]/50 hover:bg-[#121827] hover:text-white shadow-soft">
            GitHub
          </a>
          <a href="https://guns.lol/vntakeshi" target="_blank" rel="noopener noreferrer" className="rounded-3xl border border-[#7dd3fc]/20 bg-[#0d1220]/90 px-5 py-4 text-sm font-semibold text-[#c9d2e5] transition duration-200 hover:-translate-y-0.5 hover:border-[#7dd3fc]/50 hover:bg-[#121827] hover:text-white shadow-soft">
            guns.lol/vntakeshi
          </a>
        </div>
        <p className="text-xs text-neutral-600 mt-16">© 2026 Takeshi. All work is built manually with code.</p>
      </footer>
    </div>
  );
}