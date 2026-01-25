import GlitchMorphLogo from '@/components/GlitchMorphLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-30"
           style={{
             background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 4px)'
           }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center py-20">
          <div className="flex justify-center mb-8">
            <GlitchMorphLogo />
          </div>
          
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-bold tracking-wider font-mono mb-4 relative">
              {/* Glitch layers */}
              <span className="absolute left-0 top-0 text-cyan opacity-70" 
                    style={{ transform: 'translate(2px, 0px)' }}>
                emtesseract
              </span>
              <span className="absolute left-0 top-0 text-magenta opacity-70"
                    style={{ transform: 'translate(-2px, 0px)' }}>
                emtesseract
              </span>
              <span className="relative text-white">
                emtesseract
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-cyan font-mono mb-8">Family Game Development</p>
          
          <div className="h-0.5 w-64 mx-auto bg-gradient-to-r from-transparent via-cyan to-transparent mb-8" />
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're a family-run game development studio, building experiences together.
            <br />
            <span className="text-magenta font-mono">Four dimensions. One vision.</span>
          </p>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 font-mono">
              <span className="text-cyan">&gt;</span> About Us
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan to-magenta" />
          </div>
          
          <p className="text-lg text-gray-300 mb-12 leading-relaxed">
            emtesseract brings together family, creativity, and technology to craft memorable gaming experiences. 
            From concept to launch, we build games with heart, innovation, and a commitment to quality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/50 border border-cyan/30 p-8 rounded-lg text-center hover:border-cyan transition-colors">
              <div className="text-5xl mb-4">🎮</div>
              <div className="text-cyan font-mono">Games in Development</div>
            </div>
            <div className="bg-black/50 border border-magenta/30 p-8 rounded-lg text-center hover:border-magenta transition-colors">
              <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
              <div className="text-magenta font-mono">Family-Owned</div>
            </div>
            <div className="bg-black/50 border border-white/30 p-8 rounded-lg text-center hover:border-white transition-colors">
              <div className="text-5xl mb-4">🚀</div>
              <div className="text-white font-mono">Built with Passion</div>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 font-mono">
              <span className="text-magenta">&gt;</span> Our Games
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-magenta to-cyan" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* BrainFreeze */}
            <div className="bg-black/50 border border-cyan/50 p-6 rounded-lg hover:border-cyan transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">🧊 BrainFreeze</h3>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-mono border border-green-500/50 rounded">
                  Live
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Fast-paced trivia game that challenges your knowledge across multiple categories. 
                Test yourself with 10 questions and compete for high scores!
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-cyan/20 text-cyan text-xs font-mono border border-cyan/50 rounded">Web</span>
                <span className="px-2 py-1 bg-cyan/20 text-cyan text-xs font-mono border border-cyan/50 rounded">Trivia</span>
                <span className="px-2 py-1 bg-cyan/20 text-cyan text-xs font-mono border border-cyan/50 rounded">Puzzle</span>
              </div>
              <a 
                href="https://mamercad.github.io/BrainFreeze" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-cyan hover:text-white font-mono transition-colors"
              >
                Play Now →
              </a>
            </div>

            {/* DungeonCuties */}
            <div className="bg-black/50 border border-yellow-500/50 p-6 rounded-lg hover:border-yellow-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">🎲 DungeonCuties</h3>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm font-mono border border-yellow-500/50 rounded">
                  Paused
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Browser-based roguelike dungeon crawler with kawaii chibi aesthetics and top-down gameplay. 
                Adventure through procedurally generated dungeons!
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-magenta/20 text-magenta text-xs font-mono border border-magenta/50 rounded">Web</span>
                <span className="px-2 py-1 bg-magenta/20 text-magenta text-xs font-mono border border-magenta/50 rounded">Roguelike</span>
                <span className="px-2 py-1 bg-magenta/20 text-magenta text-xs font-mono border border-magenta/50 rounded">Action</span>
              </div>
              <a 
                href="https://mamercad.github.io/DungeonCuties" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-magenta hover:text-white font-mono transition-colors"
              >
                Visit →
              </a>
            </div>

            {/* Ghost Hunters Agency */}
            <div className="bg-black/50 border border-white/50 p-6 rounded-lg hover:border-white transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">👻 Ghost Hunters Agency</h3>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-mono border border-blue-500/50 rounded">
                  In Dev
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Manage your own ghost hunting agency and catch spooky spirits in this Roblox experience. 
                Build your team and tackle supernatural cases!
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-white/20 text-white text-xs font-mono border border-white/50 rounded">Roblox</span>
                <span className="px-2 py-1 bg-white/20 text-white text-xs font-mono border border-white/50 rounded">Management</span>
                <span className="px-2 py-1 bg-white/20 text-white text-xs font-mono border border-white/50 rounded">Simulation</span>
              </div>
              <span className="inline-block text-gray-500 font-mono">
                Coming Soon
              </span>
            </div>
          </div>
          
          <p className="text-center text-gray-500 mt-8 font-mono">More games in development...</p>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4 font-mono">
              <span className="text-cyan">&gt;</span> Get in Touch
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan to-magenta" />
          </div>
          
          <p className="text-lg text-gray-300 mb-8 text-center">
            Interested in our games, collaborations, or just want to say hello?
          </p>
          
          <div className="text-center">
            <a 
              href="mailto:root@emtesseract.com"
              className="inline-block px-8 py-4 bg-black border-2 border-cyan text-cyan font-mono text-lg hover:bg-cyan hover:text-black transition-all relative group"
            >
              <span className="relative z-10">root@emtesseract.com</span>
              <div className="absolute inset-0 bg-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 mt-16">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-cyan rounded" />
              <span className="text-2xl font-mono font-bold">emtesseract</span>
            </div>
            <p className="text-cyan font-mono">M⁴ — Four dimensions, one family</p>
            <p className="text-gray-500 text-sm">&copy; 2026 emtesseract. All rights reserved.</p>
            <p className="text-gray-600 text-sm">Grand Blanc, MI</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
