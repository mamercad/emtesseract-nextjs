import GlitchMorphLogo from '@/components/GlitchMorphLogo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] text-white relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        
        {/* Scanlines overlay */}
        <div className="absolute inset-0 opacity-20"
             style={{
               background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 4px)'
             }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-24">
        {/* Hero Section */}
        <section className="text-center py-24 md:py-32 animate-fade-in-up">
          <div className="flex justify-center mb-12 animate-float">
            <GlitchMorphLogo />
          </div>
          
          <div className="relative inline-block mb-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-wide mb-6 relative">
              {/* Glitch layers */}
              <span className="absolute left-0 top-0 text-cyan/70 blur-sm" 
                    style={{ transform: 'translate(3px, 0px)' }}>
                emtesseract
              </span>
              <span className="absolute left-0 top-0 text-magenta/70 blur-sm"
                    style={{ transform: 'translate(-3px, 0px)' }}>
                emtesseract
              </span>
              <span className="relative gradient-text-cyan">
                emtesseract
              </span>
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl font-light mb-12 animate-fade-in stagger-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            <span className="gradient-text-cyan">Family Game Development</span>
          </p>
          
          <div className="section-divider w-96 max-w-full mx-auto mb-12 animate-fade-in stagger-2" />
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-3">
            We're a family-run game development studio, building experiences together.
            <br />
            <span className="gradient-text-magenta font-semibold mt-2 inline-block">Four dimensions. One vision.</span>
          </p>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-32">
          <div className="mb-16 animate-slide-in-left">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-cyan">&gt;</span> About Us
            </h2>
            <div className="h-1 w-40 bg-gradient-to-r from-cyan via-magenta to-transparent rounded-full" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-20 leading-relaxed max-w-4xl animate-fade-in-up stagger-1">
            emtesseract brings together family, creativity, and technology to craft memorable gaming experiences. 
            From concept to launch, we build games with heart, innovation, and a commitment to quality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="glass-cyan rounded-2xl p-10 text-center hover-lift hover-glow-cyan animate-fade-in-up stagger-2">
              <div className="text-7xl mb-6 animate-float">🎮</div>
              <h3 className="text-2xl font-bold mb-3 gradient-text-cyan">Games in Development</h3>
              <p className="text-gray-400 leading-relaxed">Crafting unique experiences across multiple platforms</p>
            </div>
            <div className="glass-magenta rounded-2xl p-10 text-center hover-lift hover-glow-magenta animate-fade-in-up stagger-3">
              <div className="text-7xl mb-6 animate-float" style={{ animationDelay: '1s' }}>👨‍👩‍👧‍👦</div>
              <h3 className="text-2xl font-bold mb-3 gradient-text-magenta">Family-Owned</h3>
              <p className="text-gray-400 leading-relaxed">Built by a family that games together</p>
            </div>
            <div className="glass-white rounded-2xl p-10 text-center hover-lift hover-glow-white animate-fade-in-up stagger-4">
              <div className="text-7xl mb-6 animate-float" style={{ animationDelay: '2s' }}>🚀</div>
              <h3 className="text-2xl font-bold mb-3 text-white">Built with Passion</h3>
              <p className="text-gray-400 leading-relaxed">Every line of code, every pixel matters</p>
            </div>
          </div>
        </section>

        {/* Games Section */}
        <section className="py-20 md:py-32">
          <div className="mb-16 animate-slide-in-right">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-magenta">&gt;</span> Our Games
            </h2>
            <div className="h-1 w-40 bg-gradient-to-r from-magenta via-cyan to-transparent rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* BrainFreeze */}
            <div className="glass-cyan rounded-2xl p-8 hover-lift hover-glow-cyan transition-smooth animate-fade-in-up stagger-1">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold">🧊 BrainFreeze</h3>
                <span className="status-badge bg-green-500/10 text-green-400 border border-green-500/30 glow-cyan">
                  Live
                </span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                Fast-paced trivia game that challenges your knowledge across multiple categories. 
                Test yourself with 10 questions and compete for high scores!
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-cyan/10 text-cyan text-sm font-semibold border border-cyan/30 rounded-lg">Web</span>
                <span className="px-3 py-1.5 bg-cyan/10 text-cyan text-sm font-semibold border border-cyan/30 rounded-lg">Trivia</span>
                <span className="px-3 py-1.5 bg-cyan/10 text-cyan text-sm font-semibold border border-cyan/30 rounded-lg">Puzzle</span>
              </div>
              <a 
                href="https://mamercad.github.io/BrainFreeze" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan hover:text-white font-semibold text-lg transition-colors group"
              >
                Play Now 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* DungeonCuties */}
            <div className="glass-magenta rounded-2xl p-8 hover-lift hover-glow-magenta transition-smooth animate-fade-in-up stagger-2">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold">🎲 DungeonCuties</h3>
                <span className="status-badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                  Paused
                </span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                Browser-based roguelike dungeon crawler with kawaii chibi aesthetics and top-down gameplay. 
                Adventure through procedurally generated dungeons!
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-magenta/10 text-magenta text-sm font-semibold border border-magenta/30 rounded-lg">Web</span>
                <span className="px-3 py-1.5 bg-magenta/10 text-magenta text-sm font-semibold border border-magenta/30 rounded-lg">Roguelike</span>
                <span className="px-3 py-1.5 bg-magenta/10 text-magenta text-sm font-semibold border border-magenta/30 rounded-lg">Action</span>
              </div>
              <a 
                href="https://mamercad.github.io/DungeonCuties" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-magenta hover:text-white font-semibold text-lg transition-colors group"
              >
                Visit 
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Ghost Hunters Agency */}
            <div className="glass-white rounded-2xl p-8 hover-lift hover-glow-white transition-smooth animate-fade-in-up stagger-3 md:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold">👻 Ghost Hunters Agency</h3>
                <span className="status-badge bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  In Dev
                </span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                Manage your own ghost hunting agency and catch spooky spirits in this Roblox experience. 
                Build your team and tackle supernatural cases!
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1.5 bg-white/10 text-white text-sm font-semibold border border-white/30 rounded-lg">Roblox</span>
                <span className="px-3 py-1.5 bg-white/10 text-white text-sm font-semibold border border-white/30 rounded-lg">Management</span>
                <span className="px-3 py-1.5 bg-white/10 text-white text-sm font-semibold border border-white/30 rounded-lg">Simulation</span>
              </div>
              <span className="inline-flex items-center gap-2 text-gray-500 font-semibold text-lg">
                Coming Soon
              </span>
            </div>
          </div>
          
          <p className="text-center text-gray-500 mt-12 text-lg font-light animate-fade-in stagger-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            More games in development...
          </p>
        </section>

        {/* Contact Section */}
        <section className="py-20 md:py-32">
          <div className="mb-16 text-center animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-cyan">&gt;</span> Get in Touch
            </h2>
            <div className="h-1 w-40 bg-gradient-to-r from-cyan via-magenta to-transparent rounded-full mx-auto" />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-16 text-center max-w-3xl mx-auto leading-relaxed animate-fade-in-up stagger-1">
            Interested in our games, collaborations, or just want to say hello?
          </p>
          
          <div className="text-center animate-fade-in-up stagger-2">
            <a 
              href="mailto:root@emtesseract.com"
              className="inline-flex items-center gap-3 glass-cyan px-10 py-6 rounded-2xl text-cyan font-semibold text-xl hover-lift hover-glow-cyan transition-smooth group"
            >
              <span className="text-2xl">✉️</span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif' }}>root@emtesseract.com</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-white/10 mt-20 animate-fade-in">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/brand/m-mark-dark.svg" 
                alt="emtesseract logo" 
                className="w-12 h-12 opacity-80"
              />
              <span className="text-3xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>emtesseract</span>
            </div>
            <p className="gradient-text-cyan text-xl font-semibold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              M⁴ — Four dimensions, one family
            </p>
            <p className="text-gray-500 text-base">&copy; 2026 emtesseract. All rights reserved.</p>
            <p className="text-gray-600 text-sm">Grand Blanc, MI</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
