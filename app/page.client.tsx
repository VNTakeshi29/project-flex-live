"use client";
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [bgmActive, setBgmActive] = useState(false);
  const [logoText, setLogoText] = useState("TAKESHI.exe");
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Easter Egg: Matrix digital rain effect on Logo Hover
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
            An Otaku Software Engineer <span className="text-[#ff007f] font-bold [text-shadow:0_0_10px_#ff007f]">Wibu</span> who turns code into waifus.
          </p>
          <p className="text-[#a0aec0] leading-relaxed mb-8">
            "As long as you don't log out, every dream can be deployed." - <span className="italic text-xs text-[#00f0ff]">System Maintenance Mantra</span>
          </p>
          <div className="flex gap-4">
            <a href="#projects" className="px-6 py-3 font-bold text-white transition bg-[#ff007f] rounded shadow-[0_0_15px_rgba(255,0,127,0.4)] hover:shadow-[0_0_25px_#ff007f] hover:-translate-y-0.5">
              Explore Vault
            </a>
            <a href="#contact" className="px-6 py-3 font-bold transition border rounded border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:-translate-y-0.5">
              Initiate Link
            </a>
          </div>
        </div>
        
        {/* Cyberpunk Anime Avatar Frame */}
        <div className="w-64 h-64 md:w-80 md:h-80 relative group">
          <div className="w-full h-full overflow-hidden border-4 border-[#00f0ff] rounded-2xl shadow-[0_0_30px_rgba(0,240,255,0.3)] rotate-3 group-hover:rotate-0 group-hover:scale-105 group-hover:border-[#ff007f] group-hover:shadow-[0_0_35px_#ff007f] transition-all duration-500">
            <img 
              src="https://i.pinimg.com/7360s/79/f0/54/79f0547be0b7f8c14d9b6ccdd66cfb74.jpg" 
              alt="Anime Avatar" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* PROJECTS SECTION */}
      <section id="projects" className="px-6 py-20 md:px-16">
        <h2 className="font-mono text-2xl font-bold mb-12 text-[#00f0ff]">
          {"// FEATURED PROJECTS & ACHIEVEMENTS"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Project 1: DTPuu Moderator */}
          <div className="relative p-8 border border-white/5 bg-[#161925] rounded-xl hover:-translate-y-2 hover:border-[#ff007f] hover:shadow-[0_10px_20px_rgba(255,0,127,0.1)] transition-all group">
            <span className="absolute top-6 right-6 text-xs font-bold text-[#ff007f] bg-[#ff007f]/10 px-2.5 py-1 rounded">
              Management
            </span>
            <h3 className="text-xl font-bold mt-2 text-white group-hover:text-[#ff007f] transition">Discord Moderator @DTPuu</h3>
            <p className="text-[#a0aec0] text-sm mt-3 leading-relaxed">
              Moderating and managing the official Discord Server for YouTuber <strong>DTPuu</strong>[cite: 1]. Responsible for server security, configuring automation bots, and maintaining a non-toxic, highly engaging workspace for community members.
            </p>
            <div className="flex gap-4 mt-6 text-xs font-bold">
              <a href="https://www.youtube.com/@DTPuu" target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] hover:underline">📺 YouTube Channel</a>
              <a href="https://discord.gg/mM5tJ3u9cQ" target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] hover:underline">💬 Join Discord</a>
            </div>
          </div>

          {/* Project 2: Owner Cộng Đồng Nhỏ */}
          <div className="relative p-8 border border-white/5 bg-[#161925] rounded-xl hover:-translate-y-2 hover:border-[#ff007f] hover:shadow-[0_10px_20px_rgba(255,0,127,0.1)] transition-all group">
            <span className="absolute top-6 right-6 text-xs font-bold text-[#ff007f] bg-[#ff007f]/10 px-2.5 py-1 rounded">
              Founder
            </span>
            <h3 className="text-xl font-bold mt-2 text-white group-hover:text-[#ff007f] transition">Owner @ Cộng Đồng Nhỏ Tự Xây</h3>
            <p className="text-[#a0aec0] text-sm mt-3 leading-relaxed">
              Founded and architected a tight-knit standalone digital community server from scratch[cite: 1]. Designed server channels infrastructure, deployed permission trees, and implemented customized engagement policies.
            </p>
            <div className="flex gap-4 mt-6 text-xs font-bold">
              <a href="https://discord.gg/bhjsq3bzcM" target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] hover:underline">💬 Explore Server</a>
            </div>
          </div>

          {/* Project 3: Waifu Gacha */}
          <div className="relative p-8 border border-white/5 bg-[#161925] rounded-xl hover:-translate-y-2 hover:border-[#ff007f] hover:shadow-[0_10px_20px_rgba(255,0,127,0.1)] transition-all group">
            <span className="absolute top-6 right-6 text-xs font-bold text-[#ff007f] bg-[#ff007f]/10 px-2.5 py-1 rounded">
              Web App
            </span>
            <h3 className="text-xl font-bold mt-2 text-white group-hover:text-[#ff007f] transition">Waifu Gacha Simulator</h3>
            <p className="text-[#a0aec0] text-sm mt-3 leading-relaxed">
              A precise simulation of anime drop-rate banners utilizing pseudorandom distribution algorithms, featuring a solid 99% pull failure rate to closely mimic raw gacha despair.
            </p>
            <div className="mt-6 space-x-3 text-xs text-[#00f0ff]">
              <span>#React</span> <span>#NodeJS</span> <span>#Tailwind</span>
            </div>
          </div>

          {/* Project 4: Anti-Spammer */}
          <div className="relative p-8 border border-white/5 bg-[#161925] rounded-xl hover:-translate-y-2 hover:border-[#ff007f] hover:shadow-[0_10px_20px_rgba(255,0,127,0.1)] transition-all group">
            <span className="absolute top-6 right-6 text-xs font-bold text-[#ff007f] bg-[#ff007f]/10 px-2.5 py-1 rounded">
              Extension
            </span>
            <h3 className="text-xl font-bold mt-2 text-white group-hover:text-[#ff007f] transition">Anti-Spammer Jutsu</h3>
            <p className="text-[#a0aec0] text-sm mt-3 leading-relaxed">
              A lightweight Google Chrome extension built to auto-detect and shroud customized toxic phrases across dynamic social boards using signature shadow-clone fade transitions.
            </p>
            <div className="mt-6 space-x-3 text-xs text-[#00f0ff]">
              <span>#JavaScript</span> <span>#CSS_Glitch</span>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <footer id="contact" className="text-center py-16 px-6 bg-[#090a0f] border-t border-[#00f0ff]/10">
        <h2 className="font-mono text-2xl text-[#ff007f] mb-4">{"// TRANSMIT COORD"}</h2>
        <p className="text-[#a0aec0] max-w-md mx-auto mb-8">Click the hyper-links below to ping my network hub directly across the meta-sphere.</p>
        <div className="flex justify-center gap-6 flex-wrap">
          <a href="#" className="px-5 py-2.5 font-bold border border-neutral-800 rounded-md hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition">Facebook</a>
          <a href="#" className="px-5 py-2.5 font-bold border border-neutral-800 rounded-md hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition">Github</a>
          <a href="https://discord.gg/bhjsq3bzcM" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 font-bold border border-neutral-800 rounded-md hover:border-[#00f0ff] hover:text-[#00f0ff] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition">Discord</a>
        </div>
        <p className="text-xs text-neutral-600 mt-16">© 2026 Takeshi. Wired with 💖 and Otaku core energy.</p>
      </footer>
    </div>
  );
}