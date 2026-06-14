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
    } else {
      audio.volume = 0.3;
      audio.play().catch(() => {
        console.warn("Audio play blocked by browser");
      });
    }

    setBgmActive((current) => !current);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      const audio = audioRef.current;
      audio?.pause();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0e15] text-[#e2e8f0] font-sans antialiased selection:bg-[#ff007f] selection:text-white">
      {/* Background BGM Track */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[#ff007f]/20 bg-[#0d0e15]/80 backdrop-blur-md md:px-16">
        <div 
          className="font-mono text-xl font-bold tracking-wider text-[#00f0ff] [text-shadow:0_0_10px_#00f0ff] cursor-pointer"
          onMouseEnter={handleLogoHover}
        >
          {logoText}
        </div>
        <ul className="hidden space-x-8 font-bold md:flex">
          <li><a href="#about" className="hover:text-[#ff007f] transition [text-shadow:hover:0_0_8px_#ff007f]">/About</a></li>
          <li><a href="#projects" className="hover:text-[#ff007f] transition [text-shadow:hover:0_0_8px_#ff007f]">/Projects</a></li>
          <li><a href="#contact" className="hover:text-[#ff007f] transition [text-shadow:hover:0_0_8px_#ff007f]">/Contact</a></li>
        </ul>
        <button 
          onClick={toggleBgm}
          className={`px-4 py-2 font-bold transition-all border rounded border-[#ff007f] text-[#ff007f] hover:bg-[#ff007f] hover:text-white ${bgmActive ? 'bg-[#ff007f] text-white shadow-[0_0_15px_#ff007f]' : ''}`}
        >
          {bgmActive ? "🎵 BGM: ON" : "🔇 BGM: OFF"}
        </button>
      </nav>

      {/* HERO SECTION */}
      <header id="about" className="flex flex-col-reverse items-center justify-between px-6 py-16 min-h-[85vh] md:flex-row md:px-16 gap-12">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-[#00f0ff] uppercase bg-[#00f0ff]/10 border-l-4 border-[#00f0ff]">
            🚀 SYSTEM: READY
          </span>
          <h1 className="relative my-4 font-mono text-5xl font-extrabold tracking-tight md:text-7xl text-white">
            TAKESHI
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-light">
            Software engineer building tools, communities, and simple web experiences.
          </p>
          <p className="text-[#a0aec0] leading-relaxed mb-8">
            "Spring will be here soon. Spring, the season I met you, is coming. A Spring without you…is coming." - <span className="italic text-xs text-[#00f0ff]">Kousei Arima</span>
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="px-6 py-3 font-bold text-white transition bg-[#ff007f] rounded shadow-[0_0_15px_rgba(255,0,127,0.4)] hover:shadow-[0_0_25px_#ff007f] hover:-translate-y-0.5">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 font-bold transition border rounded border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:-translate-y-0.5">
              Contact Me
            </a>
          </div>
        </div>
        
        {/* Avatar frame */}
        <div className="w-64 h-64 md:w-80 md:h-80 relative group">
          <div className="w-full h-full overflow-hidden border-4 border-[#00f0ff] rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.3)] rotate-3 group-hover:rotate-0 group-hover:scale-105 group-hover:border-[#ff007f] group-hover:shadow-[0_0_35px_#ff007f] transition-all duration-500">
              <img
              src="/hero-anime.jpg"
              alt="Profile avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-6 py-20 md:px-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-mono text-2xl font-bold text-[#00f0ff]">{"// SELECTED PROJECTS"}</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#a0aec0]">
              Click a project to expand details. Active work shows live evidence links, archived work is grouped into one reference card.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
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
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all hover:bg-white/5"
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
                    isOpen ? "max-h-[800px] py-5 opacity-100" : "max-h-0 py-0 opacity-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-[#a0aec0]">{project.description}</p>
                  {project.details ? (
                    <ul className="mt-4 space-y-3 text-sm text-[#cbd5e1] list-disc list-inside">
                      {project.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
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
        <p className="text-[#a0aec0] max-w-md mx-auto mb-8">Contact me on Discord or GitHub for project inquiries and collaboration.</p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="https://discord.com/users/645512630244605983" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 font-bold border border-neutral-800 rounded-md hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition">
            Discord: vntakeshii
          </a>
          <a href="http://github.com/VNTakeshi29/" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 font-bold border border-neutral-800 rounded-md hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition">
            GitHub
          </a>
          <a href="https://guns.lol/vntakeshi" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 font-bold border border-neutral-800 rounded-md hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition">
            guns.lol/vntakeshi
          </a>
        </div>
        <p className="text-xs text-neutral-600 mt-16">© 2026 Takeshi. All work is built manually with code.</p>
      </footer>
    </div>
  );
}